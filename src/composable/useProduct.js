import { ref } from "vue";
import { productApi } from "@/api/Product/productApi";

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
            products.value = data?.data?.content ?? [];
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
            error.value = err.message
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

    return {
        fetchAll,
        fetchOffers, 
        fetchBestSelling, 
        fetchSpecialCombo,
        fetchBySlug,
        fetchByCategoryId,
        products, 
        loading, 
        error, 
        product
    }
}