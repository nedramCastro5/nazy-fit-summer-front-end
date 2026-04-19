import api from "../index.js";

export const categoryApi = {

    list: async () => await api.get('/v1/category'),

}