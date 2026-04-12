import { data } from "autoprefixer";
import api from "../index.js";

export const cartApi = {
    mergeCarts: async (localItems) => {
        const data = {
            items: localItems
        };

        console.log('here', localItems);

        return await api.post('/v1/cart/merge', data);
    },

    getCart: async () => await api.get('/v1/cart'),
    addItem: async ({productId, quantity})=> {
        const data = {
            items: [
                {
                    productId,
                    quantity
                }
            ]
        }

        return await api.post('/v1/cart', data);
    },
    updateItem: async ({productId, quantity}) =>{
        const data = {
            productId,
            quantity
        }

        return await api.post('/v1/cart/update', data);
    },
    clearCart: async () => await api.delete('/v1/cart'),
    removeItem: async (productId) => await api.delete(`/v1/cart/remove/${productId}`),

};