# Portfolio Hub

A small React/Vite landing page for Zack's privacy-first Instagram tools.

The hub lives in `hub/` because this is the intended project folder for the parent portfolio. The earlier `site/` name is also reasonable for an apex domain, but `hub/` matches the current workspace and project purpose.

## Stack

- Vite 5
- React 18
- Tailwind CSS v4
- Outfit + Playfair Display

## Local Development

Install dependencies:

```sh
npm install
```

Start the dev server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## App Registry

App cards are driven by `src/data/apps.js`. Replace the placeholder Vercel URLs after deploying the sibling apps:

```js
url: "https://REPLACE-IG-WRAPPED.vercel.app"
url: "https://REPLACE-UNRECIPROCATED.vercel.app"
```

Adding another app should only require adding another object to the `APPS` array.

## Deploying on Vercel

If importing the parent `ai-test` workspace into Vercel:

- Framework Preset: `Vite`
- Root Directory: `hub`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

If `hub/` becomes its own GitHub repository, leave Root Directory empty because the Vite project files are at the repository root.

No SPA rewrite is required for the current single-page hub. Add one later only if client-side routes are introduced.
