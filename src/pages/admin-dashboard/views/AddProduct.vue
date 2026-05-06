<script setup>
import { onMounted, ref } from 'vue';
import { useProduct } from '@/composable/useProduct';
import { useCategory } from '@/composable/useCategories';
import { Check } from 'lucide-vue-next';

const { createProduct, error, loading } = useProduct();
const { fetchAll, categories } = useCategory();
const confirmClicked = ref(false);

const form = ref({
    productName: '',
    titleDescription: '',
    shortDescription: '',
    price: '',
    stock: '',
    categoryId: '',
    isSpecialCombo: false,
    isFeatured: false,
    description: []
});

const images = ref([]);
const formErrors = ref({});

const validate = () => {
    const errors = {};

    if (!form.value.productName.trim())
        errors.productName = 'Nome do produto é obrigatório.';

    if (!form.value.titleDescription.trim())
        errors.titleDescription = 'Título da descrição é obrigatório.';

    if (!form.value.shortDescription.trim())
        errors.shortDescription = 'Descrição curta é obrigatória.';

    if (!form.value.price || isNaN(Number(form.value.price)) || Number(form.value.price) <= 0)
        errors.price = 'Preço deve ser um número maior que 0.';

    if (!form.value.stock || isNaN(Number(form.value.stock)) || !Number.isInteger(Number(form.value.stock)) || Number(form.value.stock) < 0)
        errors.stock = 'Stock deve ser um número inteiro não negativo.';

    if (!form.value.categoryId)
        errors.categoryId = 'Selecione uma categoria.';

    if (images.value.length === 0)
        errors.images = 'Adicione pelo menos uma imagem.';

    form.value.description.forEach((block, i) => {
        if (!block.type)
            errors[`block_type_${i}`] = `Bloco ${i + 1}: selecione um tipo.`;
        if (!block.text.trim())
            errors[`block_text_${i}`] = `Bloco ${i + 1}: o conteúdo não pode estar vazio.`;
    });

    return errors;
};

const addBlock = () => {
    form.value.description.push({
        type: '',
        text: '',
        isBold: false,
        isItalic: false,
        position: form.value.description.length + 1
    });
};

const removeBlock = (index) => {
    form.value.description.splice(index, 1);
    // clear related block errors
    const newErrors = { ...formErrors.value };
    delete newErrors[`block_type_${index}`];
    delete newErrors[`block_text_${index}`];
    formErrors.value = newErrors;
};

const handleFiles = (e) => {
    images.value = Array.from(e.target.files);
    if (images.value.length > 0) {
        const newErrors = { ...formErrors.value };
        delete newErrors.images;
        formErrors.value = newErrors;
    }
};

const reset = () => {
    form.value = {
        productName: '',
        titleDescription: '',
        shortDescription: '',
        price: '',
        stock: '',
        categoryId: '',
        isSpecialCombo: false,
        isFeatured: false,
        description: []
    };
    images.value = [];
    formErrors.value = {};
    document.querySelector('input[type="file"]').value = '';
};

const submit = async () => {
    formErrors.value = validate();
    if (Object.keys(formErrors.value).length > 0) return;

    confirmClicked.value = true;
    const fd = new FormData();

    fd.append('productName', form.value.productName);
    fd.append('titleDescription', form.value.titleDescription);
    fd.append('shortDescription', form.value.shortDescription);
    fd.append('price', form.value.price);
    fd.append('stock', form.value.stock);
    fd.append('categoryId', form.value.categoryId);
    fd.append('isSpecialCombo', form.value.isSpecialCombo);
    fd.append('isFeatured', form.value.isFeatured);
    fd.append('description', JSON.stringify(form.value.description));

    images.value.forEach(img => fd.append('images', img));

    await createProduct(fd);
    loading.value = false;
    await new Promise(r => setTimeout(r, 3000));
    confirmClicked.value = false;
};

onMounted(async () => {
    await fetchAll();
});
</script>

<template>
<div class="page">
    <h1>Adicionar Produto</h1>

    <div class="grid">
        <div class="field">
            <input
                v-model="form.productName"
                placeholder="Nome do Produto"
                :class="{ 'input-error': formErrors.productName }"
            />
            <span class="error-msg" v-if="formErrors.productName">{{ formErrors.productName }}</span>
        </div>

        <div class="field">
            <input
                v-model="form.price"
                placeholder="Preço"
                type="number"
                min="0"
                step="0.01"
                :class="{ 'input-error': formErrors.price }"
            />
            <span class="error-msg" v-if="formErrors.price">{{ formErrors.price }}</span>
        </div>

        <div class="field">
            <input
                v-model="form.stock"
                placeholder="Stock"
                type="number"
                min="0"
                step="1"
                :class="{ 'input-error': formErrors.stock }"
            />
            <span class="error-msg" v-if="formErrors.stock">{{ formErrors.stock }}</span>
        </div>

        <div class="field">
            <select
                v-model="form.categoryId"
                :class="{ 'input-error': formErrors.categoryId }"
            >
                <option disabled value="">Selecione uma categoria</option>
                <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">
                    {{ category.categoryName }}
                </option>
            </select>
            <span class="error-msg" v-if="formErrors.categoryId">{{ formErrors.categoryId }}</span>
        </div>
    </div>

    <div class="field">
        <input
            v-model="form.titleDescription"
            placeholder="Título da Descrição"
            :class="{ 'input-error': formErrors.titleDescription }"
        />
        <span class="error-msg" v-if="formErrors.titleDescription">{{ formErrors.titleDescription }}</span>
    </div>

    <div class="field">
        <input
            v-model="form.shortDescription"
            placeholder="Descrição Curta"
            :class="{ 'input-error': formErrors.shortDescription }"
        />
        <span class="error-msg" v-if="formErrors.shortDescription">{{ formErrors.shortDescription }}</span>
    </div>

    <div class="builder">
        <div class="builder-header">
            <h3>Criar Descrição Longa</h3>
            <button class="add" @click="addBlock">+ Adicionar Bloco</button>
        </div>

        <div
            v-for="(block, index) in form.description"
            :key="index"
            class="block"
        >
            <div class="block-top">
                <div class="field" style="flex:1; margin:0;">
                    <select
                        v-model="block.type"
                        :class="{ 'input-error': formErrors[`block_type_${index}`] }"
                    >
                        <option disabled value="">Selecione o tipo</option>
                        <option value="heading">Cabeçalho</option>
                        <option value="paragraph">Parágrafo</option>
                        <option value="checklist">Checklist</option>
                    </select>
                    <span class="error-msg" v-if="formErrors[`block_type_${index}`]">
                        {{ formErrors[`block_type_${index}`] }}
                    </span>
                </div>
                <button class="remove" @click="removeBlock(index)">✖</button>
            </div>

            <div class="field">
                <input
                    v-model="block.text"
                    placeholder="Escreva algo..."
                    :class="{ 'input-error': formErrors[`block_text_${index}`] }"
                />
                <span class="error-msg" v-if="formErrors[`block_text_${index}`]">
                    {{ formErrors[`block_text_${index}`] }}
                </span>
            </div>

            <div class="toggles">
                <label>
                    <input type="checkbox" v-model="block.isBold" />
                    Negrito
                </label>
                <label>
                    <input type="checkbox" v-model="block.isItalic" />
                    Itálico
                </label>
            </div>
        </div>
    </div>

    <div class="addon-features">
        <label class="checkbox">
            <input type="checkbox" v-model="form.isSpecialCombo" />
            Combo Especial
        </label>
        <label class="checkbox">
            <input type="checkbox" v-model="form.isFeatured" />
            Marcado
        </label>
    </div>

    <div class="field">
        <input
            type="file"
            multiple
            accept="image/*,video/*"
            @change="handleFiles"
            :class="{ 'input-error': formErrors.images }"
        />
        <span class="error-msg" v-if="formErrors.images">{{ formErrors.images }}</span>
    </div>

    <div class="form-actions">
        <button class="submit" @click="submit">Adicionar</button>
        <button class="clear" @click="reset">Limpar</button>
    </div>

    <div class="confirm-backdrop" v-if="confirmClicked">
        <div class="confirm-modal">
            <div v-if="loading" class="state-msg">
                <div class="spinner"></div>
                A criar novo produto...
            </div>
            <div v-else-if="error" class="state-msg error">{{ error }}</div>
            <div v-else class="state-msg">
                <Check class="check"/> Produto criado com sucesso!
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
    position: relative;
    gap: 12px;
}

@media (max-width: 768px) {
    .page {
        margin-left: 0;
        padding: 20px;
    }
}

h1 {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
}

/* field wrapper holds input + error msg */
.field {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

input, select {
    padding: 10px;
    border: 1px solid #cbd5e1;
    outline: none;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s;
}

input:focus, select:focus {
    border-color: #162341;
}

.input-error {
    border-color: #dc2626 !important;
    background-color: #fff5f5;
}

.error-msg {
    font-size: 12px;
    color: #dc2626;
}

select:invalid {
    color: gray;
}

.builder {
    background: white;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.builder-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.builder-header h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
}

.block {
    margin-top: 10px;
    padding: 12px;
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.block-top {
    display: flex;
    align-items: flex-start;
    gap: 8px;
}

.toggles {
    display: flex;
    gap: 15px;
    font-size: 13px;
}

.add {
    background: #16a34a;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 13px;
    white-space: nowrap;
}

.remove {
    background: #dc2626;
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
    flex-shrink: 0;
    margin-top: 1px;
}

.addon-features {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.checkbox {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 14px;
    color: #334155;
}

.checkbox input[type="checkbox"] {
    width: auto;
}

.form-actions {
    display: flex;
    gap: 10px;
}

.submit {
    flex: 2;
    background: #162341;
    color: white;
    border: none;
    padding: 12px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
}

.submit:hover {
    background: #1b2c52;
}

.clear {
    flex: 1;
    background: #64748b;
    color: white;
    border: none;
    padding: 12px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
}

.clear:hover {
    background: #475569;
}

/* ── Confirm modal ── */
.confirm-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
}

.confirm-modal {
    max-width: 400px;
    width: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
}

.state-msg {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 40px;
    color: #64748b;
    font-size: 14px;
}

.state-msg.error { color: #dc2626; }

.check {
    border-radius: 50%;
    height: 20px;
    width: 20px;
    background-color: #16a34a;
    color: white;
    flex-shrink: 0;
}

.spinner {
    width: 18px;
    height: 18px;
    border: 2px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>