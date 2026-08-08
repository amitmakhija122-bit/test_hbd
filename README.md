# Ruth's Birthday Website (HTML / CSS / JS)

Pure static site — no build step, no dependencies.

## Run
Open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```

## Files
- `index.html` — markup and all scenes
- `style.css`  — pink/jasmine/gold design system + animations
- `script.js`  — scene navigation, candle blow (mic + tap), petals, confetti, chapter content
- `images/`    — artwork; replace with real photos using the same filenames

## Cloudflare R2
In `script.js`, set:
```js
const R2_BASE_URL = "https://your-bucket.r2.dev";
```
Upload with keys: `ruth/portrait.jpg`, `ruth/jasmine.jpg`, `ruth/beach.jpg`,
`ruth/biryani.jpg`, `ruth/kdrama.jpg`, `ruth/faith.jpg`, `ruth/devops.jpg`.
Leave it as `""` to use the local `images/` folder.

## Deploy
Cloudflare Pages / Netlify / Vercel / GitHub Pages:
build command = none, output directory = `/` (root of this folder).
