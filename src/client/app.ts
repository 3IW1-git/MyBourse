import { fetchAllStocks, fetchStock, Stock } from "./api/stockApi.js";
import { populateStockSelects, showError, hideError, showStockInfo, hideStockInfo, getSelectedValues, setLoading, getElement } from "./ui/dom.js";
import { renderChart, renderVolumeChart, destroyChart } from "./charts/stockChart.js";
import { initThemeToggle } from "./ui/theme.js";
import { exportToCSV } from "./ui/export.js";

let allStocks: Stock[] = [];
let displayedStocks: Stock[] = [];

async function init(): Promise<void> {
    initThemeToggle();

    try {
        allStocks = await fetchAllStocks();
        populateStockSelects(allStocks);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Erreur inconnue lors du chargement";
        showError(message);
    }

    const loadBtn = getElement<HTMLButtonElement>("load-btn");
    loadBtn.addEventListener("click", handleLoad);

    const exportBtn = getElement<HTMLButtonElement>("export-btn");
    exportBtn.addEventListener("click", () => {
        try {
            exportToCSV(displayedStocks);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erreur lors de l'export";
            showError(message);
        }
    });
}

async function handleLoad(): Promise<void> {
    hideError();
    hideStockInfo();

    const { symbol1, symbol2, period, chartType } = getSelectedValues();

    if (!symbol1) {
        showError("Veuillez sélectionner au moins une action");
        return;
    }

    setLoading(true);

    try {
        const stocksToDisplay: Stock[] = [];

        const stock1 = await fetchStock(symbol1);
        stocksToDisplay.push(stock1);

        if (symbol2 && symbol2 !== symbol1) {
            const stock2 = await fetchStock(symbol2);
            stocksToDisplay.push(stock2);
        } else if (symbol2 === symbol1) {
            showError("Veuillez sélectionner deux actions différentes");
            setLoading(false);
            return;
        }

        renderChart(stocksToDisplay, period, chartType);
        renderVolumeChart(stocksToDisplay, period);
        showStockInfo(stocksToDisplay);

        displayedStocks = stocksToDisplay;
        const exportBtn = getElement<HTMLButtonElement>("export-btn");
        exportBtn.disabled = false;
    } catch (error) {
        destroyChart();
        const message = error instanceof Error ? error.message : "Erreur lors du chargement des données";
        showError(message);
    } finally {
        setLoading(false);
    }
}

document.addEventListener("DOMContentLoaded", init);
