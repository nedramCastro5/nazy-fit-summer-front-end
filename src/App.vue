<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <Header/>
    <RouterView :key="$route.fullPath"/>
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