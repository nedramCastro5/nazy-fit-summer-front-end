<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

console.log(JSON.parse(localStorage.getItem('userCart')) || []);

// localStorage.clear();
</script>

<template>
    <Header v-if="!$route.meta.hideLayout" />
    <RouterView :key="$route.fullPath"/>
    <Footer v-if="!$route.meta.hideLayout" />
    <a v-if="!$route.meta.hideLayout" href=""><img src="@/assets/wa-logo.png" alt="Whatsapp logo" class="wa-logo"></a>
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