import api from "../index.js"

export const productApi = {
    getAll: async (size = 10, page = 0, sort = "productId,asc") =>
        await api.get('/v1/products', {
        params: {
            size,
            page,
            sort
        }
    }),
    getOffers: async (size = 10, page = 0, sort = "discountPrice,asc") =>
        await api.get('/v1/products/offers', {
        params: {
            size,
            page,
            sort
        }
    }),
    getTopSales: async () => await api.get('/v1/products/top-sales'),
    getSpecialCombo: async() => await api.get('/v1/products/special-combo')    
}