<script setup>
import { onMounted, ref, computed } from 'vue';
import { useProduct } from '@/composable/useProduct';
import { useCategory } from '@/composable/useCategories';
import { Search, Pencil, Trash2, X, Save } from 'lucide-vue-next';

const { fetchList: getProducts, updateProduct, deleteProduct, products, error, loading } = useProduct();
const { fetchAll: getCategories, categories } = useCategory();

const search = ref('');
const filterCategory = ref('');
const editingProduct = ref(null);
const showDeleteModal = ref(false);
const productToDelete = ref(null);
const editImages = ref([]);

const maxLength = 120;
const expandedDescriptions = ref({});


const filteredProducts = computed(() => {
    return (products.value || []).filter(p => {
        const matchName = p.productName?.toLowerCase().includes(search.value.toLowerCase());
        const matchCat = filterCategory.value === '' || String(p.categoryId) === String(filterCategory.value);
        return matchName && matchCat;
    });
});

const openEdit = (product) => {
    editingProduct.value = { ...product, description: product.description ? JSON.parse(JSON.stringify(product.description)) : [] };
    editImages.value = [];
};

const closeEdit = () => {
    editingProduct.value = null;
    editImages.value = [];
};

const handleEditFiles = (e) => {
    editImages.value = Array.from(e.target.files);
};

const addBlock = () => {
    editingProduct.value.description.push({
        type: '',
        text: '',
        isBold: false,
        isItalic: false,
        position: editingProduct.value.description.length + 1
    });
};

const removeBlock = (index) => {
    editingProduct.value.description.splice(index, 1);
};

const saveEdit = async () => {
    const fd = new FormData();
    fd.append('productName', editingProduct.value.productName);
    fd.append('titleDescription', editingProduct.value.titleDescription);
    fd.append('shortDescription', editingProduct.value.shortDescription);
    fd.append('price', editingProduct.value.price);
    fd.append('stock', editingProduct.value.stock);
    fd.append('categoryId', editingProduct.value.categoryId);
    fd.append('isSpecialCombo', editingProduct.value.isSpecialCombo);
    fd.append('isFeatured', editingProduct.value.isSpecialCombo);
    fd.append('description', JSON.stringify(editingProduct.value.description));
    editImages.value.forEach(img => fd.append('images', img));

    await updateProduct(editingProduct.value.productId, fd);
    closeEdit();
    await getProducts();
};

const confirmDelete = (product) => {
    productToDelete.value = product;
    showDeleteModal.value = true;
};

const cancelDelete = () => {
    productToDelete.value = null;
    showDeleteModal.value = false;
};

const executeDelete = async () => {
    await deleteProduct(productToDelete.value.productId);
    showDeleteModal.value = false;
    productToDelete.value = null;
    await getProducts();
};

const getCategoryName = (id) => {
    const cat = (categories.value || []).find(c => String(c.categoryId) === String(id));
    return cat ? cat.categoryName : '—';
};

const isExpanded = (id) => {
    return !!expandedDescriptions.value[id];
};

const toggleDescription = (id) => {
    expandedDescriptions.value[id] = !expandedDescriptions.value[id];
};

const formatShortDescription = (product) => {
    const text = product.shortDescription || '';

    if (isExpanded(product.productId) || text.length <= maxLength) {
        return text;
    }

    return text.slice(0, maxLength) + '...';
};

onMounted(async () => {
    await Promise.all([getProducts(), getCategories()]);
});
</script>

<template>
    <div class="page">
        <h1>Gerir Produtos</h1>

        <div class="filters">
            <div class="search-wrap">
                <Search class="search-icon" />
                <input v-model="search" placeholder="Pesquisar produto..." />
            </div>
            <select v-model="filterCategory" class="filter-select">
                <option value="">Todas as categorias</option>
                <option v-for="cat in categories" :key="cat.categoryId" :value="cat.categoryId">
                    {{ cat.categoryName }}
                </option>
            </select>
        </div>

        <div v-if="loading" class="state-msg">A carregar produtos...</div>
        <div v-else-if="error" class="state-msg error">{{ error }}</div>

        <template v-else>
            <!-- Desktop Table -->
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Categoria</th>
                            <th>Preço</th>
                            <th>Stock</th>
                            <th>Combo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredProducts.length === 0">
                            <td colspan="6" class="empty">Nenhum produto encontrado.</td>
                        </tr>
                        <tr v-for="product in filteredProducts" :key="product.productId">
                            <td>
                                <div class="product-name">{{ product.productName }}</div>
                                <div class="product-sub">
                                    {{ formatShortDescription(product) }}

                                    <span
                                        v-if="product.shortDescription && product.shortDescription.length > maxLength"
                                        @click="toggleDescription(product.productId)"
                                        style="cursor: pointer; color: #2563eb; margin-left: 6px;"
                                    >
                                        {{ isExpanded(product.productId) ? 'mostrar menos' : 'mostrar mais' }}
                                    </span>
                                </div>
                            </td>
                            <td>{{ getCategoryName(product.categoryId) }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <span :class="['stock-badge', product.stock <= 5 ? 'low' : 'ok']">
                                    {{ product.stock }}
                                </span>
                            </td>
                            <td>
                                <span :class="['combo-badge', product.isSpecialCombo ? 'yes' : 'no']">
                                    {{ product.isSpecialCombo ? 'Sim' : 'Não' }}
                                </span>
                            </td>
                            <td>
                                <div class="actions">
                                    <button class="btn-edit" @click="openEdit(product)" title="Editar">
                                        <Pencil />
                                    </button>
                                    <button class="btn-delete" @click="confirmDelete(product)" title="Remover">
                                        <Trash2 />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Mobile Cards -->
            <div class="card-list">
                <div v-if="filteredProducts.length === 0" class="empty-card">
                    Nenhum produto encontrado.
                </div>
                <div v-for="product in filteredProducts" :key="product.productId" class="product-card">
                    <div class="card-top">
                        <div>
                            <div class="product-name">{{ product.productName }}</div>
                            <div class="product-sub">
                                {{ formatShortDescription(product) }}

                                <span
                                    v-if="product.shortDescription && product.shortDescription.length > maxLength"
                                    @click="toggleDescription(product.productId)"
                                    style="cursor: pointer; color: #2563eb; margin-left: 6px;"
                                >
                                    {{ isExpanded(product.productId) ? 'mostrar menos' : 'mostrar mais' }}
                                </span>
                            </div>
                        </div>
                        <div class="actions">
                            <button class="btn-edit" @click="openEdit(product)"><Pencil /></button>
                            <button class="btn-delete" @click="confirmDelete(product)"><Trash2 /></button>
                        </div>
                    </div>
                    <div class="card-meta">
                        <div class="meta-item">
                            <span class="meta-label">Categoria</span>
                            <span class="meta-value">{{ getCategoryName(product.categoryId) }}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Preço</span>
                            <span class="meta-value">{{ product.price }}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Stock</span>
                            <span :class="['stock-badge', product.stock <= 5 ? 'low' : 'ok']">{{ product.stock }}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Combo</span>
                            <span :class="['combo-badge', product.isSpecialCombo ? 'yes' : 'no']">
                                {{ product.isSpecialCombo ? 'Sim' : 'Não' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <!-- Edit Modal -->
        <div v-if="editingProduct" class="modal-overlay" @click.self="closeEdit">
            <div class="modal">
                <div class="modal-header">
                    <h2>Editar Produto</h2>
                    <button class="close-btn" @click="closeEdit"><X /></button>
                </div>
                <div class="modal-body">
                    <div class="grid">
                        <input v-model="editingProduct.productName" placeholder="Nome do produto" />
                        <input v-model="editingProduct.price" placeholder="Preço" />
                        <input v-model="editingProduct.stock" placeholder="Stock" />
                        <select v-model="editingProduct.categoryId">
                            <option disabled value="">Selecione uma categoria</option>
                            <option v-for="cat in categories" :key="cat.categoryId" :value="cat.categoryId">
                                {{ cat.categoryName }}
                            </option>
                        </select>
                    </div>
                    <input v-model="editingProduct.titleDescription" placeholder="Título da descrição" />
                    <input v-model="editingProduct.shortDescription" placeholder="Descrição curta" />

                    <div class="builder">
                        <div class="builder-header">
                            <h3>Descrição</h3>
                            <button class="add" @click="addBlock">+ Bloco</button>
                        </div>
                        <div v-for="(block, index) in editingProduct.description" :key="index" class="block">
                            <div class="block-top">
                                <select v-model="block.type">
                                    <option disabled value="">Tipo</option>
                                    <option value="heading">Cabeçalho</option>
                                    <option value="paragraph">Parágrafo</option>
                                    <option value="checklist">Checklist</option>
                                </select>
                                <button class="remove" @click="removeBlock(index)">✖</button>
                            </div>
                            <input v-model="block.text" placeholder="Conteúdo..." />
                            <div class="toggles">
                                <label><input type="checkbox" v-model="block.isBold" /> Negrito</label>
                                <label><input type="checkbox" v-model="block.isItalic" /> Itálico</label>
                            </div>
                        </div>
                    </div>

                    <label class="checkbox">
                        <input type="checkbox" v-model="editingProduct.isSpecialCombo" />
                        Combo Especial
                    </label>

                    <input type="file" multiple @change="handleEditFiles" />
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" @click="closeEdit">Cancelar</button>
                    <button class="btn-save" @click="saveEdit"><Save /> Guardar</button>
                </div>
            </div>
        </div>

        <!-- Delete Modal -->
        <div v-if="showDeleteModal" class="modal-overlay" @click.self="cancelDelete">
            <div class="modal modal-sm">
                <div class="modal-header">
                    <h2>Confirmar remoção</h2>
                    <button class="close-btn" @click="cancelDelete"><X /></button>
                </div>
                <div class="modal-body">
                    <p>Tens a certeza que queres remover <strong>{{ productToDelete?.productName }}</strong>? Esta acção não pode ser revertida.</p>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel" @click="cancelDelete">Cancelar</button>
                    <button class="btn-delete-confirm" @click="executeDelete">Remover</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    margin-left: 250px;
    padding: 30px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

@media (max-width: 768px) {
    .page {
        margin-left: 0;
        padding: 16px;
        padding-top: 60px;
    }
}

h1 {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
}

/* ── Filters ── */
.filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.search-wrap {
    position: relative;
    flex: 1;
    min-width: 200px;
}

.search-wrap input {
    width: 100%;
    padding: 10px 10px 10px 36px;
    border: 1px solid #cbd5e1;
    box-sizing: border-box;
}

.search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: #94a3b8;
}

.filter-select {
    width: auto;
    min-width: 160px;
}

@media (max-width: 480px) {
    .filter-select { width: 100%; }
}

input, select {
    padding: 10px;
    border: 1px solid #cbd5e1;
    outline: none;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
}

/* ── Desktop Table ── */
.table-wrap {
    overflow-x: auto;
    background: white;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

@media (max-width: 768px) {
    .table-wrap { display: none; }
}

table { width: 100%; border-collapse: collapse; font-size: 14px; }

thead tr { background: #0f172a; color: white; }

th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.03em;
    white-space: nowrap;
}

tbody tr { border-bottom: 1px solid #f1f5f9; transition: background 0.15s; }
tbody tr:hover { background: #f8fafc; }

td { padding: 12px 16px; color: #334155; vertical-align: middle; }

.product-name { font-weight: 600; color: #0f172a; }
.product-sub  { font-size: 12px; color: #94a3b8; margin-top: 2px; }

/* ── Mobile Cards ── */
.card-list { display: none; flex-direction: column; gap: 10px; }

@media (max-width: 768px) {
    .card-list { display: flex; }
}

.product-card {
    background: white;
    border: 1px solid #e2e8f0;
    padding: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
}

.card-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding-top: 10px;
    border-top: 1px solid #f1f5f9;
}

.meta-item { display: flex; flex-direction: column; gap: 3px; }

.meta-label {
    font-size: 11px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
}

.meta-value { font-size: 13px; color: #334155; font-weight: 500; }

.empty-card {
    text-align: center;
    color: #94a3b8;
    padding: 40px 20px;
    background: white;
    border: 1px solid #e2e8f0;
}

/* ── Badges ── */
.stock-badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
}
.stock-badge.ok  { background: #dcfce7; color: #16a34a; }
.stock-badge.low { background: #fee2e2; color: #dc2626; }

.combo-badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
}
.combo-badge.yes { background: #dbeafe; color: #2563eb; }
.combo-badge.no  { background: #f1f5f9; color: #64748b; }

/* ── Action Buttons ── */
.actions { display: flex; gap: 6px; flex-shrink: 0; }

.btn-edit, .btn-delete {
    border: none;
    padding: 7px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
}

.btn-edit  { background: #dbeafe; color: #2563eb; }
.btn-edit:hover  { background: #2563eb; color: white; }
.btn-delete { background: #fee2e2; color: #dc2626; }
.btn-delete:hover { background: #dc2626; color: white; }
.btn-edit svg, .btn-delete svg { width: 15px; height: 15px; }

.empty { text-align: center; color: #94a3b8; padding: 40px; }
.state-msg { padding: 20px; color: #64748b; }
.state-msg.error { color: #dc2626; }

/* ── Modal ── */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15,23,42,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 16px;
}

.modal {
    background: white;
    width: 100%;
    max-width: 680px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.modal-sm { max-width: 420px; }

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #e2e8f0;
    background: #0f172a;
    color: white;
    flex-shrink: 0;
}

.modal-header h2 { margin: 0; font-size: 16px; font-weight: 700; }

.close-btn {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    opacity: 0.7;
    transition: 0.2s;
    padding: 4px;
}
.close-btn:hover { opacity: 1; }
.close-btn svg { width: 18px; height: 18px; }

.modal-body {
    padding: 20px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
}

.modal-body p { margin: 0; color: #334155; line-height: 1.6; }

.modal-footer {
    padding: 14px 20px;
    border-top: 1px solid #e2e8f0;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    flex-shrink: 0;
}

@media (max-width: 480px) {
    .modal-footer {
        flex-direction: column-reverse;
    }
    .modal-footer button {
        width: 100%;
        justify-content: center;
    }
}

.btn-cancel {
    background: #f1f5f9;
    border: none;
    padding: 10px 18px;
    color: #334155;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s;
}
.btn-cancel:hover { background: #e2e8f0; }

.btn-save {
    background: #2563eb;
    border: none;
    padding: 10px 18px;
    color: white;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: 0.2s;
}
.btn-save:hover { background: #1d4ed8; }
.btn-save svg { width: 15px; height: 15px; }

.btn-delete-confirm {
    background: #dc2626;
    border: none;
    padding: 10px 18px;
    color: white;
    cursor: pointer;
    font-weight: 600;
    transition: 0.2s;
}
.btn-delete-confirm:hover { background: #b91c1c; }

/* ── Builder ── */
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

@media (max-width: 480px) {
    .grid { grid-template-columns: 1fr; }
}

.builder {
    background: #f8fafc;
    padding: 14px;
    border: 1px solid #e2e8f0;
}

.builder-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.builder-header h3 { margin: 0; font-size: 14px; font-weight: 700; color: #0f172a; }

.block {
    margin-top: 10px;
    padding: 12px;
    border: 1px solid #e2e8f0;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.block-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}

.block-top select { width: auto; flex: 1; }

.toggles {
    display: flex;
    gap: 15px;
    font-size: 13px;
    color: #334155;
    flex-wrap: wrap;
}

.add {
    background: #16a34a;
    color: white;
    border: none;
    padding: 7px 12px;
    cursor: pointer;
    font-size: 13px;
    white-space: nowrap;
}

.remove {
    background: #dc2626;
    color: white;
    border: none;
    padding: 5px 8px;
    cursor: pointer;
    flex-shrink: 0;
}

.checkbox {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 14px;
    color: #334155;
}

.checkbox input[type="checkbox"] { width: auto; }
</style>