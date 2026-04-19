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
    listAll: async () => await api.get('/v1/products/all'),
    getOffers: async (size = 10, page = 0, sort = "discountPrice,asc") =>
        await api.get('/v1/products/offers', {
        params: {
            size,
            page,
            sort
        }
    }),
    getTopSales: async () => await api.get('/v1/products/top-sales'),
    getSpecialCombo: async() => await api.get('/v1/products/special-combo'),
    getIsFeatured: async () => await api.get('/v1/products/featured'),
    getBySlug: async (slug) => await api.get(`/v1/products/slug/${slug}`),
    getByCategoryId: async (categoryId) => await api.get(`/v1/products/category/${categoryId}`),
    getById: async (productId) => await api.get(`/v1/products/${productId}`),
    create: async (formData) => await api.post('/v1/products', formData),
    delete: async (productId) => await api.delete(`/v1/products/${productId}`),
    updateProduct: async (productId, fd) => await api.post(`/v1/products/${productId}`, fd),
    search: async (productName) => await api.get(`/v1/products/query/q/${productName}`)
}