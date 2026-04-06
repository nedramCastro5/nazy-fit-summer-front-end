import { reactive } from "vue";

export const authState = reactive({
    isLogged: false,
    user: {
        email: "",
        fullName: "",
        phoneNumber: ""
    }
})