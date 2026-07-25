import type { ImageMetadata } from 'astro';

const allPhotos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/**/*.{jpeg,jpg,png,webp}',
  { eager: true }
);

// Manual hero picks: drop one or more images in src/assets/hero/
const heroFolder = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/hero/*.{jpeg,jpg,png,webp}',
  { eager: true }
);

export function getPhotosForGallery(slug: string): ImageMetadata[] {
  return Object.entries(allPhotos)
    .filter(([path]) => path.includes(`/photos/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
}

export function getHeroPhotos(): ImageMetadata[] {
  const fromFolder = Object.entries(heroFolder)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
  if (fromFolder.length > 0) return fromFolder;

  const first = Object.keys(allPhotos).sort()[0];
  return first ? [allPhotos[first].default] : [];
}
