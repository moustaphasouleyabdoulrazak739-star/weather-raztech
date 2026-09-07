# Weather — RazTech

Application météo affichant les conditions actuelles et les prévisions pour une ville, avec recherche par nom de ville. Affiche Niamey par défaut au chargement.

**Démo en ligne :** https://weather-raztech.vercel.app

## Fonctionnalités

- Recherche d'une ville
- Météo actuelle (température, conditions, icône)
- Prévisions sur plusieurs jours
- Ville par défaut : Niamey

## Stack technique

- React 19 + Vite
- Tailwind CSS 3
- API : [WeatherAPI.com](https://www.weatherapi.com/)
- Déployé sur Vercel

## Lancer le projet en local

```bash
npm install
npm run dev
```
L'application est servie sur `http://localhost:5173`.

Crée un fichier `.env` à la racine (non versionné) avec ta propre clé WeatherAPI :

```env
VITE_WEATHER_API_KEY=...
```

Une clé gratuite peut être obtenue sur [weatherapi.com](https://www.weatherapi.com/).

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Build de production |
| `npm run lint` | Vérifie le code avec Oxlint |
| `npm run preview` | Prévisualise le build de production |

## Capture d'écran

*(à ajouter — placer une image dans `docs/screenshot.png` et la référencer ici : `![Aperçu](docs/screenshot.png)`)*
