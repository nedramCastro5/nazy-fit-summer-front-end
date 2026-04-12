import { ref, computed } from "vue";
import { cartApi } from "@/api/Cart/cartApi.js";
import { authState } from "./useAuthState";
import { cartState } from "./useCartState";

export const CART_STORAGE_KEY = "userCart";

// ── Local-storage helpers ────────────────────────────────────────────────────

function readLocalCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function writeLocalCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}


// ── Composable ───────────────────────────────────────────────────────────────

export function useCart() {
  const loading = ref(false);
  const error = ref(null);

  // ── Guest cart (localStorage) ──────────────────────────────────────────────
    function loadLocalCart(){
        const items = readLocalCart();
        syncCartState(items)
    }
  /**
   * Add or update an item in the guest cart.
   * Quantity is accumulated when the product already exists.
   */
  function addToLocalCart(product, quantity) {
    const items = readLocalCart();
    const existing = items.find((i) => i.productId === product.productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({
        productId: product.productId,
        quantity,
        productName: product.productName,
        image: product.principalUrl,
        price: product.price ?? 0,
      });
    }

    writeLocalCart(items);
    syncCartState(items);
  }

  function removeFromLocalCart(productId) {
    const items = readLocalCart().filter((i) => i.productId !== productId);
    writeLocalCart(items);
    syncCartState(items);
  }

  function updateLocalCartQuantity(productId, quantity) {
    if (quantity <= 0) return removeFromLocalCart(productId);

    const items = readLocalCart().map((i) =>
      i.productId === productId ? { ...i, quantity } : i
    );
    writeLocalCart(items);
    syncCartState(items);
  }

  function clearLocalCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    syncCartState([]);
  }

  // Keep reactive cartState in sync
  function syncCartState(items) {
    cartState.items = items;
    cartState.total = items.reduce((sum, i) => sum + i.quantity, 0);
    cartState.totalPrice = items.reduce(
      (sum, i) => sum + i.quantity * (i.price ?? 0),
      0
    );
  }

  // ── Merge guest cart into server cart on login ─────────────────────────────

  async function mergeCarts() {
    const localItems = readLocalCart();
    if (!localItems.length) return;

    try {
      await cartApi.mergeCarts(localItems);
      clearLocalCart();
    } catch (err) {
      console.error("[useCart] Failed to merge carts:", err);
    }
  }

  // ── Authenticated cart (server) ────────────────────────────────────────────

  async function fetchCart() {
    loading.value = true;
    error.value = null;
    try {
      const data = await cartApi.getCart();
      console.log(data.data.data.cart)
      syncCartState(data.data.data.cart ?? []);
    } catch (err) {
      error.value = err?.message ?? "Failed to load cart.";
      syncCartState([]);
    } finally {
      loading.value = false;
    }
  }

  // ── Unified actions ────────────────────────────────────────────────────────

  async function handleAddToCart(product, quantity = 1) {
    if (!product?.productId) {
      error.value = "Invalid product.";
      return;
    }
    if (quantity < 1) {
      error.value = "Quantity must be at least 1.";
      return;
    }

    error.value = null;

    if (!authState.isLogged) {
      addToLocalCart(product, quantity);
      return;
    }

    loading.value = true;
    try {
      await cartApi.addItem({ productId: product.productId, quantity });
      await fetchCart(); // re-sync server state
    } catch (err) {
      error.value = err?.message ?? "Failed to add item to cart.";
    } finally {
      loading.value = false;
    }
  }

  async function handleRemoveFromCart(productId) {
    if (!authState.isLogged) {
      removeFromLocalCart(productId);
      return;
    }

    loading.value = true;
    try {
      await cartApi.removeItem(productId);
      await fetchCart();
    } catch (err) {
      error.value = err?.message ?? "Failed to remove item.";
    } finally {
      loading.value = false;
    }
  }

  async function handleUpdateQuantity(productId, quantity) {
    if (!authState.isLogged) {
      updateLocalCartQuantity(productId, quantity);
      return;
    }

    loading.value = true;
    try {
      await cartApi.updateItem({ productId, quantity });
      await fetchCart();
    } catch (err) {
      error.value = err?.message ?? "Failed to update quantity.";
    } finally {
      loading.value = false;
    }
  }

  async function handleClearCart() {
    if (!authState.isLogged) {
      clearLocalCart();
      return;
    }

    loading.value = true;
    try {
      await cartApi.clearCart();
      syncCartState([]);
    } catch (err) {
      error.value = err?.message ?? "Failed to clear cart.";
    } finally {
      loading.value = false;
    }
  }

  // Convenience computed
  const cartItems = computed(() => cartState.items ?? []);
  const cartTotal = computed(() => cartState.total ?? 0);
  const cartTotalPrice = computed(() => cartState.totalPrice ?? 0);
  const isEmpty = computed(() => cartItems.value.length === 0);

  return {
    // State
    loading,
    error,
    cartItems,
    cartTotal,
    cartTotalPrice,
    isEmpty,

    // Actions
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleClearCart,
    loadLocalCart,

    // Auth lifecycle
    mergeCarts,
    fetchCart,
  };
}