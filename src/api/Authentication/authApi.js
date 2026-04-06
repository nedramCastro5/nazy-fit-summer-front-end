import api from "../index.js"

export const authApi = {
    login: async ({email, password}) =>{ 
        return await api.post('/v1/login', {email, password})
    },
    register: async ({fullName, email, phoneNumber, password, confirmPassword}) =>{
        return await api.post('/v1/register', {fullName, email, phoneNumber, password, confirmPassword});
    },
    checkIfLogged: async () => {
        return await api.get('/v1/auth/check')
    },
    logout: async () => {
        return await api.post('/v1/logout')
    }
}