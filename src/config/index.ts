export const FEE = 1;
export const PRODUCT_CATEGORIES = [
  {
    label: "UI kits",
    value: "ui_kits" as const,
    featured: [
      {
        name: "Editors Picks",
        href: "#",
        ImageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        ImageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Best Sellers",
        href: "#",
        ImageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Icons",
    value: "icons" as const,
    featured: [
      {
        name: "Favorites Icon Pics",
        href: "#",
        ImageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        ImageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Icons",
        href: "#",
        ImageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];
