<script setup>
import { ref } from 'vue'

const quantity = ref(1)

const increment = () => {
  quantity.value++
}

const decrement = () => {
  if (quantity.value > 1) quantity.value--
}

const removeItem = () => {
    
}
</script>

<template>
  <div class="cart-item-component">
    <img class="product-img" />

    <div class="product-info">
      <div class="top-row">
        <span class="product-name">My Curly Gel Redutor</span>
        <a class="remove-btn" @click="removeItem">Remover</a>
      </div>

      <div class="bottom-row">
        <div class="quantity-selector">
          <button @click="decrement">−</button>
          <span>{{ quantity }}</span>
          <button @click="increment">+</button>
        </div>
        <span class="product-price">R$97,00</span>
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
</style>