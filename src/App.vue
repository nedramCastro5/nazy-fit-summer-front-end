<script setup>
import Header from './components/Header.vue';
import HeroBanner from './components/HeroBanner.vue';
import Lancamentos from './components/Lancamentos.vue';
import Politicas from './components/Politicas.vue';
import Ofertas from './components/Ofertas.vue';
import ComboEspecial from './components/ComboEspecial.vue';
import Destaques from './components/Destaques.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <Header />
    <main>
        <HeroBanner/>
        <Lancamentos/>
        <Politicas/>
        <Ofertas/>
        <ComboEspecial/>
        <Destaques/>
    </main>
    <Footer/>
    <a href=""><img src="@/assets/wa-logo.png" alt="Whatsapp logo" class="wa-logo"></a>
</template>

<style scoped>
.wa-logo{
    position: fixed;
    right: 0;
    left: 95%;
    bottom: 10px;
    width: 40px;
    z-index: 1000;
    border-radius: 50%;
}
</style>