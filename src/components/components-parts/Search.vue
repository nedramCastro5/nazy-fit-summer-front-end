<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const menuOpen = ref(false)

const isScrolled = ref(false);

const handleScroll = () =>{
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
})

onUnmounted(() =>{
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

      <!-- Action items -->
      <div class="actions">
        <div class="action-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#c0626a">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.121 17.804A4 4 0 0 1 8 16h8a4 4 0 0 1 2.879 1.804M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          </svg>
          <div class="action-text">
            <span class="action-label">Login /</span>
            <span class="action-sub">Cadastre-se</span>
          </div>
        </div>

        <div class="action-item">
          <div class="cart-icon-wrap">
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

    <!-- Mobile search bar -->
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

    <!-- Overlay for closing mobile menu -->
    <transition name="fade">
      <div v-if="menuOpen" class="overlay" @click="menuOpen = false"></div>
    </transition>

    <!-- Mobile slide menu -->
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
  </header>
</template>

<style scoped>
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
  width: 240px;
  background-color: #fce8ea;
  padding: 60px 20px;
  box-shadow: 2px 0 12px rgba(0,0,0,0.1);
  z-index: 200;
}

.mobile-menu .close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #c0626a;
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
  color: #c0626a;
  font-weight: 600;
}

.slide-enter-from {
  transform: translateX(-100%); 
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-enter-active {
  transition: transform 0.3s ease; 
}

.slide-leave-from { 
  transform: translateX(0); 
}

.slide-leave-to { 
  transform: translateX(-100%); 
}

.slide-leave-active { 
  transition: transform 0.3s ease; 
}

.fade-enter-from { 
  opacity: 0; 
}

.fade-enter-to { 
  opacity: 1; 
}

.fade-enter-active { 
  transition: opacity 0.3s ease; 
}

.fade-leave-from { 
  opacity: 1; 
}
.fade-leave-to { 
  opacity: 0; 
}

.fade-leave-active { 
  transition: opacity 0.3s ease; 
}
</style>