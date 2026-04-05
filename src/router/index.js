import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ProductPage from "@/pages/ProductPage.vue";

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/product/:productId/:slug/:categoryId',
        component: ProductPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return{
            top: 0
        }
    }
})

export default router;