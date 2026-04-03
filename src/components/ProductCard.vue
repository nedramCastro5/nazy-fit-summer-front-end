<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <section>
        <div class="product-card">
            <div class="image-container">
                <RouterLink to="/product-name"><img src="../assets/product.jpeg" alt="Product Image" class="image"></RouterLink>
                <div class="esgotado">
                    <p>ESGOTADO</p>
                </div>
            </div>
            <div class="product-info">
                <div class="product-name">Chá Dream Up</div>
                <div class="product-price">R$ 197.00</div>
                <div class="product-price-installment">12 x R$20.26</div>
            </div>
            <div class="buy-button">
                <button>
                    Comprar
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
    width: 50%;
    background-color: rgb(183, 0, 73);
    color: white;
    border: none;
    margin-top: 10px;
    border-radius: 8px;
    padding: 4px 12px;
    font-size: 80%;
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
        padding: 8px;
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