import { ref } from "vue";
import { categoryApi } from "@/api/Categories/categoriesApi";

export function useCategory() {
    const error = ref(null);
    const loading = ref(false)
    const category = ref({
        categoryId: 0,
        categoryName: "",
        slug: ""
    })
    const categories = ref([category])

    const fetchAll = async () => {
        try{
            loading.value = true;

            const {data} = await categoryApi.list();

            categories.value = data.data;
        }catch(err){
            error.value = err.message;
        }finally{
            loading.value = false;
        }
    }



    return {
        fetchAll,
        loading,
        error,
        categories,
        category    
    }
}