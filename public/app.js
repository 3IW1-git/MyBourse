import { fetchAllStocks, fetchStock } from "./api/stockApi.js";
import { populateStockSelects, showError, hideError, showStockInfo, hideStockInfo, getSelectedValues, setLoading, getElement } from "./ui/dom.js";
import { renderChart, destroyChart } from "./charts/stockChart.js";
let allStocks = [];
async function init() {
    try {
        allStocks = await fetchAllStocks();
        populateStockSelects(allStocks);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Erreur inconnue lors du chargement";
        showError(message);
    }
    const loadBtn = getElement("load-btn");
    loadBtn.addEventListener("click", handleLoad);
}
async function handleLoad() {
    hideError();
    hideStockInfo();
    const { symbol1, symbol2, period, chartType } = getSelectedValues();
    if (!symbol1) {
        showError("Veuillez sélectionner au moins une action");
        return;
    }
    setLoading(true);
    try {
        const stocksToDisplay = [];
        const stock1 = await fetchStock(symbol1);
        stocksToDisplay.push(stock1);
        if (symbol2 && symbol2 !== symbol1) {
            const stock2 = await fetchStock(symbol2);
            stocksToDisplay.push(stock2);
        }
        else if (symbol2 === symbol1) {
            showError("Veuillez sélectionner deux actions différentes");
            setLoading(false);
            return;
        }
        renderChart(stocksToDisplay, period, chartType);
        showStockInfo(stocksToDisplay);
    }
    catch (error) {
        destroyChart();
        const message = error instanceof Error ? error.message : "Erreur lors du chargement des données";
        showError(message);
    }
    finally {
        setLoading(false);
    }
}
document.addEventListener("DOMContentLoaded", init);
//# sourceMappingURL=app.js.map