<script setup>
import Header from '@/components/Header.vue';
import HeroBanner from '@/components/HeroBanner.vue';
import Lancamentos from '@/components/Lancamentos.vue';
import Politicas from '@/components/Politicas.vue';
import Ofertas from '@/components/Ofertas.vue';
import ComboEspecial from '@/components/ComboEspecial.vue';
import Destaques from '@/components/Destaques.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
    <main>
        <HeroBanner/>
        <Lancamentos/>
        <Politicas/>
        <Ofertas/>
        <ComboEspecial/>
        <Destaques/>
    </main>
</template>

<style scoped>
</style>