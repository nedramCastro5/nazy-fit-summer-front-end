<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProduct } from '@/composable/useProduct';
import SimilarProducts from '@/components/SimilarProducts.vue'

const {fetchBySlug, loading, error, product} = useProduct();
const route = useRoute();
const selectedIndex = ref(0)
const selectImage = (index) => {
  selectedIndex.value = index
}

const addedToCart = ref(false)

const addToCart = () => {
  addedToCart.value = true
}

const activeTab = ref('descricao')
onMounted(()=>{
  fetchBySlug(route.params.slug);
})
</script>

<template>
  <main>
    <section>
    <div class="product-container">
      <div class="all-images">
        <figure
          v-for="(image, index) in product.images"
          :key="index"
          :class="['thumb-wrapper', { active: selectedIndex === index }]"
          @click="selectImage(index)"
        >
          <img :src="image" class="mini-image" :alt="product.productName" />
        </figure>
      </div>

      <div class="main-image-container">
        <span class="badge" v-if="product.stock == 0">ESGOTADO</span>
        <span class="counter">{{ selectedIndex + 1 }} / {{ product.images.length }}</span>
        <figure>
          <img :src="product.images[selectedIndex]" :alt="product.productName" class="main-image" />
        </figure>
      </div>

      <div class="product-details">
        <div class="breadcrumb">
            <RouterLink to="/">Início</RouterLink>
            <span> › </span>
            <RouterLink to="/">{{product.categoryName}}</RouterLink>
            <span> › </span>
            <span>{{product.productName}}</span>
        </div>

        <h3 class="product-name">{{product.productName}}</h3>
        <p class="price">MZN {{ product.price.toFixed(2) }}</p>
        <p class="installments">12 x de MZN {{product.price.toFixed(2)}}</p>
        <a href="#" class="more-details">Ver mais detalhes</a>

        <button v-if="product.stock > 0" class="btn" @click="addToCart">Comprar</button>
        <button v-else class="btn btn-esgotado" disabled>Esgotado</button>

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

        <div class="policies">
          <div class="policy-item">
            <span class="policy-icon">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"/>
                </svg>
            </span>
            <div>
              <strong>Compra protegida</strong>
              <p>Seus dados cuidados durante toda a compra.</p>
            </div>
          </div>
          <div class="policy-item">
            <span class="policy-icon">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M17.65 6.35A7.95 7.95 0 0012 4V1L7 6l5 5V7a5 5 0 11-5 5H5a7 7 0 107.75-6.93z"/>
                </svg>
            </span>
            <div>
              <strong>Trocas e devoluções</strong>
              <p>Se não gostar, você pode trocar ou devolver.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>

    <section>
        <div class="product-description">    
        <div class="tabs">
            <button :class="['tab', { active: activeTab === 'descricao' }]" @click="activeTab = 'descricao'">Descrição</button>
            <button :class="['tab', { active: activeTab === 'info' }]" @click="activeTab = 'info'">Avaliação</button>
        </div>

        <div v-if="activeTab === 'descricao'" class="tab-content">
            <h3>{{product.titleDescription}}</h3>
            <div v-for="longDes in product.longDescription">
                <p v-if="longDes.type == 'heading'" class="subtitle" :class="longDes.isItalic? 'italic': '' || longDes.isBold? 'bold': ''">{{longDes.text}}</p>
                <p v-if="longDes.type == 'paragraph'" :class="longDes.isItalic? 'italic': '' || longDes.isBold? 'bold': ''">{{longDes.text}}</p>
                <p v-if="longDes.type == 'checklist'" :class="longDes.isItalic? 'italic': '' || longDes.isBold? 'bold': ''">✓ {{ longDes.text }}</p>
            </div>
            <div class="social-share">
            <a href="#" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" aria-label="X / Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            </a>
            </div>
        </div>
        </div>
    </section>

    <section>
        <SimilarProducts
        :category-id="route.params.categoryId"
        :product-id="route.params.productId"/>
    </section>
  </main>
</template>

<style scoped>
.italic{
  font-style: italic;
}

.bold{
  font-weight: 700;
}

main {
  padding: 20px 5%;
  background: #fff5f7;
}

.cart-confirm{
    font-size: 80%;
    margin-top: 10px;
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

.product-container {
  display: grid;
  grid-template-columns: 90px 1fr 1fr;
  gap: 20px;
  align-items: start;
}

.all-images {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.thumb-wrapper {
  margin: 0;
  cursor: pointer;
  border: 2px solid transparent;
  overflow: hidden;
  transition: border-color 0.2s;
}

.mini-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  display: block;
}

.main-image-container {
  position: relative;
}

.main-image-container figure {
  margin: 0;
  overflow: hidden;
}

.main-image {
  width: 100%;
  display: block;
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ffffffb6;
  color: #333;
  font-size: 60%;
  padding: 4px 10px;
  z-index: 1;
  letter-spacing: 0.05em;
}

.counter {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #000000;
  font-size: 13px;
  padding: 4px 10px;
  z-index: 1;
}

.product-details {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
}

.product-name {
  font-weight: 700;
  color: #222;
  margin: 0;
  margin-bottom: 10px;
}

.price {
    font-size: large;
    color: #222;
    margin: 0;
    margin-bottom: 10px;
}

.installments {
  font-size: 0.9rem;
  margin: 0;
  margin-bottom: 5px;
}

.more-details {
  font-size: 0.75rem;
  color: #222;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 20px;
}

.btn{
    background: #e0406a;
    color: white;
    border: none;
    padding: 6px;
    border-radius: 8px;
    font-size: 1rem;
}

.btn-esgotado {
  cursor: not-allowed;
}

.policies {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.policy-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.policy-icon {
  font-size: 1.3rem;
  margin-top: 2px;
}

.policy-item strong {
  font-size: 0.95rem;
  color: #222;
}

.policy-item p {
  font-size: 0.85rem;
  color: #666;
  margin: 2px 0 0;
}

/* Description section */
.product-description {
  margin-top: 40px;
  padding: 0 0 40px;
  border-top: 1px solid #e8e8e8;
}

.tabs {
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid #e8e8e8;
}

.tab {
  background: none;
  border: none;
  padding: 12px 24px;
  font-size: 0.95rem;
  cursor: pointer;
  color: #888;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
}

.tab.active {
  color: #222;
  font-weight: 600;
  border-bottom-color: #e0406a;
}

.tab-content {
  max-width: 750px;
  line-height: 1.8;
  color: #333;
  font-size: 0.95rem;
}

.tab-content h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 8px;
}

.tab-content p {
  margin: 8px 0;
}

.subtitle {
  color: #555;
}

.bold-italic {
  font-weight: 700;
  font-style: italic;
}

.check-list {
  list-style: none;
  padding: 0;
  margin: 12px 0;
}

.check-list li {
  padding: 4px 0;
  color: #333;
}

.bullet-list {
  padding-left: 20px;
  margin: 12px 0;
}

.bullet-list li {
  padding: 4px 0;
}

.social-share {
  display: flex;
  gap: 16px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.social-share a {
  color: #444;
  transition: color 0.2s;
}

.social-share a:hover {
  color: #e0406a;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 70px 1fr;
    grid-template-rows: auto auto;
  }

  .product-details {
    grid-column: 1 / -1;
  }
}
</style>