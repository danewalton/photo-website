# Photo Website

Source for **photo.danewalton.com** — Dane Walton Photography. Built with
[Astro](https://astro.build), deployed as a static site to GitHub Pages.

## Adding photos

Photos live under `src/assets/photos/<category>/`. Drop image files
(`.jpg`, `.jpeg`, `.png`, or `.webp`) into the matching folder and they
automatically appear in that gallery — no code changes needed:

```
src/assets/photos/
  maternity/
  portraits/
  events/
  personal/
```

Images are picked up in filename order, so prefix with numbers (`01-`,
`02-`, ...) if you want a specific order. Astro optimizes and resizes
every image at build time, so use your normal export resolution — no
need to pre-compress.

To add a whole new gallery category (not just a new photo in an existing
one):

1. Create the folder: `src/assets/photos/<slug>/`
2. Add an entry to `src/data/galleries.ts` with a matching `slug`,
   `title`, and `description`.

The homepage, nav, and gallery page are all generated from that one file.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Building

```bash
npm run build
```

Outputs static files to `dist/`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds
the site and publishes it via GitHub Pages. In the GitHub repo settings,
under **Settings → Pages**, set the source to **GitHub Actions**.

The custom domain is set via `public/CNAME` (`photo.danewalton.com`) and
also needs to be entered in **Settings → Pages → Custom domain** with
"Enforce HTTPS" checked once DNS has propagated. See the DNS setup notes
shared alongside this repo for the Namecheap-side configuration.
