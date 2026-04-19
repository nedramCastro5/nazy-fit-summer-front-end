<script setup>
import { ref, onMounted, computed } from 'vue'
import { useCategory } from '@/composable/useCategories'

const {fetchAll, categories, loading, error} = useCategory()

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
  clearTimeout();
}

const categoryColumns = computed(() => {
  const cols = []
  for (let i = 0; i < categories.value.length; i += 2) {
    cols.push(categories.value.slice(i, i + 2))
  }
  return cols
})

onMounted(async () => {
  await fetchAll();
  setTimeout(() => {
    checkScroll()
  }, 100)
  clearTimeout();

  navInner.value.addEventListener('scroll', checkScroll)
  window.addEventListener('resize', checkScroll)
})
</script>

<template>
  <nav class="nav">
    
    <div class="nav-content">

    <div 
      class="nav-item dropdown"
      @mouseenter="open = true"
      @mouseleave="open = false"
    >
      Categorias ▾

      <div class="mega-menu">
        <div class="mega-content">
          <div class="col" v-for="(col, colIndex) in categoryColumns" :key="colIndex">
            <a 
              v-for="category in col" 
              :key="category.categoryId" 
              href="#"
            >
              {{ category.categoryName }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="divider"></div>

    <button v-if="showLeft" class="arrow" @click="scroll(-1)">‹</button>

    <div class="nav-inner" ref="navInner">
      <a class="nav-item">Novidades</a>
      <a v-for="category in categories" class="nav-item">{{ category.categoryName }}</a>
    </div>

    <button v-if="showRight" class="arrow" @click="scroll(1)">›</button>
  </div>
  </nav>
</template>

<style scoped>
.nav {
  background: #e78a95;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.nav-content{
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 10%; 
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-item {
    white-space: nowrap;
    font-size: 0.9rem;
    cursor: pointer;
}

.dropdown {
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
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 20px 15px;
  background: #f3e7e8;
  z-index: 10;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 1s ease;
}

.mega-menu::before{
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 10px;
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