<script setup>
import { onMounted, ref, computed } from 'vue';
import { TrendingUp, TrendingDown, ShoppingBag, Package, Tag, Star } from 'lucide-vue-next';

// ── Mock composable hooks (replace with real ones) ──────────────────────────
// const { fetchAnalytics, analytics, loading, error } = useAnalytics();

const loading = ref(true);
const error = ref(null);

// Simulated data — replace with real API calls
const stats = ref({});
const monthlySales = ref([]);
const topProducts = ref([]);
const categoryBreakdown = ref([]);
const recentOrders = ref([]);

const fetchAnalytics = async () => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));

    stats.value = {
        totalRevenue:    { value: 125430, prev: 108200,  label: 'Receita Total',    prefix: 'MZN ' },
        totalOrders:     { value: 843,    prev: 710,     label: 'Total de Pedidos', prefix: '' },
        totalProducts:   { value: 64,     prev: 58,      label: 'Produtos Activos', prefix: '' },
        avgOrderValue:   { value: 1488,   prev: 1524,    label: 'Valor Médio/Pedido', prefix: 'MZN ' },
    };

    monthlySales.value = [
        { month: 'Out', orders: 58,  revenue: 8200  },
        { month: 'Nov', orders: 72,  revenue: 10400 },
        { month: 'Dez', orders: 95,  revenue: 14800 },
        { month: 'Jan', orders: 61,  revenue: 9100  },
        { month: 'Fev', orders: 78,  revenue: 11300 },
        { month: 'Mar', orders: 103, revenue: 15200 },
        { month: 'Abr', orders: 88,  revenue: 13100 },
        { month: 'Mai', orders: 116, revenue: 17400 },
        { month: 'Jun', orders: 97,  revenue: 14600 },
        { month: 'Jul', orders: 124, revenue: 18900 },
        { month: 'Ago', orders: 108, revenue: 16300 },
        { month: 'Set', orders: 143, revenue: 21200 },
    ];

    topProducts.value = [
        { name: 'Combo Proteína Premium', sales: 214, revenue: 32100, isCombo: true },
        { name: 'Whey Gold Standard',     sales: 187, revenue: 26180, isCombo: false },
        { name: 'Creatina Monohidrato',   sales: 156, revenue: 14040, isCombo: false },
        { name: 'Combo Iniciante',        sales: 134, revenue: 20100, isCombo: true },
        { name: 'BCAA 2:1:1',             sales: 98,  revenue: 8820,  isCombo: false },
    ];

    categoryBreakdown.value = [
        { name: 'Proteínas',    count: 24, pct: 42, color: '#2563eb' },
        { name: 'Aminoácidos',  count: 14, pct: 24, color: '#16a34a' },
        { name: 'Combos',       count: 10, pct: 18, color: '#d97706' },
        { name: 'Vitaminas',    count: 9,  pct: 10, color: '#7c3aed' },
        { name: 'Outros',       count: 7,  pct: 6,  color: '#64748b' },
    ];

    recentOrders.value = [
        { id: '#0843', customer: 'Ana Macuácua',   product: 'Whey Gold Standard',   amount: 1400, status: 'entregue',  date: 'Hoje' },
        { id: '#0842', customer: 'José Chibante',  product: 'Combo Proteína Premium', amount: 2800, status: 'enviado',   date: 'Hoje' },
        { id: '#0841', customer: 'Maria Sitoe',    product: 'Creatina Monohidrato', amount: 900,  status: 'pendente',  date: 'Ontem' },
        { id: '#0840', customer: 'Carlos Nhantumbo', product: 'BCAA 2:1:1',         amount: 900,  status: 'entregue',  date: 'Ontem' },
        { id: '#0839', customer: 'Fátima Bila',    product: 'Combo Iniciante',      amount: 1500, status: 'cancelado', date: '13 Set' },
    ];
};

// ── Computed helpers ────────────────────────────────────────────────────────
const maxRevenue = computed(() => Math.max(...monthlySales.value.map(m => m.revenue)));
const maxOrders  = computed(() => Math.max(...monthlySales.value.map(m => m.orders)));

const pct = (val, max) => Math.round((val / max) * 100);

const delta = (current, prev) => {
    const d = ((current - prev) / prev) * 100;
    return { value: Math.abs(d).toFixed(1), up: d >= 0 };
};

const statusClass = (s) => ({
    entregue: 'status-ok',
    enviado:  'status-info',
    pendente: 'status-warn',
    cancelado:'status-err',
}[s] || '');

const statusLabel = (s) => ({
    entregue: 'Entregue',
    enviado:  'Enviado',
    pendente: 'Pendente',
    cancelado:'Cancelado',
}[s] || s);

onMounted(async () => {
    try {
        await fetchAnalytics();
    } catch (e) {
        error.value = 'Erro ao carregar dados.';
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="page">
        <div class="page-header">
            <div>
                <h1>Análise Geral</h1>
                <p class="subtitle">Visão geral do desempenho da loja</p>
            </div>
            <div class="period-badge">Últimos 12 meses</div>
        </div>

        <div v-if="loading" class="state-msg">
            <div class="spinner"></div>
            A carregar dados...
        </div>
        <div v-else-if="error" class="state-msg error">{{ error }}</div>

        <template v-else>
            <!-- ── KPI Cards ── -->
            <div class="kpi-grid">
                <div
                    v-for="(stat, key) in stats"
                    :key="key"
                    class="kpi-card"
                    :class="'kpi-' + key"
                >
                    <div class="kpi-label">{{ stat.label }}</div>
                    <div class="kpi-value">{{ stat.prefix }}{{ stat.value.toLocaleString('pt-MZ') }}</div>
                    <div class="kpi-delta" :class="delta(stat.value, stat.prev).up ? 'up' : 'down'">
                        <component :is="delta(stat.value, stat.prev).up ? TrendingUp : TrendingDown" class="delta-icon" />
                        {{ delta(stat.value, stat.prev).value }}% vs mês anterior
                    </div>
                    <div class="kpi-accent"></div>
                </div>
            </div>

            <!-- ── Charts Row ── -->
            <div class="charts-row">

                <!-- Revenue Bar Chart -->
                <div class="chart-card chart-large">
                    <div class="chart-header">
                        <h2>Receita Mensal</h2>
                        <span class="chart-unit">MZN</span>
                    </div>
                    <div class="bar-chart">
                        <div
                            v-for="m in monthlySales"
                            :key="m.month"
                            class="bar-col"
                        >
                            <div class="bar-value">{{ (m.revenue / 1000).toFixed(0) }}k</div>
                            <div class="bar-track">
                                <div
                                    class="bar-fill"
                                    :style="{ height: pct(m.revenue, maxRevenue) + '%' }"
                                ></div>
                            </div>
                            <div class="bar-label">{{ m.month }}</div>
                        </div>
                    </div>
                </div>

                <!-- Category Donut -->
                <div class="chart-card chart-small">
                    <div class="chart-header">
                        <h2>Categorias</h2>
                    </div>
                    <div class="donut-wrap">
                        <svg viewBox="0 0 100 100" class="donut-svg">
                            <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" stroke-width="14"/>
                            <circle
                                v-for="(cat, i) in categoryBreakdown"
                                :key="i"
                                cx="50" cy="50" r="38"
                                fill="none"
                                :stroke="cat.color"
                                stroke-width="14"
                                :stroke-dasharray="`${cat.pct * 2.388} ${238.8 - cat.pct * 2.388}`"
                                :stroke-dashoffset="-(categoryBreakdown.slice(0, i).reduce((a,c) => a + c.pct, 0) * 2.388) + 59.7"
                                stroke-linecap="butt"
                            />
                            <text x="50" y="46" text-anchor="middle" class="donut-center-label">Total</text>
                            <text x="50" y="58" text-anchor="middle" class="donut-center-value">{{ categoryBreakdown.reduce((a,c) => a + c.count, 0) }}</text>
                        </svg>
                        <div class="donut-legend">
                            <div v-for="cat in categoryBreakdown" :key="cat.name" class="legend-item">
                                <span class="legend-dot" :style="{ background: cat.color }"></span>
                                <span class="legend-name">{{ cat.name }}</span>
                                <span class="legend-pct">{{ cat.pct }}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Orders Sparkline ── -->
            <div class="chart-card">
                <div class="chart-header">
                    <h2>Pedidos por Mês</h2>
                    <span class="chart-unit">unidades</span>
                </div>
                <div class="line-chart">
                    <div class="line-y-labels">
                        <span>{{ maxOrders }}</span>
                        <span>{{ Math.round(maxOrders * 0.5) }}</span>
                        <span>0</span>
                    </div>
                    <div class="line-area">
                        <svg preserveAspectRatio="none" viewBox="0 0 1100 160" class="line-svg">
                            <!-- Grid lines -->
                            <line x1="0" y1="0"   x2="1100" y2="0"   stroke="#f1f5f9" stroke-width="1"/>
                            <line x1="0" y1="80"  x2="1100" y2="80"  stroke="#f1f5f9" stroke-width="1"/>
                            <line x1="0" y1="160" x2="1100" y2="160" stroke="#f1f5f9" stroke-width="1"/>
                            <!-- Fill area -->
                            <polyline
                                :points="monthlySales.map((m,i) => `${i * 100},${160 - pct(m.orders, maxOrders) * 1.6}`).join(' ')"
                                fill="none"
                                stroke="#2563eb"
                                stroke-width="2.5"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                            />
                            <polygon
                                :points="[
                                    ...monthlySales.map((m,i) => `${i * 100},${160 - pct(m.orders, maxOrders) * 1.6}`),
                                    `${(monthlySales.length - 1) * 100},160`,
                                    '0,160'
                                ].join(' ')"
                                fill="url(#lineGrad)"
                                opacity="0.3"
                            />
                            <defs>
                                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%"   stop-color="#2563eb" stop-opacity="1"/>
                                    <stop offset="100%" stop-color="#2563eb" stop-opacity="0"/>
                                </linearGradient>
                            </defs>
                            <!-- Dots -->
                            <circle
                                v-for="(m, i) in monthlySales"
                                :key="i"
                                :cx="i * 100"
                                :cy="160 - pct(m.orders, maxOrders) * 1.6"
                                r="4"
                                fill="#2563eb"
                                stroke="white"
                                stroke-width="2"
                            />
                        </svg>
                        <div class="line-x-labels">
                            <span v-for="m in monthlySales" :key="m.month">{{ m.month }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ── Bottom Row ── -->
            <div class="bottom-row">

                <!-- Top Products -->
                <div class="chart-card flex-card">
                    <div class="chart-header">
                        <h2>Top Produtos</h2>
                    </div>
                    <div class="top-products">
                        <div
                            v-for="(p, i) in topProducts"
                            :key="p.name"
                            class="top-product-row"
                        >
                            <div class="rank">{{ i + 1 }}</div>
                            <div class="tp-info">
                                <div class="tp-name">
                                    {{ p.name }}
                                    <span v-if="p.isCombo" class="combo-tag">combo</span>
                                </div>
                                <div class="tp-bar-track">
                                    <div
                                        class="tp-bar-fill"
                                        :style="{ width: pct(p.sales, topProducts[0].sales) + '%' }"
                                    ></div>
                                </div>
                            </div>
                            <div class="tp-stats">
                                <div class="tp-sales">{{ p.sales }} un.</div>
                                <div class="tp-revenue">MZN {{ p.revenue.toLocaleString('pt-MZ') }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Orders -->
                <div class="chart-card flex-card">
                    <div class="chart-header">
                        <h2>Pedidos Recentes</h2>
                    </div>
                    <div class="orders-list">
                        <div
                            v-for="order in recentOrders"
                            :key="order.id"
                            class="order-row"
                        >
                            <div class="order-id">{{ order.id }}</div>
                            <div class="order-info">
                                <div class="order-customer">{{ order.customer }}</div>
                                <div class="order-product">{{ order.product }}</div>
                            </div>
                            <div class="order-right">
                                <div class="order-amount">MZN {{ order.amount.toLocaleString('pt-MZ') }}</div>
                                <span :class="['order-status', statusClass(order.status)]">
                                    {{ statusLabel(order.status) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </template>
    </div>
</template>

<style scoped>
.page {
    margin-left: 250px;
    padding: 30px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #f8fafc;
}

@media (max-width: 768px) {
    .page {
        margin-left: 0;
        padding: 16px;
        padding-top: 60px;
    }
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 10px;
}

h1 {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
}

.subtitle {
    margin: 2px 0 0;
    font-size: 13px;
    color: #94a3b8;
}

.period-badge {
    background: #0f172a;
    color: #cbd5e1;
    font-size: 12px;
    font-weight: 600;
    padding: 6px 14px;
    letter-spacing: 0.04em;
}

/* ── State ── */
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

/* ── KPI Cards ── */
.kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
}

@media (max-width: 1024px) {
    .kpi-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
    .kpi-grid { grid-template-columns: 1fr; }
}

.kpi-card {
    background: white;
    padding: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    border: 1px solid #e2e8f0;
}

.kpi-label {
    font-size: 12px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
}

.kpi-value {
    font-size: 26px;
    font-weight: 800;
    color: #0f172a;
    line-height: 1;
    margin-bottom: 10px;
    font-variant-numeric: tabular-nums;
}

.kpi-delta {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
}

.kpi-delta.up   { color: #16a34a; }
.kpi-delta.down { color: #dc2626; }

.delta-icon { width: 13px; height: 13px; }

.kpi-accent {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: #0f172a;
}

.kpi-totalOrders   .kpi-accent { background: #2563eb; }
.kpi-totalRevenue  .kpi-accent { background: #16a34a; }
.kpi-totalProducts .kpi-accent { background: #d97706; }
.kpi-avgOrderValue .kpi-accent { background: #7c3aed; }

/* ── Chart Card Base ── */
.chart-card {
    background: white;
    border: 1px solid #e2e8f0;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 20px;
}

.chart-header h2 {
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
}

.chart-unit {
    font-size: 12px;
    color: #94a3b8;
    font-weight: 600;
}

/* ── Charts Row ── */
.charts-row {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 14px;
}

@media (max-width: 900px) {
    .charts-row { grid-template-columns: 1fr; }
}

.chart-large { /* takes flex space */ }
.chart-small { /* fixed width handled by grid */ }

/* ── Bar Chart ── */
.bar-chart {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    height: 180px;
}

.bar-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    height: 100%;
}

.bar-value {
    font-size: 10px;
    color: #94a3b8;
    font-weight: 600;
    height: 14px;
    line-height: 14px;
}

.bar-track {
    flex: 1;
    width: 100%;
    background: #f1f5f9;
    display: flex;
    align-items: flex-end;
}

.bar-fill {
    width: 100%;
    background: #0f172a;
    transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 4px;
}

.bar-col:hover .bar-fill { background: #2563eb; }

.bar-label {
    font-size: 10px;
    color: #94a3b8;
    font-weight: 600;
    white-space: nowrap;
}

/* ── Donut Chart ── */
.donut-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.donut-svg {
    width: 140px;
    height: 140px;
    transform: rotate(-90deg);
}

.donut-center-label {
    font-size: 10px;
    fill: #94a3b8;
    font-weight: 600;
    transform: rotate(90deg);
    transform-origin: center;
    font-family: inherit;
}

.donut-center-value {
    font-size: 18px;
    fill: #0f172a;
    font-weight: 800;
    transform: rotate(90deg);
    transform-origin: center;
    font-family: inherit;
}

.donut-legend {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
}

.legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
}

.legend-name { flex: 1; color: #334155; }
.legend-pct  { font-weight: 700; color: #0f172a; font-size: 12px; }

/* ── Line Chart ── */
.line-chart {
    display: flex;
    gap: 10px;
    height: 180px;
}

.line-y-labels {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 11px;
    color: #94a3b8;
    font-weight: 600;
    text-align: right;
    flex-shrink: 0;
    padding-bottom: 22px;
}

.line-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.line-svg {
    flex: 1;
    width: 100%;
    overflow: visible;
}

.line-x-labels {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #94a3b8;
    font-weight: 600;
    padding-top: 6px;
    height: 16px;
}

/* ── Bottom Row ── */
.bottom-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
}

@media (max-width: 900px) {
    .bottom-row { grid-template-columns: 1fr; }
}

.flex-card { display: flex; flex-direction: column; }

/* ── Top Products ── */
.top-products {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.top-product-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.rank {
    width: 22px;
    height: 22px;
    background: #f1f5f9;
    color: #64748b;
    font-size: 11px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.top-product-row:first-child .rank {
    background: #0f172a;
    color: white;
}

.tp-info { flex: 1; min-width: 0; }

.tp-name {
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 5px;
}

.combo-tag {
    background: #dbeafe;
    color: #2563eb;
    font-size: 10px;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 999px;
    flex-shrink: 0;
}

.tp-bar-track {
    height: 4px;
    background: #f1f5f9;
    width: 100%;
}

.tp-bar-fill {
    height: 100%;
    background: #0f172a;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.tp-stats {
    text-align: right;
    flex-shrink: 0;
}

.tp-sales {
    font-size: 13px;
    font-weight: 700;
    color: #0f172a;
}

.tp-revenue {
    font-size: 11px;
    color: #94a3b8;
    font-weight: 500;
}

/* ── Recent Orders ── */
.orders-list {
    display: flex;
    flex-direction: column;
}

.order-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #f1f5f9;
}

.order-row:last-child { border-bottom: none; }

.order-id {
    font-size: 11px;
    font-weight: 700;
    color: #94a3b8;
    width: 44px;
    flex-shrink: 0;
}

.order-info { flex: 1; min-width: 0; }

.order-customer {
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.order-product {
    font-size: 11px;
    color: #94a3b8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.order-right { text-align: right; flex-shrink: 0; }

.order-amount {
    font-size: 13px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 3px;
}

.order-status {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.status-ok   { background: #dcfce7; color: #16a34a; }
.status-info { background: #dbeafe; color: #2563eb; }
.status-warn { background: #fef3c7; color: #d97706; }
.status-err  { background: #fee2e2; color: #dc2626; }
</style>