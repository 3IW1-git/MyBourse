# MyBourse 📈

Application web d'affichage de cours boursiers sous forme de graphiques interactifs.
Développée en TypeScript sans framework, avec Chart.js pour la visualisation.

## Installation

```bash
npm install
```

## Lancement

```bash
npm run build
npm start
```

Ouvrir `http://localhost:3000` dans le navigateur.

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run build` | Compile le TypeScript (serveur + client) |
| `npm run build:server` | Compile uniquement le serveur |
| `npm run build:client` | Compile uniquement le client |
| `npm start` | Lance le serveur Express |
| `npm run dev` | Mode watch pour le serveur |

## Architecture du projet

```
src/
├── server.ts                  # Serveur Express (API + fichiers statiques)
├── api/
│   └── data.ts                # Données boursières servies par l'API
├── models/
│   ├── index.ts               # Barrel export des modèles
│   ├── Stock.ts               # Interfaces Stock et StockHistory
│   └── ApiError.ts            # Classe et interface d'erreur API
└── client/
    ├── app.ts                 # Point d'entrée client
    ├── api/
    │   ├── stockApi.ts        # Client API (fetch async/await)
    │   └── validation.ts      # Validation et type guards
    ├── ui/
    │   ├── dom.ts             # Manipulation du DOM
    │   ├── theme.ts           # Gestion du mode sombre
    │   └── export.ts          # Export CSV
    └── charts/
        └── stockChart.ts      # Rendu graphique (Chart.js)
```

## Choix techniques

- **TypeScript** avec `strict` et `noImplicitAny` activés
- **Chart.js 4** pour les graphiques interactifs (ligne, barres)
- **Express** pour servir l'API REST et les fichiers statiques
- Architecture modulaire séparant API, modèles, UI et graphiques
- Validation des données avec des type guards TypeScript
- Gestion complète des erreurs (réseau, API, validation, utilisateur)
- Deux configurations TypeScript séparées (serveur CommonJS / client ES Modules)

## Fonctionnalités

### Principales
- Sélection d'une ou deux actions boursières
- Comparaison visuelle sur un même graphique
- Choix de la période d'affichage (3 jours, 5 jours, 1 semaine, 1 mois, 1 an, toutes)
- Changement du type de graphique (ligne / barres)
- Graphique des volumes échangés
- Affichage des détails de chaque action (secteur, prix, données)
- Messages d'erreur clairs pour l'utilisateur
- Loader animé pendant le chargement

### Bonus
- 🌙 Mode sombre avec sauvegarde dans le localStorage
- 📥 Export des données en fichier CSV
- 🎨 Animations et transitions CSS
- 📱 Interface responsive (mobile / desktop)

## API REST

| Endpoint | Méthode | Description |
|---|---|---|
| `/api/stocks` | GET | Liste toutes les actions |
| `/api/stocks/:symbol` | GET | Détails d'une action par symbole |

### Exemple de réponse

```json
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "sector": "Technology",
  "currentPrice": 182.45,
  "currency": "USD",
  "history": [
    { "date": "2026-03-10", "price": 178.12, "volume": 54000000 }
  ]
}
```

## Gestion des erreurs

- Erreurs réseau interceptées via `try/catch` sur les appels `fetch`
- Erreurs API (404, 500) avec messages explicites
- Validation des données reçues avec des type guards
- Erreurs utilisateur (sélection vide, actions identiques)
- Affichage visuel des erreurs dans un bandeau dédié
- Middleware d'erreur global côté serveur
