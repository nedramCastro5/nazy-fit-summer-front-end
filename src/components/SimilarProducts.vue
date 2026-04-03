<script setup>
import ProductCard from './ProductCard.vue';
</script>

<template>
    <section class="section">
        <div class="title">
            <h3>Produtos Similares</h3>
        </div>
        <div class="products">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
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