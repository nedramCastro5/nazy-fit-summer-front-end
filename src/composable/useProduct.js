import { ref } from "vue";
import { productApi } from "@/api/Product/productApi";
import api from "@/api";

export function useProduct() {
    const product = ref({
        productId: 0,
        productName: "",
        titleDescription: "",
        shortDescription: "",
        price: 0,
        discountPrice: "",
        stock: 0,
        categoryId: 0,
        categoryName: "",
        principalUrl: "",
        active: false,
        totalSales: 0,
        slug: "",
        isFeatured: false,
        isSpecialCombo: false,
        images:[],
        longDescription: []
    })

    
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchAll = async () =>{
        loading.value = true;

        try{
            const {data} = await productApi.getAll();
            products.value = data.data.content
        }catch(err){
            error.value = err.message
        }finally{
            loading.value = false;
        }
    }

    const fetchList = async () =>{
        loading.value = true;

        try{
            const {data} = await productApi.listAll();
            console.log(data)
            products.value = data.data
        }catch(err){
            error.value = err.message
        }finally{
            loading.value = false;
        }
    }

    const fetchOffers = async () =>{
        loading.value = true;

        try{
            const {data} = await productApi.getOffers();
            products.value = data.data.content
        }catch(err){
            error.value = err.message
        }finally{
            loading.value = false;
        }
    }

    const fetchBestSelling = async () =>{
        loading.value = true;

        try{
            const {data} = await productApi.getTopSales();
            products.value = data?.data ?? [];
        }catch(err){
            error.value = err.message
            products.value = [];
        }finally{
            loading.value = false;
        }

    }

    const fetchSpecialCombo = async () =>{
        loading.value = true;

        try{
            const {data} = await productApi.getSpecialCombo();
            product.value = data.data;
        }catch(err){
            error.value = "Nenhum combo especial no momento."
        }finally{
            loading.value = false;
        }
    }

    const fetchBySlug = async (slug) =>{
        loading.value = true;

        try{
            const {data} = await productApi.getBySlug(slug);
            product.value = data.data;
        }catch(err){
            error.value = err.message
        }finally{
            loading.value = false
        }
    }

    const fetchByCategoryId = async (categoryId, excludedId = null) =>{
        loading.value = true;

        try{
            const {data} = await productApi.getByCategoryId(categoryId);
            const filtered = excludedId? data.data.filter(p => p.productId !== excludedId)
                            :data.data
            products.value = filtered.slice(0, 5);
        }catch(err){
            error.value = err.message
        }finally{
            loading.value = false
        }
    }

    const createProduct = async (formData) =>{
        loading.value = true;

        try{
            await productApi.create(formData);
        }catch(err){
            error.value = err;
        }finally{
            loading.value = false;
        }
    }

    const deleteProduct = async (productId) => {
        loading.value = true;

        try{
            await productApi.delete(productId);
        }catch(err){
            error.value = err.message
        }finally{
            loading.value = false;
        }
    }

    const fetchIsFeatured = async () =>{
        loading.value = true;
    
        try{
            const {data} = await productApi.getIsFeatured();
            products.value = data.data
        }catch(err){
            error.value = err.message;
        }finally{
            loading.value = false;
        }
    }

    const updateProduct = async (productId, fd) => {
        loading.value = true;
        try{
            await productApi.updateProduct(productId, fd)
        }catch(err){
            error.value = err.message;
        }finally{
            loading.value = false;
        }
    }
    
    const fetchBySearch = async (productName) => {
        loading.value = true;

        try{
            const {data} = await productApi.search(productName);
            products.value = data.data;
        }catch(err){
            error.value = err;
        }finally{
            loading.value = false;
        }

    }

    return {
        fetchAll,
        fetchOffers, 
        fetchBestSelling, 
        fetchSpecialCombo,
        fetchBySlug,
        fetchByCategoryId,
        createProduct,
        deleteProduct,
        fetchList,
        fetchIsFeatured,
        updateProduct,
        fetchBySearch,
        products, 
        loading, 
        error, 
        product
    }
}