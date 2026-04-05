import { ref } from "vue";
import { authApi } from "@/api/Authentication/authApi";
import router from "@/router";

export function useAuthentication(){
    const error = ref(null)

    const handleLogin = async ({email, password}) =>{
        try{
            const {data} = await authApi.login({email: email, password: password})
            localStorage.setItem('token', data.data.token);
            router.push('/');
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


    return{
        handleLogin,
        handleRegstration,
        error
    }
}