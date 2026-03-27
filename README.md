# MyBourse 📈

Application web d'affichage de cours boursiers sous forme de graphiques interactifs.

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
├── server.ts              # Serveur Express
├── api/
│   └── data.ts            # Données boursières (API)
├── models/
│   └── Stock.ts           # Interfaces TypeScript
└── client/
    ├── app.ts             # Point d'entrée client
    ├── api/
    │   └── stockApi.ts    # Client API (fetch)
    ├── ui/
    │   └── dom.ts         # Manipulation du DOM
    └── charts/
        └── stockChart.ts  # Rendu graphique (Chart.js)
```

## Choix techniques

- **TypeScript** avec `strict` et `noImplicitAny` activés
- **Chart.js** pour les graphiques interactifs
- **Express** pour servir l'API REST et les fichiers statiques
- Architecture modulaire séparant API, modèles, UI et graphiques
- Gestion complète des erreurs (réseau, API, validation, utilisateur)

## Fonctionnalités

- Sélection d'une ou deux actions boursières
- Comparaison visuelle sur un même graphique
- Choix de la période d'affichage
- Changement du type de graphique (ligne / barres)
- Affichage des détails de chaque action
- Messages d'erreur clairs pour l'utilisateur
