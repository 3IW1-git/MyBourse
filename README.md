# MyBourse

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

## Choix techniques

- **TypeScript** pour le typage strict
- **Chart.js** pour les graphiques
- **Express** pour servir l'API et les fichiers statiques
- Architecture modulaire : `api/`, `models/`, `ui/`, `charts/`
