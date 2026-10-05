# SG Name Style — Local Edition

This version uses NO Firebase and NO backend.

Everything works locally in the browser:
- Name generation
- 45+ built-in styles
- Gamer / Elegant / Fancy / Symbols / Minimal / Invisible
- Search
- Categories
- Popular
- Favorites
- Copy counters
- Local likes
- Dark mode
- Responsive mobile design
- PWA/offline support
- Replaceable logo URL

## Logo

Open `js/config.js`:

```js
const LOGO_URL = "https://YOUR-DOMAIN.com/your-logo.png";
```

Replace it with your direct image URL.

## Run

You can open `index.html` directly, but for PWA/offline installation use a local server such as VS Code Live Server.

## Data

Favorites and counters are stored in the browser's `localStorage`.

There is no account system and no cloud database.

## Customize

- `js/config.js` = logo and brand settings
- `js/styles.js` = add/change name styles
- `css/style.css` = design
- `js/app.js` = app behavior
- `js/storage.js` = local saved data
