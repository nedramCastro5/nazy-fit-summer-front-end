<script setup>

</script>

<template>
        <div class="roller">
            <div class="track">
            <span v-for="i in 5">ENVIOS A PARTIR DO DIA 10 DE ABRIL</span>
            </div>
        </div>
</template>

<style scoped>
.roller{
    background: linear-gradient(to left, #000000, #df7385);
    height: 50px;
    display: flex;
    align-items: center;
    color: white;
    overflow: hidden;
    white-space: nowrap;
}

.track{
    display: inline-flex;
    gap: 50px;
    animation: scroll 20s linear infinite;
}

.track span{
    font-size: 14px;
    letter-spacing: 1px;
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}
</style>