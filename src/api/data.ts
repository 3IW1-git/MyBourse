import { Stock } from "../models";

export const stockData: Stock[] = [
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        sector: "Technology",
        currentPrice: 182.45,
        currency: "USD",
        history: [
            { date: "2026-03-10", price: 178.12, volume: 54000000 },
            { date: "2026-03-11", price: 180.25, volume: 49000000 },
            { date: "2026-03-12", price: 179.80, volume: 51000000 },
            { date: "2026-03-13", price: 181.90, volume: 47000000 },
            { date: "2026-03-14", price: 182.45, volume: 53000000 }
        ]
    },
    {
        symbol: "TSLA",
        name: "Tesla Inc.",
        sector: "Automotive",
        currentPrice: 245.30,
        currency: "USD",
        history: [
            { date: "2026-03-10", price: 238.50, volume: 62000000 },
            { date: "2026-03-11", price: 240.10, volume: 60000000 },
            { date: "2026-03-12", price: 242.75, volume: 58000000 },
            { date: "2026-03-13", price: 244.20, volume: 61000000 },
            { date: "2026-03-14", price: 245.30, volume: 59000000 }
        ]
    },
    {
        symbol: "AMZN",
        name: "Amazon.com Inc.",
        sector: "E-commerce",
        currentPrice: 132.10,
        currency: "USD",
        history: [
            { date: "2026-03-10", price: 129.50, volume: 43000000 },
            { date: "2026-03-11", price: 130.20, volume: 41000000 },
            { date: "2026-03-12", price: 131.00, volume: 42000000 },
            { date: "2026-03-13", price: 131.75, volume: 40000000 },
            { date: "2026-03-14", price: 132.10, volume: 39000000 }
        ]
    },
    {
        symbol: "MSFT",
        name: "Microsoft Corp.",
        sector: "Technology",
        currentPrice: 315.80,
        currency: "USD",
        history: [
            { date: "2026-03-10", price: 310.20, volume: 35000000 },
            { date: "2026-03-11", price: 312.00, volume: 34000000 },
            { date: "2026-03-12", price: 313.50, volume: 33000000 },
            { date: "2026-03-13", price: 314.90, volume: 32000000 },
            { date: "2026-03-14", price: 315.80, volume: 31000000 }
        ]
    }
];
