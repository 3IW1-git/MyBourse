import { Stock } from "../api/stockApi.js";

export function exportToCSV(stocks: Stock[]): void {
    if (stocks.length === 0) {
        throw new Error("Aucune donnée à exporter");
    }

    const headers = ["Date"];
    stocks.forEach(stock => {
        headers.push(`${stock.symbol} - Prix`);
        headers.push(`${stock.symbol} - Volume`);
    });

    const rows: string[][] = [];
    const maxLength = Math.max(...stocks.map(s => s.history.length));

    for (let i = 0; i < maxLength; i++) {
        const row: string[] = [];

        const date = stocks[0].history[i]?.date ?? "";
        row.push(date);

        stocks.forEach(stock => {
            const entry = stock.history[i];
            row.push(entry ? entry.price.toString() : "");
            row.push(entry ? entry.volume.toString() : "");
        });

        rows.push(row);
    }

    const csvContent = [
        headers.join(","),
        ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `mybourse_export_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    URL.revokeObjectURL(url);
}
