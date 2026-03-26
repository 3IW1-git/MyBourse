import express from "express";
import path from "path";
import { stockData } from "./api/data";

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/stocks", (_req, res) => {
    res.json(stockData);
});

app.get("/api/stocks/:symbol", (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    const stock = stockData.find(s => s.symbol === symbol);

    if (!stock) {
        res.status(404).json({ error: `Action '${symbol}' introuvable` });
        return;
    }

    res.json(stock);
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
