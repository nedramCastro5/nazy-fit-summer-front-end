<script setup>
import { ref } from 'vue';
import { useAuthentication } from '@/composable/useAuthentication';
import BreadCrumb from '@/components/components-parts/BreadCrumb.vue';

const showPassword1 = ref(false);
const showPassword2 = ref(false);

const { error, handleRegstration } = useAuthentication();

const fullName = ref('');
const email = ref('');
const phoneNumber = ref('');
const password = ref('');
const confirmPassword = ref('');
const formErrors = ref({});

const validate = () => {
    const errors = {};

    if (!fullName.value.trim())
        errors.fullName = 'Insira o seu nome completo.';
    else if (fullName.value.trim().split(' ').length < 2)
        errors.fullName = 'Insira o nome e sobrenome.';

    if (!email.value.trim())
        errors.email = 'Insira o seu email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
        errors.email = 'Insira um email válido.';

    if (!phoneNumber.value.trim())
        errors.phoneNumber = 'Insira o seu número de telefone.';
    else if (!/^\d{9,15}$/.test(phoneNumber.value.replace(/\s/g, '')))
        errors.phoneNumber = 'Número de telefone inválido.';

    if (!password.value)
        errors.password = 'Insira a sua senha.';
    else if (password.value.length < 6)
        errors.password = 'A senha deve ter pelo menos 6 caracteres.';

    if (!confirmPassword.value)
        errors.confirmPassword = 'Confirme a sua senha.';
    else if (password.value !== confirmPassword.value)
        errors.confirmPassword = 'As senhas não coincidem.';

    return errors;
};

const register = () => {
    formErrors.value = validate();
    if (Object.keys(formErrors.value).length > 0) return;

    handleRegstration({
        fullName: fullName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    });
};
</script>

<template>
    <main>
        <BreadCrumb :page="'Cadastre-se'" />
        <div class="login-container">
            <h3>Criar uma conta</h3>
            <p class="phrase">Compre mais rápido e acompanhe seus pedidos em um só lugar</p>

            <form @submit.prevent="register" class="login-form">

                <label>Nome completo</label>
                <input
                    type="text"
                    v-model="fullName"
                    placeholder="ex: Marden Castro"
                    :class="{ 'input-error': formErrors.fullName }"
                />
                <span class="error-msg" v-if="formErrors.fullName">{{ formErrors.fullName }}</span>

                <label>E-mail</label>
                <input
                    type="email"
                    v-model="email"
                    placeholder="ex: seuemail@email.com"
                    :class="{ 'input-error': formErrors.email }"
                />
                <span class="error-msg" v-if="formErrors.email">{{ formErrors.email }}</span>

                <label>Telefone</label>
                <input
                    type="tel"
                    v-model="phoneNumber"
                    placeholder="ex: 841234567"
                    :class="{ 'input-error': formErrors.phoneNumber }"
                />
                <span class="error-msg" v-if="formErrors.phoneNumber">{{ formErrors.phoneNumber }}</span>

                <label>Senha</label>
                <div class="input-wrapper">
                    <input
                        :type="showPassword1 ? 'text' : 'password'"
                        v-model="password"
                        placeholder="ex: suasenha"
                        :class="{ 'input-error': formErrors.password }"
                    />
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
                <span class="error-msg" v-if="formErrors.password">{{ formErrors.password }}</span>

                <label>Confirmar Senha</label>
                <div class="input-wrapper">
                    <input
                        :type="showPassword2 ? 'text' : 'password'"
                        v-model="confirmPassword"
                        placeholder="Confirmar senha"
                        :class="{ 'input-error': formErrors.confirmPassword }"
                    />
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
                <span class="error-msg" v-if="formErrors.confirmPassword">{{ formErrors.confirmPassword }}</span>

                <!-- API error -->
                <span class="error-msg api-error" v-if="error">{{ error }}</span>

                <button type="submit" class="login-btn">Criar uma conta</button>

                <div class="register-opt">
                    <label>Já possui uma conta? <RouterLink to="/account/login">Faça login</RouterLink></label>
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

main {
    margin-top: 20px;
    margin-bottom: 30px;
    padding: 0 10%;
}

h3 {
    margin: 0 0 6px 0;
    font-size: 1.2rem;
    color: #0f172a;
}

.phrase {
    font-size: 80%;
    margin: 0 0 16px 0;
    color: #64748b;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.login-form label {
    font-size: 0.9rem;
    color: #333;
    margin-top: 10px;
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
    max-width: 100%;
    padding-right: 36px;
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

.login-btn {
    border: none;
    width: 100%;
    max-width: 400px;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: #e0406a;
    margin-top: 14px;
    margin-bottom: 5px;
    font-size: 90%;
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