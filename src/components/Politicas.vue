<template>
  <section class="info-section">
    <div class="info-grid">

      <div class="info-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a2 2 0 012-2h4a2 2 0 012 2v6M9 17H5a2 2 0 01-2-2V7a2 2 0 012-2h4m4 0h4a2 2 0 012 2v8a2 2 0 01-2 2h-4" />
        </svg>
        <h3>Política de Frete</h3>
        <p>{{ politicaFrete }}</p>
      </div>

      <div class="info-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 6h10M7 14h10M5 18h14" />
        </svg>
        <h3>Parcelamento</h3>
        <p>{{ parcelamento }}</p>
      </div>

      <div class="info-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m2 6a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3>Compra Segura</h3>
        <p>{{ compraSegura }}</p>
      </div>

      <div class="info-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4h14V3M5 7v14h14V7H5z" />
        </svg>
        <h3>Ofertas</h3>
        <p>{{ ofertas }}</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const politicaFrete = ref(
  "Leia nossa política de frete para ficar sempre atualizado!"
);

const parcelamento = ref(
  "Parcele em até 12 vezes nos cartões mediante as taxas da plataforma"
);

const compraSegura = ref(
  "100% seguro em seus pagamentos"
);

const ofertas = ref(
  "Aproveite nossos produtos em ofertas!"
);
</script>

<style scoped>
.info-section {
  background-color: #d6336c;
  color: white;
  padding: 3rem 1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-item .icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.75rem;
}

.info-item h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.info-item p {
  font-size: 0.875rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>