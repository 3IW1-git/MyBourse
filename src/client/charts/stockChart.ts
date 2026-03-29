import { Stock, StockHistory } from "../api/stockApi.js";

declare const Chart: any;

const COLORS = [
    { border: "rgb(26, 35, 126)", background: "rgba(26, 35, 126, 0.1)" },
    { border: "rgb(211, 47, 47)", background: "rgba(211, 47, 47, 0.1)" }
];

let currentChart: any = null;
let volumeChart: any = null;

export function filterByPeriod(history: StockHistory[], period: string): StockHistory[] {
    if (period === "all") {
        return history;
    }

    const days = parseInt(period, 10);
    if (isNaN(days) || days <= 0) {
        return history;
    }

    return history.slice(-days);
}

export function renderChart(
    stocks: Stock[],
    period: string,
    chartType: string
): void {
    const canvas = document.getElementById("stock-chart") as HTMLCanvasElement | null;
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

export function renderVolumeChart(stocks: Stock[], period: string, chartType: string): void {
    const canvas = document.getElementById("volume-chart") as HTMLCanvasElement | null;
    if (!canvas) return;

    const container = document.getElementById("volume-container");
    if (container) container.classList.remove("hidden");

    if (volumeChart) {
        volumeChart.destroy();
        volumeChart = null;
    }

    const volumeColors = [
        "rgba(26, 35, 126, 0.6)",
        "rgba(211, 47, 47, 0.6)"
    ];

    const volumeBorders = [
        "rgb(26, 35, 126)",
        "rgb(211, 47, 47)"
    ];

    const datasets = stocks.map((stock, index) => {
        const filtered = filterByPeriod(stock.history, period);
        return {
            label: `${stock.symbol} - Volume`,
            data: filtered.map(h => h.volume),
            backgroundColor: volumeColors[index % volumeColors.length],
            borderColor: volumeBorders[index % volumeBorders.length],
            borderWidth: chartType === "line" ? 2 : 1,
            tension: 0.3,
            fill: chartType === "line",
            pointRadius: chartType === "line" ? 4 : 0
        };
    });

    const filtered = filterByPeriod(stocks[0].history, period);
    const labels = filtered.map(h => h.date);

    volumeChart = new Chart(canvas, {
        type: chartType,
        data: { labels, datasets },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "top" }
            },
            scales: {
                y: {
                    title: { display: true, text: "Volume" },
                    beginAtZero: true
                }
            }
        }
    });
}

export function destroyChart(): void {
    if (currentChart) {
        currentChart.destroy();
        currentChart = null;
    }
    if (volumeChart) {
        volumeChart.destroy();
        volumeChart = null;
    }
    const container = document.getElementById("volume-container");
    if (container) container.classList.add("hidden");
}
