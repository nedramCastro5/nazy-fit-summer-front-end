import { ref } from "vue";
import { productApi } from "@/api/Product/productApi";

export function useProduct() {
    const product = ref(null)
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

    return {fetchAll, fetchOffers, products, loading, error, product}
}