import { reactive, computed } from "vue";

export const cartState = reactive({
  items: [],
  total: 0,
  totalPrice: 0,
});

export const cartGetters = {
  itemCount: computed(() =>
    cartState.items.reduce((sum, i) => sum + i.quantity, 0)
  ),
  totalPrice: computed(() =>
    cartState.items.reduce((sum, i) => sum + i.quantity * (i.price ?? 0), 0)
  ),
  isEmpty: computed(() => cartState.items.length === 0),
  findItem: (productId) =>
    cartState.items.find((i) => i.productId === productId) ?? null,
  items: computed(() => cartState.items)
};