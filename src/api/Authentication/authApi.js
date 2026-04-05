import api from "../index.js"

export const authApi = {
    login: async ({email, password}) =>{ 
        return await api.post('/v1/login', {email, password})
    },
    register: async ({fullName, email, phoneNumber, password, confirmPassword}) =>{
        return await api.post('/v1/register', {fullName, email, phoneNumber, password, confirmPassword});
    }
}