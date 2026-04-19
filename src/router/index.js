import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import SearchView from "@/components/SearchView.vue";
import Login from "@/pages/Login.vue"
import Register from "@/pages/Register.vue";
import Account from "@/pages/Account.vue";

import Admin from "@/pages/admin-dashboard/Admin.vue";
import AddProduct from "@/pages/admin-dashboard/views/AddProduct.vue";
import ManageProducts from "@/pages/admin-dashboard/views/ManageProducts.vue";
import Analitics from "@/pages/admin-dashboard/views/Analitics.vue";
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        meta: {hideLayout: false}
    },
    {
        path: '/product/:productId/:slug/:categoryId',
        name: 'productPage',
        component: ProductPage,
        meta: {hideLayout: false}
    },
    {
        path: '/account/login',
        name: 'login',
        component: Login,
        meta: {hideLayout: false}
    },
    {
        path: '/account/register',
        name: 'register',
        component: Register,
        meta: {hideLayout: false}
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
        meta: {hideLayout: false}
    },
    {
        path: '/search',
        component: SearchView
    },
    {
        path: '/nazy-fit/admin',
        name: 'admin',
        component: Admin,
        meta: {hideLayout: true},
        children: [
            {
                path: 'analitics/analise',
                component: Analitics,
                name: 'analise'
            },
            {
                path: 'products/adicionar',
                component: AddProduct,
                name: 'addProduct'
            },
            {
                path: 'products/gerir',
                component: ManageProducts,
                name: 'manageProducts'
            }
        ]
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