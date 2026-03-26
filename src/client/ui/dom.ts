import { Stock } from "../api/stockApi.js";

export function getElement<T extends HTMLElement>(id: string): T {
    const el = document.getElementById(id) as T | null;
    if (!el) {
        throw new Error(`Élément #${id} introuvable dans le DOM`);
    }
    return el;
}

export function populateStockSelects(stocks: Stock[]): void {
    const select1 = getElement<HTMLSelectElement>("stock-select-1");
    const select2 = getElement<HTMLSelectElement>("stock-select-2");

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

export function showError(message: string): void {
    const container = getElement<HTMLElement>("error-container");
    const messageEl = getElement<HTMLParagraphElement>("error-message");

    messageEl.textContent = message;
    container.classList.remove("hidden");

    setTimeout(() => {
        container.classList.add("hidden");
    }, 6000);
}

export function hideError(): void {
    const container = getElement<HTMLElement>("error-container");
    container.classList.add("hidden");
}

export function showStockInfo(stocks: Stock[]): void {
    const container = getElement<HTMLElement>("stock-info");
    const details = getElement<HTMLElement>("stock-details");

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

export function hideStockInfo(): void {
    const container = getElement<HTMLElement>("stock-info");
    container.classList.add("hidden");
}

export function getSelectedValues(): {
    symbol1: string;
    symbol2: string;
    period: string;
    chartType: string;
} {
    const symbol1 = getElement<HTMLSelectElement>("stock-select-1").value;
    const symbol2 = getElement<HTMLSelectElement>("stock-select-2").value;
    const period = getElement<HTMLSelectElement>("period-select").value;
    const chartType = getElement<HTMLSelectElement>("chart-type").value;

    return { symbol1, symbol2, period, chartType };
}

export function setLoading(loading: boolean): void {
    const btn = getElement<HTMLButtonElement>("load-btn");
    btn.disabled = loading;
    btn.textContent = loading ? "Chargement..." : "Charger";
}
