<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from './ProductCard.vue';
import ProductCardLoading from './ProductCardLoading.vue';
import { useProduct } from '@/composable/useProduct';

const {fetchOffers, error, loading, products} = useProduct();

onMounted(() =>{
    fetchOffers();
})
</script>

<template>
    <section class="section">
        <div class="title">
            <h3>Ofertas</h3>
        </div>
            <div v-if="loading">
                <ProductCardLoading/>
            </div>
            <div v-else-if="error">{{error}}</div>

            <div v-else-if="products.length > 0" class="products">
                <ProductCard
                v-for="product in products"
                :key="product.productId"
                :product="product"/>
            </div>

            <div v-else>
                Nenhuma oferta no momento.
            </div>
    </section>
</template>

<style scoped>
    .section{
    padding: 0 10%;
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
    .section{
        padding: 0 5%;
    }

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