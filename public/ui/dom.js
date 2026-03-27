export function getElement(id) {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`Élément #${id} introuvable dans le DOM`);
    }
    return el;
}
export function populateStockSelects(stocks) {
    const select1 = getElement("stock-select-1");
    const select2 = getElement("stock-select-2");
    [select1, select2].forEach(select => {
        while (select.options.length > 1) {
            select.remove(1);
        }
        stocks.forEach(stock => {
            const option = document.createElement("option");
            option.value = stock.symbol;
            option.textContent = `${stock.name} (${stock.symbol})`;
            select.appendChild(option);
        });
    });
}
export function showError(message) {
    const container = getElement("error-container");
    const messageEl = getElement("error-message");
    messageEl.textContent = message;
    container.classList.remove("hidden");
    setTimeout(() => {
        container.classList.add("hidden");
    }, 6000);
}
export function hideError() {
    const container = getElement("error-container");
    container.classList.add("hidden");
}
export function showStockInfo(stocks) {
    const container = getElement("stock-info");
    const details = getElement("stock-details");
    details.innerHTML = "";
    stocks.forEach(stock => {
        const card = document.createElement("div");
        card.className = "stock-card";
        card.innerHTML = `
            <h3>${stock.name} (${stock.symbol})</h3>
            <p><strong>Secteur :</strong> ${stock.sector}</p>
            <p><strong>Prix actuel :</strong> ${stock.currentPrice} ${stock.currency}</p>
            <p><strong>Points de données :</strong> ${stock.history.length}</p>
        `;
        details.appendChild(card);
    });
    container.classList.remove("hidden");
}
export function hideStockInfo() {
    const container = getElement("stock-info");
    container.classList.add("hidden");
}
export function getSelectedValues() {
    const symbol1 = getElement("stock-select-1").value;
    const symbol2 = getElement("stock-select-2").value;
    const period = getElement("period-select").value;
    const chartType = getElement("chart-type").value;
    return { symbol1, symbol2, period, chartType };
}
export function setLoading(loading) {
    const btn = getElement("load-btn");
    btn.disabled = loading;
    btn.textContent = loading ? "Chargement..." : "Charger";
}
//# sourceMappingURL=dom.js.map