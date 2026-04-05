<script setup>
import { ref } from 'vue';
const showPassword = ref(false);
</script>
<template>
    <main>
        <div class="breadcrumb">
            <RouterLink to="/">Início</RouterLink>
            <span> › </span>
            <RouterLink to="/">Minha Conta</RouterLink>
            <span> › </span>
            <span>Login</span>
        </div>

        <div class="login-container">
            <h3>Criar uma conta</h3>
            <br>
                <p class="phrase">Compre mais rápido e acompanhe seus pedidos em um só lugar</p>
            <br>
            <form action="" class="login-form">
                <label for="email">Nome completo</label>
            <br>
                <input type="email" name="email" id="userEmail" placeholder="ex: Marden Castro">
            <br>
                <label for="email">E-mail</label>
            <br>
                <input type="email" name="email" id="userEmail" placeholder="ex: seuemail@email.com">
            <br>
                <label for="email">Telefone</label>
            <br>
                <input type="email" name="email" id="userEmail" placeholder="ex: Marden Castro">
            <br>
                <label for="password">Senha</label>
            <br>
                <div class="input-wrapper">
                    <input
                        :type="showPassword ? 'text' : 'password'"
                        name="password"
                        id="userPassword"
                        placeholder="ex: suasenha"
                    >
                    <button type="button" @click="showPassword = !showPassword" class="eye-btn">
                        <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.52 18.52 0 0 1 5-5M1 1l22 22"/>
                        </svg>
                    </button>
                </div>
                <button type="submit" class="login-btn">Criar uma conta</button>
                <div class="register-opt">
                    <label for="register">Ja possui uma conta? <RouterLink to="/account/login">Faça login</RouterLink></label>
                </div>
            </form>
        </div>
    </main>
</template>

<style scoped>
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
    margin-top: 2px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border-radius: 4px;
}

.login-form input[type="email"] {
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
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

.breadcrumb *{
    color: black;
}
</style>