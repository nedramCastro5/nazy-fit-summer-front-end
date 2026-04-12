import { ref } from "vue";
import { authApi } from "@/api/Authentication/authApi";
import router from "@/router";
import { authState } from "./useAuthState";
import { CART_STORAGE_KEY } from "./useCart";

export function useAuthentication(){
    const error = ref(null)
    const loading = ref(false);

    const handleLogin = async ({email, password}) =>{
        try{
            const {data} = await authApi.login({email: email, password: password})
            
            if(data.success){
                localStorage.setItem('userDetails', JSON.stringify(data.data));
                authState.isLogged = true;
                authState.user = {
                    email: data.data.email,
                    phoneNumber: data.data.phoneNumber,
                    fullName: data.data.fullName
                };
                localStorage.removeItem(CART_STORAGE_KEY);
                router.push('/');
            }
        }catch(err){
            error.value = "Email ou senha incorrectos";
        }
    }

    const handleRegstration = async ({fullName, email, phoneNumber, password, confirmPassword}) =>{
        try{
            const {data} = await authApi.register({fullName: fullName, email: email, phoneNumber: phoneNumber, password: password, confirmPassword:confirmPassword})

            if(!data.success){
                error.value = response.message;    
                return;
            }

            router.push('/account/login');
        }catch(err){
            error.value = err.message;
        }
    }

    const handleCheck = async () =>{
        try{
            loading.value = true;
            const {data} = await authApi.checkIfLogged();

            if(!data.success){
                return false;
            }

            return true;
        }catch(err){
            error.value = err.message;
            return false;
        }finally{
            loading.value = false;
        }
    }

    const handleLogout = async () =>{
        try{
            const {data} = await authApi.logout();

            if(data.success){
                localStorage.removeItem('userDetails');
                authState.isLogged = false;
                authState.user  = {email: "", fullName: "", phoneNumber: ""};
                router.push('/')
            }
        }catch(err){
            error.value = err.message;
        }
    }


    return{
        handleLogin,
        handleRegstration,
        handleCheck,
        handleLogout,
        loading,
        error
    }
}