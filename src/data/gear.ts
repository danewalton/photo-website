export interface Camera {
  /** Also the folder name under src/assets/photos/gear/ for example shots */
  slug: string;
  name: string;
  type: 'Film' | 'Digital';
  format?: string;
  description: string;
}

// Add a camera by adding an entry here AND creating a matching folder at
// src/assets/photos/gear/<slug>/ with a few example shots.
export const cameras: Camera[] = [
  {
    slug: 'hasselblad',
    name: 'Hasselblad',
    type: 'Film',
    format: 'Medium format (6x6)',
    description:
      'Medium format film delivering exceptional detail, soft tonal range, and a distinctive square frame.',
  },
  {
    slug: 'fuji-tx-1',
    name: 'Fuji TX-1',
    type: 'Film',
    format: '35mm panoramic',
    description:
      'A panoramic rangefinder capturing wide, cinematic frames on standard 35mm film.',
  },
  {
    slug: '35mm',
    name: '35mm Film',
    type: 'Film',
    format: '35mm',
    description: 'Classic 35mm film for a timeless, textured look with natural grain.',
  },
  {
    slug: 'digital',
    name: 'Digital',
    type: 'Digital',
    description:
      'Digital bodies for versatility, speed, and reliability across any shooting condition.',
  },
];
