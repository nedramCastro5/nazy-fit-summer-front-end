<script setup>
import { onMounted } from 'vue';
import ProductCard from './ProductCard.vue';
import { useProduct } from '@/composable/useProduct';

const {fetchByCategoryId, products, loading, error} = useProduct();

const props = defineProps({
    productId: {
        type: Number,
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    }
})

onMounted(() =>{
    fetchByCategoryId(props.categoryId, props.productId);
})

</script>

<template>
    <section class="section">
        <div class="title">
            <h3>Produtos Similares</h3>
        </div>
        <div v-if="loading">Carregando...</div>
        <div v-else-if="error">{{error}}</div>
        <div class="products" v-else-if="products.length > 0">
            <ProductCard v-for="product in products"
            :product="product"/>
        </div>
        <div v-else>Nenhum produto similar encontrado.</div>
    </section>
</template>

<style scoped>
.section{
    margin-bottom: 20px;
}

.title h3 {
    margin-bottom: 15px;
}

.products{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 15px;
}

@media (max-width: 600px){
    .products{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 12px;
    }
}

@media (max-width: 400px){
    .section{
        padding: 0 3%;
    }

    .products{
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 10px; 
    }
}
</style>