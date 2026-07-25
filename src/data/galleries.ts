export interface Gallery {
  /** URL slug and folder name under src/assets/photos/ */
  slug: string;
  title: string;
  description: string;
}

// Add a new gallery category by adding an entry here AND creating a matching
// folder at src/assets/photos/<slug>/ — drop photos in and they show up.
export const galleries: Gallery[] = [
  {
    slug: "maternity",
    title: "Maternity",
    description: "Maternity sessions celebrating new beginnings.",
  },
  {
    slug: "engagements",
    title: "Engagements",
    description:
      "Engagement sessions capturing the excitement and emotion of newly engaged couples.",
  },
  {
    slug: "events",
    title: "Events",
    description: "Weddings, engagements, and other special occasions.",
  },
  {
    slug: "personal",
    title: "Personal Work",
    description: "Personal projects and photography explorations.",
  },
];
