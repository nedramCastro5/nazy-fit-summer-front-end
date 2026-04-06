<template>
    <section>
        <div class="product-card">
            <div class="image-container skeleton"></div>

            <div class="product-info">
                <div class="product-name skeleton skeleton-text"></div>
                <div class="product-price skeleton skeleton-text"></div>
                <div class="product-price-installment skeleton skeleton-text small"></div>
            </div>

            <div class="buy-button">
                <div class="skeleton skeleton-button"></div>
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

.product-name{
    margin-top: 10px;
}

.product-price{
    margin-top: 10px;
}

.product-price-installment{
    margin-top: 5px;
}

.buy-button{
    margin-top: 10px;
}

.skeleton {
    background: linear-gradient(
        90deg,
        #f0f0f0 25%,
        #e0e0e0 37%,
        #f0f0f0 63%
    );
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
    border-radius: 6px;
}

.skeleton-text{
    height: 14px;
    width: 80%;
}

.skeleton-text.small{
    width: 60%;
    height: 12px;
}

.skeleton-button{
    height: 30px;
    width: 50%;
    border-radius: 8px;
}

@keyframes shimmer {
    0% {
        background-position: 100% 0;
    }
    100% {
        background-position: -100% 0;
    }
}

@media (max-width: 400px){
    .skeleton-button{
        width: 100%;
    }
}
</style>