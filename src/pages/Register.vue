<script setup>
import { ref } from 'vue';
import { useAuthentication } from '@/composable/useAuthentication';
import BreadCrumb from '@/components/components-parts/BreadCrumb.vue';
const showPassword1 = ref(false);
const showPassword2 = ref(false);

const {error, handleRegstration}  = useAuthentication();

const register = () =>{
    const insertedFullName = document.getElementById('userFullName').value
    const insertedEmail = document.getElementById('userEmail').value
    const insertedPhoneNumber = document.getElementById('userPhoneNumber').value
    const insertedPassword = document.getElementById('password').value
    const insertedConfirmPassword = document.getElementById('confirmPassword').value;

    if(insertedFullName == "" || !insertedFullName){
        error.value = "Insira o seu nome completo"
        return;
    }

    if(insertedPhoneNumber == "" || !insertedPhoneNumber){
        error.value = "Insira o seu numero de telefone"
        return;
    }

    if(insertedEmail == "" || !insertedEmail){
        error.value = "Insira o seu email"
        return;
    }


    if(insertedPassword == "" || !insertedPassword ){
        error.value = "Insira a sua senha"
        return;
    }

    if(insertedConfirmPassword == "" || !insertedConfirmPassword){
        error.value = "Confirme a sua senha"
        return;
    }

    if(insertedPassword !== insertedConfirmPassword){
        error.value = "As senhas são diferentes"
        return;
    }

    handleRegstration({
        fullName: insertedFullName,
        email: insertedEmail,
        phoneNumber: insertedPhoneNumber,
        password: insertedPassword,
        confirmPassword: insertedConfirmPassword
    })

}
</script>
<template>
    <main>
        <BreadCrumb
        :page="'Cadastre-se'"/>
        <div class="login-container">
            <h3>Criar uma conta</h3>
            <br>
                <p class="phrase">Compre mais rápido e acompanhe seus pedidos em um só lugar</p>
            <br>
            <form @submit.prevent="register" class="login-form">
                <label for="name">Nome completo</label>
            <br>
                <input type="text" name="name" id="userFullName" placeholder="ex: Marden Castro">
            <br>
                <label for="email">E-mail</label>
            <br>
                <input type="email" name="email" id="userEmail" placeholder="ex: seuemail@email.com">
            <br>
                <label for="phoneNumber">Telefone</label>
            <br>
                <input type="tel" name="email" id="userPhoneNumber" placeholder="ex: 841234567">
            <br>
                <label for="password">Senha</label>
            <br>
                    <div class="input-wrapper">
                        <input
                            :type="showPassword1 ? 'text' : 'password'"
                            name="password"
                            id="password"
                            placeholder="ex: suasenha"
                        >
                        <button type="button" @click="showPassword1 = !showPassword1" class="eye-btn">
                            <svg v-if="!showPassword1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.52 18.52 0 0 1 5-5M1 1l22 22"/>
                            </svg>
                        </button>
                    </div>
                <label for="password">Confirmar Senha</label>
            <br>
                    <div class="input-wrapper">
                        <input
                            :type="showPassword2 ? 'text' : 'password'"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirmar senha"
                        >
                        <button type="button" @click="showPassword2 = !showPassword2" class="eye-btn">
                            <svg v-if="!showPassword2" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.52 18.52 0 0 1 5-5M1 1l22 22"/>
                            </svg>
                        </button>
                    </div>
                
                <span class="error" v-if="error">{{error}}</span>
                <button type="submit" class="login-btn">Criar uma conta</button>
                
                <div class="register-opt">
                    <label for="register">Ja possui uma conta? <RouterLink to="/account/login">Faça login</RouterLink></label>
                </div>
            </form>
        </div>
    </main>
</template>

<style scoped>
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
    display: none;
}

input[type="password"] {
    -webkit-text-security: disc;
}

h3{
    margin: 0;
}

.phrase{
    font-size: 80%;
    margin: 0;
}

.register-opt{
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 400px;
}

.login-btn{
    border: none;
    width: 100%;
    max-width: 400px;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: #e0406a;
    margin-bottom: 5px;
    margin-top: 10px;
    font-size: 90%;
}

main{
    margin-top: 20px;
    margin-bottom: 30px;
    padding: 0 10%;
}

.login-form label{
    font-size: 0.9rem;
    color: #333;
}

.login-form div.input-wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
}

.login-form input{
    border: 1px solid rgba(51, 51, 51, 0.3);
    padding: 8px 30px 8px 10px;
    width: 100%;
    max-width: 400px;
    margin-top: 2px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border-radius: 4px;
}

.login-form input:focus{
    outline: none;
}

.eye-btn{
    position: absolute; 
    right: 10px; 
    top: 40%; 
    transform: translateY(-50%); 
    border: none; 
    background: transparent; 
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}
</style>