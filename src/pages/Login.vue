<script setup>
import { ref } from 'vue';
import BreadCrumb from '@/components/components-parts/BreadCrumb.vue';
import { useAuthentication } from '@/composable/useAuthentication';
import { useCart } from '@/composable/useCart';

const showPassword = ref(false);
const { error, handleLogin } = useAuthentication();
const { fetchCart, mergeCarts } = useCart();

const email = ref('');
const password = ref('');
const formErrors = ref({});

const validate = () => {
    const errors = {};

    if (!email.value.trim())
        errors.email = 'Insira o seu email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
        errors.email = 'Insira um email válido.';

    if (!password.value.trim())
        errors.password = 'Insira a sua senha.';
    else if (password.value.length < 6)
        errors.password = 'A senha deve ter pelo menos 6 caracteres.';

    return errors;
};

const login = async () => {
    formErrors.value = validate();
    if (Object.keys(formErrors.value).length > 0) return;

    await handleLogin({ email: email.value, password: password.value });
    await mergeCarts();
    await fetchCart();
};
</script>

<template>
    <main>
        <BreadCrumb :page="'Login'" />
        <div class="login-container">
            <h3>Iniciar Sessão</h3>
            <form @submit.prevent="login" class="login-form">

                <label for="userEmail">E-mail</label>
                <input
                    type="email"
                    id="userEmail"
                    v-model="email"
                    placeholder="ex: seuemail@email.com"
                    :class="{ 'input-error': formErrors.email }"
                />
                <span class="error-msg" v-if="formErrors.email">{{ formErrors.email }}</span>

                <label for="userPassword">Senha</label>
                <div class="input-wrapper">
                    <input
                        :type="showPassword ? 'text' : 'password'"
                        id="userPassword"
                        v-model="password"
                        placeholder="ex: suasenha"
                        :class="{ 'input-error': formErrors.password }"
                    />
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
                <span class="error-msg" v-if="formErrors.password">{{ formErrors.password }}</span>

                <!-- API error -->
                <span class="error-msg api-error" v-if="error">{{ error }}</span>

                <div class="forgot-password">
                    <RouterLink to="/account/forgot-password">Esqueceu a senha?</RouterLink>
                </div>

                <button type="submit" class="login-btn">Iniciar sessão</button>

                <div class="register-opt">
                    <label>Não possui uma conta? <RouterLink to="/account/register">Criar uma conta</RouterLink></label>
                </div>
            </form>
        </div>
    </main>
</template>

<style scoped>
main {
    margin-top: 20px;
    margin-bottom: 30px;
    padding: 0 10%;
}

.login-container h3 {
    margin-bottom: 16px;
    font-size: 1.2rem;
    color: #0f172a;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.login-form label {
    font-size: 0.9rem;
    color: #333;
    margin-top: 8px;
}

.login-form input {
    border: 1px solid rgba(51, 51, 51, 0.3);
    padding: 8px 36px 8px 10px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: border-color 0.2s;
}

.login-form input:focus {
    outline: none;
    border-color: #e0406a;
}

.input-error {
    border-color: #dc2626 !important;
    background-color: #fff5f5;
}

.error-msg {
    font-size: 12px;
    color: #dc2626;
    max-width: 400px;
}

.api-error {
    margin-top: 4px;
    font-weight: 500;
}

.input-wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
}

.input-wrapper input {
    width: 100%;
    max-width: 100%;
}

.eye-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: #94a3b8;
}

.eye-btn:hover {
    color: #333;
}

.forgot-password {
    display: flex;
    justify-content: flex-end;
    max-width: 400px;
    margin-top: 4px;
}

.forgot-password a {
    font-size: 0.8rem;
    color: #e0406a;
    text-decoration: none;
}

.forgot-password a:hover {
    text-decoration: underline;
}

.login-btn {
    border: none;
    width: 100%;
    max-width: 400px;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: #e0406a;
    margin-top: 12px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s;
}

.login-btn:hover {
    background-color: #c73059;
}

.register-opt {
    display: flex;
    justify-content: center;
    max-width: 400px;
    font-size: 0.85rem;
    color: #555;
    margin-top: 6px;
}

.register-opt a {
    color: #e0406a;
    text-decoration: none;
    font-weight: 500;
}

.register-opt a:hover {
    text-decoration: underline;
}
</style>