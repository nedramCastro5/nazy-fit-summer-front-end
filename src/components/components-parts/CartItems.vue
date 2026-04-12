<script setup>
import { useCart } from '@/composable/useCart'

const { handleUpdateQuantity, handleRemoveFromCart, fetchCart } = useCart()

const props = defineProps({
  item:{
    type: Object,
    required: true
  }
})

const increment = () => {
  handleUpdateQuantity(
    props.item.productId, 
    props.item.quantity + 1
  )
}

const decrement = () => {
  if(props.item.quantity > 1){
    handleUpdateQuantity(
      props.item.productId, 
      props.item.quantity - 1
    )
  }
}

const removeItem = async () => {
  console.log(props.item.productId)
  await handleRemoveFromCart(props.item.productId)
  await fetchCart();
}
</script>

<template>
  <div class="cart-item-component">
    <img 
      :src="props.item.image"
      :alt="props.item.productName" 
      class="mini-image"
    />

    <div class="product-info">
      <div class="top-row">
        <span class="product-name">
          {{ props.item.productName }}
        </span>

        <a class="remove-btn" @click="removeItem">
          Remover
        </a>
      </div>

      <div class="bottom-row">
        <div class="quantity-selector">
          <button @click="decrement">−</button>
          <span>{{ props.item.quantity }}</span>
          <button @click="increment">+</button>
        </div>

        <span class="product-price">
          MZN {{ (props.item.price.toFixed(2) * props.item.quantity).toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item-component {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.product-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-name {
    font-size: 80%;
}

.remove-btn {
    text-decoration: underline;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 80%;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.quantity-selector {
    border: 1px solid #ccc;
    border-radius: 3px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.quantity-selector button {
  width: 24px;
  height: 24px;
  border-radius: 3px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.quantity-selector span {
  min-width: 20px;
  text-align: center;
}

.product-price {
    font-size: 85%;
    color: #333;
}

.mini-image{
  width: 100%;
  max-width: 70px;
}
</style>