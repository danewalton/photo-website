import type { ImageMetadata } from 'astro';

// Glob matching is case-sensitive, and many cameras default to uppercase
// extensions (e.g. .JPG), so both cases are listed explicitly here.
// (import.meta.glob needs a literal string pattern — it can't resolve one
// built from a shared constant.)
const allPhotos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/**/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}',
  { eager: true }
);

// Manual hero picks: drop one or more images in src/assets/hero/
const heroFolder = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/hero/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}',
  { eager: true }
);

export function getPhotosForGallery(slug: string): ImageMetadata[] {
  return Object.entries(allPhotos)
    .filter(([path]) => path.includes(`/photos/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
}

export interface PhotoSession {
  /** null for photos placed directly in the category folder (no session) */
  title: string | null;
  photos: ImageMetadata[];
}

function formatSessionTitle(folder: string): string {
  // Strips a leading sort key — a date (2026-03-) or a plain order
  // prefix (01-, 2-) — so it controls ordering without showing in the title.
  const withoutPrefix = folder.replace(/^\d[\d_-]*[-_\s]+/, '');
  const base = withoutPrefix.length > 0 ? withoutPrefix : folder;
  return base
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

/**
 * Groups a gallery's photos by subfolder so a photographer can separate
 * individual sessions (e.g. src/assets/photos/maternity/2026-03-smith/)
 * without any code changes. Photos left directly in the category folder
 * (no subfolder) are grouped together with no heading.
 */
export function getSessionsForGallery(slug: string): PhotoSession[] {
  const prefix = `/photos/${slug}/`;
  const byFolder = new Map<string | null, [string, ImageMetadata][]>();

  for (const [path, mod] of Object.entries(allPhotos)) {
    if (!path.includes(prefix)) continue;
    const rest = path.split(prefix)[1];
    const segments = rest.split('/');
    const folder = segments.length > 1 ? segments[0] : null;
    const list = byFolder.get(folder) ?? [];
    list.push([path, mod.default]);
    byFolder.set(folder, list);
  }

  const folders = Array.from(byFolder.keys()).sort((a, b) => {
    if (a === null) return -1;
    if (b === null) return 1;
    return a.localeCompare(b);
  });

  return folders.map((folder) => ({
    title: folder ? formatSessionTitle(folder) : null,
    photos: byFolder
      .get(folder)!
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, img]) => img),
  }));
}

export function getHeroPhotos(): ImageMetadata[] {
  const fromFolder = Object.entries(heroFolder)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
  if (fromFolder.length > 0) return fromFolder;

  const first = Object.keys(allPhotos).sort()[0];
  return first ? [allPhotos[first].default] : [];
}
