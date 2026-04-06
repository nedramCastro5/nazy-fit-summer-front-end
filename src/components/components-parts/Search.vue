<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router';
import { useAuthentication } from '@/composable/useAuthentication';
import { authState } from '@/composable/useAuthState';
import CartItems from '@/components/components-parts/CartItems.vue';

const menuOpen = ref(false)
const cartOpen = ref(false)
const isScrolled = ref(false)

const { handleCheck } = useAuthentication()
const user = authState.user

// reactive computed values
const logged = computed(() => authState.isLogged)
const firstName = computed(() => {
  if (!user.fullName) return ''
  return user.fullName.split(' ')[0]
})

// scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// lifecycle hooks
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
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['header', {scrolled: isScrolled}]">
    <div class="header-inner">

      <!-- Hamburger button -->
      <button class="hamburger" @click="menuOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#c0626a">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <!-- Logo -->
      <div class="logo">
        <img src="../../assets/logo.png" alt="logo" class="logo-img">
      </div>

      <!-- Desktop search bar -->
      <div class="search-bar">
        <input type="text" placeholder="O que você está buscando?" />
        <button class="search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
        </button>
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
            <span class="action-label">Carrinho (3)</span>
            <span class="action-sub">R$ 635,78</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile search -->
    <div class="mobile-search">
      <div class="search-bar">
        <input type="text" placeholder="O que você está buscando?" />
        <button class="search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
        </button>
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
        <CartItems/>
        <div class="cart-footer">
          <div class="total"><span>Total:</span> <span>R$ 300.00</span></div>
          <button class="checkout-btn">Finalizar Compra</button>
        </div>
      </aside>
    </transition>
  </header>
  <div class="line"></div>
</template>

<style scoped>
.line{
  background-color: rgba(128, 128, 128, 0.2);
  height: 1px;
}

a{
  text-decoration: none;
  color: black;
}

.a-sub{
  color: #666;
}

.total{
  display: flex;
  justify-content: space-between;
}

.header {
    /* background-color: #fce8ea; */
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

.search-bar {
    flex: 1;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border: 1px solid rgba(46, 46, 46, 0.177);
    border-radius: 6px;
    overflow: hidden;
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
    .search-bar {
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

    .header-inner .search-bar {
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
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  z-index: 150;
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  padding: 60px 20px;
  box-shadow: 2px 0 12px rgba(0,0,0,0.1);
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

.close-btn{
  background-color: none;
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
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100vh;
  background: white;
  z-index: 300;
  padding: 20px;
  box-shadow: -2px 0 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.cart-title {
  margin-top: 40px;
  margin-bottom: 20px;
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
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>