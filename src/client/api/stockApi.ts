export interface StockHistory {
    date: string;
    price: number;
    volume: number;
}

export interface Stock {
    symbol: string;
    name: string;
    sector: string;
    currentPrice: number;
    currency: string;
    history: StockHistory[];
}

// Base URL de l'API REST
const API_BASE = "/api";

// Récupère la liste complète des actions disponibles
export async function fetchAllStocks(): Promise<Stock[]> {
    const response = await fetch(`${API_BASE}/stocks`);

    if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }

    const data: Stock[] = await response.json();

    if (!Array.isArray(data)) {
        throw new Error("Format de données invalide : tableau attendu");
    }

    return data;
}

export async function fetchStock(symbol: string): Promise<Stock> {
    if (!symbol || symbol.trim() === "") {
        throw new Error("Le symbole de l'action est requis");
    }

    const response = await fetch(`${API_BASE}/stocks/${encodeURIComponent(symbol)}`);

    if (response.status === 404) {
        throw new Error(`Action '${symbol}' introuvable`);
    }

    if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }

    const data: Stock = await response.json();

    if (!data.symbol || !data.history) {
        throw new Error("Données de l'action invalides");
    }

    return data;
}
