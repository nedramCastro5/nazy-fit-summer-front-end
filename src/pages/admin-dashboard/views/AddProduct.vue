<script setup>
import { onMounted, ref } from 'vue';
import { useProduct } from '@/composable/useProduct';
import { useCategory } from '@/composable/useCategories';
import { Check } from 'lucide-vue-next';

const { createProduct , error, loading} = useProduct();
const {fetchAll, categories} = useCategory()
const confirmClicked = ref(false)

const form = ref({
    productName: '',
    titleDescription: '',
    shortDescription: '',
    price: '',
    stock: '',
    categoryId: '', 
    isSpecialCombo: false,
    description: []
});

const images = ref([]);

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
};

const handleFiles = (e) => {
    images.value = Array.from(e.target.files);
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
  }
  images.value = []
  document.querySelector('input[type="file"]').value = ''
}

const submit = async () => {
    confirmClicked.value =true;
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

    images.value.forEach(img => {
        fd.append('images', img);
    });

   await createProduct(fd);
   loading.value = false;
   await new Promise(r => setTimeout(r, 3000));
   confirmClicked.value = false;
};

onMounted(async () => {
    await fetchAll();
})
</script>

<template>
<div class="page">
    <h1>Adicionar Produto</h1>

    <div class="grid">
        <input v-model="form.productName" placeholder="Product Name" />
        <input v-model="form.price" placeholder="Price" />
        <input v-model="form.stock" placeholder="Stock" />

        <select v-model="form.categoryId" required>
            <option disabled value="">Selecione uma categoria</option>
            <option v-for="category in categories" :value="category.categoryId">{{ category.categoryName }}</option>
        </select>
    </div>

    <input v-model="form.titleDescription" placeholder="Title Description" />
    <input v-model="form.shortDescription" placeholder="Short Description" />

    <div class="builder">
        <div class="builder-header">
            <h3>Criar descricao</h3>
            <button class="add" @click="addBlock">+ Adicionar Bloco</button>
        </div>

        <div 
            v-for="(block, index) in form.description" 
            :key="index"
            class="block"
        >
            <div class="block-top">
                <select v-model="block.type" required>
                    <option disabled value="">Select type</option>
                    <option value="heading">Cabecalho</option>
                    <option value="paragraph">Paragrafo</option>
                    <option value="checklist">Checklist</option>
                </select>

                <button class="remove" @click="removeBlock(index)">✖</button>
            </div>

            <input v-model="block.text" placeholder="Write something..." />

            <div class="toggles">
                <label>
                    <input type="checkbox" v-model="block.isBold" />
                    Negrito
                </label>

                <label>
                    <input type="checkbox" v-model="block.isItalic" />
                    Italico
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
    <input type="file" multiple @change="handleFiles" />
    
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
            <div v-else class="state-msg"><Check class="check"/> Prouduto criado com sucesso!</div>
        </div>
    </div>
</div>
</template>

<style scoped>
.form-actions {
  display: flex;
  gap: 10px;
}

.clear {
  background: #64748b;
  color: white;
  border: none;
  padding: 12px;
  cursor: pointer;
  font-weight: bold;
  flex: 1;
}

.clear:hover {
  background: #475569;
}

.submit {
  flex: 2;
}

/* ── State ── */
.check{
    border-radius: 50%;
    height: 20px;
    width: 20px;
    background-color: #16a34a;
    color: white;
}

.confirm-backdrop{
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

input, select {
    padding: 10px;
    border: 1px solid #cbd5e1;
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
    justify-content: space-between;
    align-items: center;
}

.toggles {
    display: flex;
    gap: 15px;
}

.add {
    background: #16a34a;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
}

.remove {
    background: #dc2626;
    color: white;
    border: none;
    padding: 5px 8px;
    cursor: pointer;
}

.submit {
    background: #162341;
    color: white;
    border: none;
    padding: 12px;
    cursor: pointer;
    font-weight: bold;
}

.submit:hover {
    background: #1b2c52;
}

.checkbox {
    display: flex;
    gap: 8px;
    align-items: center;
}

.addon-features{
    display: flex;
    gap: 10px;
}
</style>