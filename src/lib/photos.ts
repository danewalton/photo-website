import type { ImageMetadata } from 'astro';

const allPhotos = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/**/*.{jpeg,jpg,png,webp}',
  { eager: true }
);

// Optional manual override: src/assets/hero.{jpg,jpeg,png,webp}
const heroOverride = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/hero.{jpeg,jpg,png,webp}',
  { eager: true }
);

export function getPhotosForGallery(slug: string): ImageMetadata[] {
  return Object.entries(allPhotos)
    .filter(([path]) => path.includes(`/photos/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
}

export function getHeroPhoto(): ImageMetadata | null {
  const override = Object.values(heroOverride)[0];
  if (override) return override.default;

  const first = Object.keys(allPhotos).sort()[0];
  return first ? allPhotos[first].default : null;
}
