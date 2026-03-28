import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { stockData } from "./api/data";

const app = express();
const PORT = 3000;

// CORS pour le développement
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

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

// Route 404 pour les endpoints API inconnus
app.use("/api/*", (_req, res) => {
    res.status(404).json({ error: "Endpoint introuvable" });
});

// Middleware de gestion d'erreurs global
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Erreur serveur:", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
