const COLORS = [
    { border: "rgb(26, 35, 126)", background: "rgba(26, 35, 126, 0.1)" },
    { border: "rgb(211, 47, 47)", background: "rgba(211, 47, 47, 0.1)" }
];
let currentChart = null;
export function filterByPeriod(history, period) {
    if (period === "all") {
        return history;
    }
    const days = parseInt(period, 10);
    if (isNaN(days) || days <= 0) {
        return history;
    }
    return history.slice(-days);
}
export function renderChart(stocks, period, chartType) {
    const canvas = document.getElementById("stock-chart");
    if (!canvas) {
        throw new Error("Canvas #stock-chart introuvable");
    }
    if (currentChart) {
        currentChart.destroy();
        currentChart = null;
    }
    const datasets = stocks.map((stock, index) => {
        const filtered = filterByPeriod(stock.history, period);
        const color = COLORS[index % COLORS.length];
        return {
            label: `${stock.name} (${stock.currency})`,
            data: filtered.map(h => h.price),
            borderColor: color.border,
            backgroundColor: color.background,
            borderWidth: 2,
            tension: 0.3,
            fill: chartType === "line",
            pointRadius: 4,
            pointHoverRadius: 6
        };
    });
    const firstStock = stocks[0];
    const filtered = filterByPeriod(firstStock.history, period);
    const labels = filtered.map(h => h.date);
    currentChart = new Chart(canvas, {
        type: chartType,
        data: {
            labels,
            datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Évolution du cours",
                    font: { size: 16 }
                },
                legend: {
                    position: "top"
                },
                tooltip: {
                    mode: "index",
                    intersect: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Date"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Prix (USD)"
                    },
                    beginAtZero: false
                }
            }
        }
    });
}
export function destroyChart() {
    if (currentChart) {
        currentChart.destroy();
        currentChart = null;
    }
}
//# sourceMappingURL=stockChart.js.map