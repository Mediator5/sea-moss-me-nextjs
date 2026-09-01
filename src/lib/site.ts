export const site = {
  name: "Sea Moss Me",
  tagline: "Peak health is true wealth",
  description:
    "100% certified organic, wildcrafted sea moss gel hand-harvested from Jamaica's clear coastal waters. A broad spread of trace minerals and vitamins, small-batch, no fillers.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://seamossme.com",
  email: "info@seamossme.com",
  phone: "689-304-0453",
  phoneHref: "+16893040453",
  address: "Local delivery — Broward & Dade County",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
  promo: {
    code: "SEAMOSS20",
    label: "20% off your first order",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  /** Rendered as a dropdown on desktop and an indented group in the mobile menu. */
  children?: readonly NavLink[];
};

/* Five top-level items. Everything else hangs off one of them. */
export const nav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Sea Moss 101", href: "/sea-moss" },
      { label: "Nature's Wisdom", href: "/natures-wisdom" },
      { label: "Blog", href: "/blog" },
    ],
  },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const announcements = [
  "20% off your first order — code SEAMOSS20",
  "Buy 3 jars, get free local delivery",
  "100% organic · Wildcrafted in Jamaica",
  "Small-batch made · No fillers, ever",
] as const;
