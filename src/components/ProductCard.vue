<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useCart } from '@/composable/useCart';

const {handleAddToCart, error} = useCart();

const isAdded = ref(false);
 
const props = defineProps({
    product:{
        type: Object,
        required: true
    }
});

const calculateInstallments = (price) => {
    return (price / 12).toFixed(2);
}

const addToCart = async (product, quantity = 1) => {
    await handleAddToCart(product, quantity);
    isAdded.value = true;

    setTimeout(() => {
        isAdded.value = false;
    }, 2000);

    clearTimeout();
}
</script>

<template>
    <section v-if="props.product && props.product.slug">
        <div class="product-card">
            <div class="image-container">
                <RouterLink :to="`/product/${props.product.productId}/${props.product.slug}/${props.product.categoryId}`">
                    <img :src="props.product.principalUrl" :alt="props.product.productName" class="image">
                </RouterLink>
                <div v-if="props.product.stock === 0" class="esgotado">
                    <p>ESGOTADO</p>
                </div>
            </div>

            <div class="product-info">
                <div class="product-name">{{ props.product.productName }}</div>
                <div class="product-price"> MZN {{ props.product.price.toFixed(2) }}</div>
                <div class="product-price-installment">
                    12 x MZN {{calculateInstallments(props.product.price.toFixed(2))}}
                </div>
            </div>

            <div v-if="props.product.stock > 0" class="buy-button">
                <button 
                    @click="addToCart(props.product)"
                    :class="{ added: isAdded }"
                >
                    {{ isAdded ? 'Adicionado ✓' : 'Comprar' }}
                </button>
            </div>

        </div>
    </section>
</template>

<style scoped>
.product-card{
    width: 100%;
    display: flex;
    flex-direction: column;
}

.image-container{
    position: relative;
    width: 100%;
    height: 250px;
}

.image{
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.esgotado{
    position: absolute;
    top: 6px;
    left: 6px;

    background-color: rgba(225, 225, 225, 0.687);
    width: auto;
    padding: 1px 3px;
    display: flex;
    justify-content: center;
    border-radius: 2px;
}

.esgotado p{
    font-size: 75%;
    margin: 0;
}

.buy-button button{
    width: 55%;
    background-color: rgb(183, 0, 73);
    color: white;
    border: none;
    margin-top: 10px;
    border-radius: 8px;
    padding: 4px 12px;
    font-size: 80%;
    transition: all 0.25s ease;
}

.buy-button button.added{
    transform: scale(1.05);
}

.product-name{
    font-size: 90%;
    margin-top: 10px;
}

.product-price{
    margin-top: 10px;
    font-size: 90%;
    font-weight: 700;
}

.product-price-installment{
    font-size: 70%;
    margin-top: 5px;
}

@media (max-width: 600px){
    .product-card{
        width: 100%;
    }

    .buy-button button{
        padding: 5px 8px;
    }
}

@media (max-width: 400px){
    .product-card{
        width: 100%;
    }

    .buy-button button{
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>