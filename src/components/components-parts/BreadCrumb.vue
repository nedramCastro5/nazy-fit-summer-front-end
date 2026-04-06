<script setup>
const props = defineProps({
    page: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="breadcrumb">
        <RouterLink to="/">Início</RouterLink>
        <span> › </span>
        <RouterLink to="/">Minha Conta</RouterLink>
        <span v-if="props.page != ''"> › </span>
        <span v-if="props.page != ''">{{props.page}}</span>
    </div>
</template>

<style scoped>
.breadcrumb *{
    color: black;
}

.breadcrumb {
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 8px;
}

.breadcrumb a {
    color: #888;
    text-decoration: none;
}
.breadcrumb a:hover {
    text-decoration: underline;
}

</style>