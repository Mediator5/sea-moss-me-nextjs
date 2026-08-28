export const site = {
  name: "Sea Moss Me",
  tagline: "Peak health is true wealth",
  description:
    "100% certified organic, wildcrafted sea moss gel hand-harvested from Jamaica's clear coastal waters. Up to 92 of the minerals and vitamins the body needs, small-batch, no fillers.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://seamossme.com",
  email: "info@seamossme.com",
  phone: "689-304-0453",
  phoneHref: "+16893040453",
  address: "Shipped worldwide from Jamaica",
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

export const nav = [
  { label: "Shop", href: "/products" },
  { label: "Sea Moss 101", href: "/sea-moss" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Our Story", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "FAQ", href: "/faq" },
] as const;

export const announcements = [
  "20% off your first order — code SEAMOSS20",
  "Buy 3 jars, get free shipping",
  "100% organic · Wildcrafted in Jamaica",
  "Small-batch made · No fillers, ever",
] as const;
