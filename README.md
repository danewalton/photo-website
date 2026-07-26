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

### Grouping photos into sessions

Photos placed directly in a category folder are shown as one flat grid, same
as always. To keep separate shoots visually distinct instead (e.g. two
different maternity clients), put each session in its own subfolder:

```
src/assets/photos/maternity/
  2026-03-smith-family/
    01.jpg
    02.jpg
  2026-06-jones-family/
    01.jpg
```

Each subfolder gets its own heading (derived from the folder name — a
leading date like `2026-03-` is stripped, dashes/underscores become
spaces, and words are capitalized, so `2026-03-smith-family` becomes
"Smith Family") and a divider between sessions. You can still leave some
photos directly in the category folder (no subfolder) — they're grouped
together with no heading, ahead of any named sessions.

Sessions are sorted by folder name, so a date prefix keeps them
chronological. If you'd rather control the order directly instead of by
date, use a plain numeric prefix the same way — `01-smith-family`,
`02-jones-family` — it's stripped from the title the same as a date
would be. Since sorting is plain text, not numeric, zero-pad past 9
sessions (`09-`, `10-`, not `9-`, `10-`) so ordering doesn't break.

### Adding a camera to the Gear page

The `/gear/` page lists each camera you shoot with, plus example shots.
To add one:

1. Add an entry to `src/data/gear.ts` with a `slug`, `name`, `type`
   (`'Film'` or `'Digital'`), optional `format`, and `description`.
2. Drop example photos in `src/assets/photos/gear/<slug>/` (same rules
   as any other gallery folder — filename order, optional subfolders).

If a camera has no photos yet, its write-up still shows without a grid.

### Choosing the homepage hero photo

By default, the homepage hero is whichever photo sorts first alphabetically
across all gallery folders — not usually the one you want. To pin specific
photos instead, drop them in `src/assets/hero/`:

```
src/assets/hero/
  01-hero.jpg
  02-hero.jpg
```

If that folder has any photos, they're used instead of the automatic pick.
One photo = a static hero. Two or more = they cross-fade into each other
automatically, cycling every 6 seconds. Filenames are shown in sorted
order, so prefix with numbers if you want a specific sequence.

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
"Enforce HTTPS" checked once DNS has propagated. DNS for danewalton.com
is managed in Cloudflare (not Namecheap, despite Namecheap being the
registrar) — add a `CNAME` record: `photo` → `danewalton.github.io`,
proxy status **DNS only** until the domain verifies and HTTPS is issued,
then switch to **Proxied** if desired.
