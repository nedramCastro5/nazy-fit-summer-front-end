<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import banner1 from '@/assets/banner1.jpeg'
import banner2 from '@/assets/banner2.jpeg'
import banner3 from '@/assets/banner3.jpeg'

const current = ref(0)

const images = [banner1, banner2, banner3]

const next = () => {
  current.value = (current.value + 1) % images.length
}

const prev = () => {
  current.value =
    (current.value - 1 + images.length) % images.length
}

let interval = null

onMounted(() => {
  interval = setInterval(() => {
    next()
  }, 4000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <section class="hero">

    <img :src="images[current]" class="hero-img" />

    <button class="arrow left" @click="prev">←</button>
    <button class="arrow right" @click="next">→</button>

  </section>

    <div class="dots">
      <span
        v-for="(img, i) in images"
        :key="i"
        class="dot"
        :class="{ active: i === current }"
        @click="current = i"
      />
    </div>

</template>

<style scoped>
.hero {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 6;
    overflow: hidden;
}

.hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: black;
    font-size: 2.2rem;
    cursor: pointer;
    z-index: 2;
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.arrow:hover {
    transform: translateY(-50%) scale(1.1);
    opacity: 0.7;
}

.arrow.left { left: 12px; }
.arrow.right { right: 12px; }


.dots {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    gap: 6px;
}

.dot {
    width: 8px;
    height: 8px;
    background: #ddd;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
}

.dot.active {
    background: black;
    width: 18px;
    border-radius: 10px;
}


@media (max-width: 1024px) {
    .hero {
        aspect-ratio: 16 / 7;
    }

    .arrow {
        font-size: 1.8rem;
    }

    .dot {
        width: 7px;
        height: 7px;
    }

    .dot.active {
        width: 16px;
    }
}


@media (max-width: 768px) {
    .hero {
        aspect-ratio: 16 / 9;
        border-radius: 4px;
    }

  
    .arrow {
        display: none;
    }

    .dots {
        margin-top: 8px;
    }

    .dot {
        width: 6px;
        height: 6px;
    }

    .dot.active {
        width: 14px;
    }
}
</style>