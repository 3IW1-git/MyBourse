import { Stock, StockHistory } from "./stockApi.js";

export function isValidStockHistory(entry: unknown): entry is StockHistory {
    if (typeof entry !== "object" || entry === null) return false;

    const obj = entry as Record<string, unknown>;
    return (
        typeof obj.date === "string" &&
        typeof obj.price === "number" &&
        typeof obj.volume === "number" &&
        obj.price >= 0 &&
        obj.volume >= 0
    );
}

export function isValidStock(data: unknown): data is Stock {
    if (typeof data !== "object" || data === null) return false;

    const obj = data as Record<string, unknown>;
    return (
        typeof obj.symbol === "string" &&
        typeof obj.name === "string" &&
        typeof obj.sector === "string" &&
        typeof obj.currentPrice === "number" &&
        typeof obj.currency === "string" &&
        Array.isArray(obj.history) &&
        obj.history.every(isValidStockHistory)
    );
}

export function validateStockArray(data: unknown): Stock[] {
    if (!Array.isArray(data)) {
        throw new Error("Format invalide : tableau attendu");
    }

    const valid = data.filter(isValidStock);

    if (valid.length === 0) {
        throw new Error("Aucune donnée valide reçue de l'API");
    }

    return valid;
}
