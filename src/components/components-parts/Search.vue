<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthentication } from '@/composable/useAuthentication'
import { authState } from '@/composable/useAuthState'
import CartItems from '@/components/components-parts/CartItems.vue'
import { useCart } from '@/composable/useCart'
import { useProduct } from '@/composable/useProduct'

const menuOpen = ref(false)
const cartOpen = ref(false)
const isScrolled = ref(false)
const searchQuery = ref('')
const suggestions = ref([])
const showSuggestions = ref(false)

const router = useRouter()
const { handleCheck } = useAuthentication()
const { cartTotal, cartTotalPrice, cartItems, loadLocalCart, fetchCart } = useCart()
const { fetchBySearch, products: suggestionProducts } = useProduct()
const user = authState.user

const logged = computed(() => authState.isLogged)
const firstName = computed(() => {
  if (!user.fullName) return ''
  return user.fullName.split(' ')[0]
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// debounce helper (no lodash needed)
let debounceTimer = null
const fetchSuggestions = (q) => {
  clearTimeout(debounceTimer)
  if (!q || q.trim().length < 2) {
    suggestions.value = []
    showSuggestions.value = false
    return
  }
  debounceTimer = setTimeout(async () => {
    await fetchBySearch(q)
    suggestions.value = suggestionProducts.value.slice(0, 5)
    showSuggestions.value = suggestions.value.length > 0
  }, 300)
}

const onInput = (e) => {
  searchQuery.value = e.target.value
  fetchSuggestions(searchQuery.value)
}

const handleSearch = () => {
  const q = searchQuery.value.trim()
  if (!q) return
  router.push({ path: '/search', query: { q } })
  searchQuery.value = ''
  suggestions.value = []
  showSuggestions.value = false
  menuOpen.value = false
}

const selectSuggestion = (product) => {
  router.push(`/product/${product.slug}`)
  searchQuery.value = ''
  suggestions.value = []
  showSuggestions.value = false
}

const closeSuggestions = () => {
  setTimeout(() => { showSuggestions.value = false }, 150)
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)

  const isUserLogged = await handleCheck()
  authState.isLogged = isUserLogged

  if (isUserLogged) {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'))
    if (userDetails) {
      user.email = userDetails.email
      user.phoneNumber = userDetails.phoneNumber
      user.fullName = userDetails.fullName
    }
    await fetchCart()
  } else {
    loadLocalCart()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['header', { scrolled: isScrolled }]">
    <div class="header-inner">

      <!-- Hamburger -->
      <button class="hamburger" @click="menuOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#c0626a">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <!-- Logo -->
      <div class="logo">
        <img src="../../assets/logo.png" alt="logo" class="logo-img">
      </div>

      <!-- Desktop search -->
      <div class="search-wrapper">
        <div class="search-bar">
          <input
            type="text"
            :value="searchQuery"
            placeholder="O que você está buscando?"
            @input="onInput"
            @keyup.enter="handleSearch"
            @blur="closeSuggestions"
            @focus="showSuggestions = suggestions.length > 0"
          />
          <button class="search-btn" @click="handleSearch">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
            </svg>
          </button>
        </div>

        <div class="suggestions" v-if="showSuggestions">
          <div
            v-for="product in suggestions"
            :key="product.productId"
            class="suggestion-item"
            @mousedown="selectSuggestion(product)"
          >
            <img :src="product.principalUrl" class="suggestion-img" />
            <div class="suggestion-info">
              <span class="suggestion-name">{{ product.productName }}</span>
              <span class="suggestion-price">MZN {{ product.price.toFixed(2) }}</span>
            </div>
          </div>
          <div class="suggestion-footer" @mousedown="handleSearch">
            Ver todos os resultados para "<strong>{{ searchQuery }}</strong>"
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="actions">
        <div class="action-item">
          <RouterLink :to="logged ? '/account' : '/account/login'">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#c0626a">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.121 17.804A4 4 0 0 1 8 16h8a4 4 0 0 1 2.879 1.804M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            </svg>
          </RouterLink>
          <div class="action-text" v-if="!logged">
            <span class="action-label"><RouterLink to="/account/login">Login /</RouterLink></span>
            <span class="action-sub"><RouterLink to="/account/login" class="a-sub">Cadastre-se</RouterLink></span>
          </div>
          <div v-else class="action-text">
            <span class="action-label"><RouterLink to="/account">Ola, {{ firstName }}!</RouterLink></span>
            <span class="action-sub"><RouterLink to="/account">Sair</RouterLink></span>
          </div>
        </div>

        <!-- Cart -->
        <div class="action-item">
          <div class="cart-icon-wrap" @click="cartOpen = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#c0626a">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <div class="action-text">
            <span class="action-label" @click="cartOpen = true">Carrinho ({{ cartTotal }})</span>
            <span class="action-sub" @click="cartOpen = true">MZN {{ cartTotalPrice.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile search -->
    <div class="mobile-search">
      <div class="search-wrapper">
        <div class="search-bar">
          <input
            type="text"
            :value="searchQuery"
            placeholder="O que você está buscando?"
            @input="onInput"
            @keyup.enter="handleSearch"
            @blur="closeSuggestions"
            @focus="showSuggestions = suggestions.length > 0"
          />
          <button class="search-btn" @click="handleSearch">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
            </svg>
          </button>
        </div>

        <div class="suggestions" v-if="showSuggestions">
          <div
            v-for="product in suggestions"
            :key="product.productId"
            class="suggestion-item"
            @mousedown="selectSuggestion(product)"
          >
            <img :src="product.principalUrl" class="suggestion-img" />
            <div class="suggestion-info">
              <span class="suggestion-name">{{ product.productName }}</span>
              <span class="suggestion-price">MZN {{ product.price.toFixed(2) }}</span>
            </div>
          </div>
          <div class="suggestion-footer" @mousedown="handleSearch">
            Ver todos os resultados para "<strong>{{ searchQuery }}</strong>"
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <transition name="fade">
      <div v-if="menuOpen || cartOpen" class="overlay" @click="menuOpen = false; cartOpen = false"></div>
    </transition>

    <!-- Mobile Menu -->
    <transition name="slide">
      <nav v-if="menuOpen" class="mobile-menu">
        <button class="close-btn" @click="menuOpen = false">×</button>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Produtos</a></li>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Contato</a></li>
        </ul>
      </nav>
    </transition>

    <!-- Cart Drawer -->
    <transition name="slide-right">
      <aside v-if="cartOpen" class="cart-drawer">
        <button class="close-btn" @click="cartOpen = false">Carrinho de Compras X</button>
        <CartItems v-for="item in cartItems" :key="item.id" :item="item"/>
        <div class="cart-footer">
          <div class="total"><span>Total:</span> <span>MZN {{ cartTotalPrice.toFixed(2) }}</span></div>
          <button class="checkout-btn">Finalizar Compra</button>
        </div>
      </aside>
    </transition>
  </header>
  <div class="line"></div>
</template>

<style scoped>
.line {
  background-color: rgba(128, 128, 128, 0.2);
  height: 1px;
}

a {
  text-decoration: none;
  color: black;
}

.a-sub {
  color: #666;
}

.total {
  display: flex;
  justify-content: space-between;
}

.header {
  padding: 0 10%;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  gap: 20px;
  position: relative;
}

.logo {
  flex: 0 0 auto;
}

.logo-img {
  height: 55px;
  width: auto;
}

/* search wrapper handles positioning for suggestions */
.search-wrapper {
  flex: 1;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid rgba(46, 46, 46, 0.177);
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px 14px;
  font-size: 0.85rem;
  color: #555;
  background: transparent;
}

.search-btn {
  background: #f08a93;
  border: none;
  padding: 11px 16px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
}

/* suggestions dropdown */
.suggestions {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 500;
  overflow: hidden;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  cursor: pointer;
  transition: background 0.15s;
}

.suggestion-item:hover {
  background: #fef2f3;
}

.suggestion-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.suggestion-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.suggestion-name {
  font-size: 0.85rem;
  color: #333;
  font-weight: 500;
}

.suggestion-price {
  font-size: 0.75rem;
  color: #f08a93;
  font-weight: 600;
}

.suggestion-footer {
  padding: 10px 14px;
  font-size: 0.8rem;
  color: #666;
  border-top: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background 0.15s;
}

.suggestion-footer:hover {
  background: #fef2f3;
}

.actions {
  display: flex;
  gap: 28px;
  align-items: center;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.action-text {
  display: flex;
  flex-direction: column;
}

.action-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #333;
}

.action-sub {
  font-size: 0.75rem;
  color: #666;
}

.cart-icon-wrap {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #f08a93;
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-search {
  display: none;
  padding-bottom: 12px;
}

@media (max-width: 1024px) {
  .search-wrapper {
    max-width: 400px;
  }

  .action-label {
    font-size: 0.75rem;
  }

  .action-sub {
    font-size: 0.7rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0 16px;
  }

  .header-inner {
    margin-top: 10px;
    height: 64px;
    justify-content: space-between;
    transition: height 0.3s ease;
  }

  .header.scrolled .header-inner {
    height: 55px;
  }

  .header.scrolled .logo-img {
    margin-top: 5px;
    height: 40px;
    transition: height 0.3s ease;
  }

  .header-inner .search-wrapper {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .actions {
    gap: 16px;
  }

  .action-text {
    display: none;
  }

  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .mobile-search {
    display: block;
    margin-top: 8px;
  }

  .mobile-search .search-wrapper {
    max-width: 100%;
    margin: 0;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 150;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  padding: 60px 20px;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
  z-index: 200;
  background-color: white;
}

.mobile-menu .close-btn {
  position: absolute;
  top: 15px;
  right: 50px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
}

.close-btn {
  border: none;
  padding: 10px;
  background-color: #f08a9264;
  margin-bottom: 20px;
}

.mobile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-menu li {
  margin-bottom: 20px;
}

.mobile-menu a {
  text-decoration: none;
  color: black;
  font-weight: 500;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  background: white;
  z-index: 300;
  padding: 20px;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.cart-footer {
  margin-top: auto;
}

.checkout-btn {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 50px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #f08a93;
  color: white;
}

.slide-enter-from { transform: translateX(-100%); }
.slide-enter-to { transform: translateX(0); }
.slide-enter-active { transition: transform 0.3s ease; }
.slide-leave-to { transform: translateX(-100%); }
.slide-leave-active { transition: transform 0.3s ease; }

.slide-right-enter-from { transform: translateX(100%); }
.slide-right-enter-to { transform: translateX(0); }
.slide-right-enter-active { transition: transform 0.3s ease; }
.slide-right-leave-to { transform: translateX(100%); }
.slide-right-leave-active { transition: transform 0.3s ease; }

.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>