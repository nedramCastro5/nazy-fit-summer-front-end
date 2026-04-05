import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import Login from "@/pages/Login.vue"
import Register from "@/pages/Register.vue";

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/product/:productId/:slug/:categoryId',
        component: ProductPage
    },
    {
        path: '/account/login',
        component: Login
    },
    {
        path: '/account/register',
        component: Register
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