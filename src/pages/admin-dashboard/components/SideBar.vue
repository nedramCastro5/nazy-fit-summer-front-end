<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Package, Folder, Menu, GitGraph, ChartArea } from 'lucide-vue-next';

const router = useRouter();
const openMenu = ref(null);
const isOpen = ref(false);

const options = [
    {
        key: "analitics",
        option: "Analise de vendas",
        icon: ChartArea,
        elements:[
            {label: "Analise geral", slug: "analise"}
        ]
    },
    {
        key: "products",
        option: "Produtos",
        icon: Package,
        elements: [
            { label: "Adicionar novo", slug: "adicionar" },
            { label: "Gerir",          slug: "gerir" }
        ]
    },
    {
        key: "categories",
        option: "Categorias",
        icon: Folder,
        elements: [
            { label: "Adicionar", slug: "adicionar" },
            { label: "Editar",    slug: "editar" },
            { label: "Remover",   slug: "remover" }
        ]
    }
];

const toggleOption = (key) => {
    openMenu.value = openMenu.value === key ? null : key;
};

const navigate = (optionKey, slug) => {
    router.push(`/nazy-fit/admin/${optionKey}/${slug}`);
    isOpen.value = false;
};
</script>

<template>
    <button class="menu-toggle" @click="isOpen = !isOpen">
        <Menu />
    </button>

    <div class="side-bar-container" :class="{ open: isOpen }">
        <div class="title">Menu</div>

        <div class="option" v-for="option in options" :key="option.key">
            <button @click="toggleOption(option.key)">
                <component :is="option.icon" class="icon" />
                <span>{{ option.option }}</span>
            </button>

            <div v-show="openMenu === option.key" class="drop-down">
                <ul>
                    <li
                        v-for="element in option.elements"
                        :key="element.slug"
                        @click="navigate(option.key, element.slug)"
                    >
                        {{ element.label }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.side-bar-container {
    background-color: #0f172a;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 250px;
    padding-top: 10px;
    transition: transform 0.3s ease;
    z-index: 1000;
}

.side-bar-container {
    transform: translateX(0);
}

@media (max-width: 768px) {
    .side-bar-container {
        transform: translateX(-100%);
    }

    .side-bar-container.open {
        transform: translateX(0);
    }
}

.menu-toggle {
    display: none;
}

@media (max-width: 768px) {
    .menu-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 1100;
        background: #0f172a;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 8px;
        cursor: pointer;
    }
}

.title {
    padding: 15px 20px;
    font-weight: bold;
    color: white;
    font-size: 18px;
}

.option button {
    background: transparent;
    border: none;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    color: #cbd5e1;
    cursor: pointer;
    transition: 0.2s;
}

.option button:hover {
    background: #1e293b;
    color: white;
}

.icon {
    width: 18px;
    height: 18px;
}

.drop-down {
    background: #1e293b;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    padding: 10px 40px;
    color: #cbd5e1;
    cursor: pointer;
    transition: 0.2s;
}

li:hover {
    background: #334155;
    color: white;
}
</style>