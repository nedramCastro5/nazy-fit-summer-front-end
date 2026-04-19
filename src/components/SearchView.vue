<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProduct } from '@/composable/useProduct'
import ProductCard from './ProductCard.vue'
import ProductCardLoading from './ProductCardLoading.vue'

const route = useRoute()
const { fetchBySearch, products, loading, error } = useProduct()

const search = async (q) => {
  if (!q) return
  await fetchBySearch(q)
}

watch(() => route.query.q, (q) => search(q), { immediate: true })
</script>

<template>
  <section class="section">
    <div class="title">
      <h3>Resultados para: "{{ route.query.q }}"</h3>
    </div>

    <div v-if="loading" class="products">
      <ProductCardLoading v-for="n in 6" :key="n" />
    </div>

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="products.length > 0" class="products">
      <ProductCard
        v-for="product in products"
        :key="product.productId"
        :product="product"
      />
    </div>

    <div v-else>
      Nenhum produto encontrado para "<strong>{{ route.query.q }}</strong>".
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 0 10%;
  margin-bottom: 20px;
}

.title h3 {
  margin-bottom: 15px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 15px;
}

@media (max-width: 600px) {
  .section {
    padding: 0 5%;
  }

  .products {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 400px) {
  .section {
    padding: 0 3%;
  }

  .products {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }
}
</style>