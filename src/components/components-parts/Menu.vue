<script setup>
import { ref, onMounted } from 'vue'

const navInner = ref(null)

const showLeft = ref(false)
const showRight = ref(false)

const checkScroll = () => {
  const el = navInner.value
  if (!el) return

  showLeft.value = el.scrollLeft > 0
  showRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth
}

const scroll = (dir) => {
  navInner.value.scrollBy({ left: dir * 200, behavior: 'smooth' })
  setTimeout(checkScroll, 300)
}

onMounted(() => {
  setTimeout(() => {
    checkScroll()
  }, 100)

  navInner.value.addEventListener('scroll', checkScroll)
  window.addEventListener('resize', checkScroll)
})
</script>

<template>
  <nav class="nav">

    <div 
      class="nav-item dropdown"
      @mouseenter="open = true"
      @mouseleave="open = false"
    >
      CATEGORIAS ▾

      <div class="mega-menu">
        <div class="mega-content">
          <div class="col">
            <a href="#">Gel Redutor</a>
            <a href="#">Suplementos em Cápsulas</a>
          </div>
          <div class="col">
            <a href="#">Suplemento em Gotas</a>
            <a href="#">Suplemento em Pó</a>
          </div>
          <div class="col">
            <a href="#">Combos</a>
            <a href="#">Novidades</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="divider"></div>

    <button v-if="showLeft" class="arrow" @click="scroll(-1)">‹</button>

    <div class="nav-inner" ref="navInner">
      <a class="nav-item">NOVIDADES</a>
      <a class="nav-item">GEL REDUTOR</a>
      <a class="nav-item">SUPLEMENTO EM CÁPSULAS</a>
      <a class="nav-item">SUPLEMENTO EM GOTAS</a>
      <a class="nav-item">SUPLEMENTO EM PÓ</a>
      <a class="nav-item">COMBOS</a>
      <a class="nav-item">CONTATO</a>
    </div>

    <button v-if="showRight" class="arrow" @click="scroll(1)">›</button>

  </nav>
</template>

<style scoped>
.nav {
  background: #e78a95;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;
}

.nav-item {
    white-space: nowrap;
    font-size: 0.9rem;
    cursor: pointer;
}

.dropdown {
  position: relative;
  flex-shrink: 0;
}

.divider {
  width: 1px;
  height: 18px;
  background: rgba(255,255,255,0.6);
  flex-shrink: 0;
}

.nav-inner {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 24px;
  overflow-x: auto;
  scrollbar-width: none;
}

.nav-inner::-webkit-scrollbar {
  display: none;
}

.arrow {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  flex-shrink: 0;

  width: 28px;
  height: 28px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow:last-child {
  margin-right: 25px;
}

.arrow:first-of-type {
  margin-left: 6px;
}

.mega-menu {
  position: fixed;
  width: 100%;
  padding: 20px  15px;
  top: 25%;
  background: #f3e7e8;
  z-index: 10;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.dropdown:hover .mega-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.mega-content {
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.col a {
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;
}

.col a:hover {
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .nav-inner {
    gap: 16px;
  }

  .nav-item {
    font-size: 0.8rem;
  }

  .arrow {
    font-size: 1.4rem;
  }
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }
}

</style>