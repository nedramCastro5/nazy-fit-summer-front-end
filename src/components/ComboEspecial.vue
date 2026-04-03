<script setup>
import { ref } from "vue"

const addedToCart = ref(false)
const showFullDescription = ref(false)

const shortText = "Este produto é um suplemento alimentar multifuncional, focado principalmente em gerenciamento de peso..."

const fullText = `Este produto é um suplemento alimentar multifuncional, focado principalmente em gerenciamento de peso (emagrecimento) e saúde metabólica. Ele combina ingredientes naturais conhecidos por suas propriedades termogênicas e antioxidantes.`

const addToCart = () => {
    addedToCart.value = true
}

const toggleDescription = () => {
    showFullDescription.value = !showFullDescription.value
}
</script>

<template>
    <section class="section">
        
        <div class="img-container">
            <img src="../assets/product.jpeg" alt="Product-Image" class="product-img">
        </div>

        <div class="info-container">
            
            <div class="product-name">
                Chá My Diurect
            </div>

            <div class="product-price">
                R$97.00
            </div>

            <div class="product-price-installment">
                12 x de R$9,98
            </div>

            <div class="buy-section">

                <div class="quantity-container">
                    <button class="quantity-changer">−</button>
                    <input type="text" value="1">
                    <button class="quantity-changer">+</button>
                </div>

                <div class="button-container"> 
                    <button @click="addToCart">Comprar</button>
                </div>
            </div>

            <div v-if="addedToCart" class="cart-confirm">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="check-icon"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>

            <span>
                Você já adicionou este produto. 
                <a href="">Ver carrinho</a>
            </span>
            </div>

            <div class="description">
                <p>
                    {{ showFullDescription 
                        ? fullText 
                        : shortText 
                    }}
                </p>

                <button @click="toggleDescription" class="toggle-btn">
                    {{ showFullDescription ? 'Ver menos' : 'Ver mais' }}
                </button>
            </div>
        </div>

    </section>
</template>

<style scoped>
.description{
    margin-top: 10px;
    font-size: 90%;
    line-height: 1.5;
}

.toggle-btn{
    margin-top: 5px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 85%;
    text-decoration: underline;
    padding: 0;
}

.toggle-btn:hover{
    text-decoration: underline;
}

.cart-confirm{
    font-size: 80%;
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.check-icon{
    width: 16px;
    height: 16px;
    color: green;
    flex-shrink: 0;
}

.cart-confirm a{
    color: black;
    text-decoration: underline;
}

.section{
    padding: 0 10%;
    margin-top: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-items: start;
}

.img-container{
    width: 100%;
    display: flex;
    justify-content: center;
}

.product-img{
    width: 100%;
    max-width: 700px;
    height: auto;
    object-fit: cover;
}

.info-container{
    display: flex;
    flex-direction: column;
}

.product-name{
    font-size: 100%;
    margin-bottom: 10px;
    font-weight: 600;
}

.product-price{
    margin-top: 10px;
    font-size: 120%;
    margin-bottom: 15px;
}

.product-price-installment{
    font-size: 90%;
    margin-bottom: 15px;
}

.buy-section{
    display: flex;
    gap: 15px;
    align-items: center;
}

.quantity-container{
    display: flex;
    align-items: center;
    border: 1px solid rgba(63, 63, 63, 0.2);
    border-radius: 6px;
    overflow: hidden;
}

.quantity-container input{
    flex: 1;
    min-width: 0;
    width: 40px;
    text-align: center;
    border: none;
    outline: none;
}

.quantity-changer{
    flex: 1;
    padding: 8px;
    background: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
}

.quantity-changer:hover{
    background-color: #f2f2f2;
}

.button-container{
    flex: 1;
}

.button-container button{
    width: 100%;
    padding: 8px 10px;
    background-color: rgb(183, 0, 73);;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.button-container button:hover{
    opacity: 0.9;
}

@media (max-width: 1024px){
    .product-img{
        max-width: 350px;
    }
}

@media (max-width: 768px){
    .section{
        grid-template-columns: 1fr;
        gap: 25px;
    }

    .product-img{
        max-width: 100%;
    }

    .buy-section{
        flex-direction: column;
        align-items: stretch;
    }

    .button-container{
        width: 100%;
    }

    .quantity-container{
        width: 100%;
    }

    .quantity-changer{
        padding: 6px; 
        font-size: 14px;
    }

    .quantity-container input{
        font-size: 14px;
    }
}
</style>