export type FlavorKey = "alkaline" | "berry" | "golden" | "tropical";

export type ProductSize = {
  /** Stable id used by the cart and by Stripe line items. */
  id: string;
  label: string;
  ounces: number;
  /** Price in cents. Change these to your real prices. */
  price: number;
  compareAt?: number;
  servings: string;
};

export type Product = {
  slug: string;
  name: string;
  flavor: FlavorKey;
  tagline: string;
  blurb: string;
  description: string[];
  ingredients: string[];
  fullIngredients: string;
  benefits: { title: string; copy: string }[];
  badge?: string;
  bestFor: string;
  taste: string;
  sizes: ProductSize[];
  /** Product photograph — studio shot on white, lives in /public/images/products.
   * Filenames carry a suffix so a reshoot lands on a fresh URL: Next's image
   * optimiser caches by URL for four hours and will happily keep serving the
   * old jar if you overwrite a file in place. */
  image: string;
  accent: string;
  accentSoft: string;
  gradient: [string, string];
};

/**
 * ---------------------------------------------------------------------------
 * PRICING — in cents. 3000 = $30.00.
 * Change the number here and the whole site (cards, product pages, cart and
 * Stripe checkout) follows automatically. To add a second size later, return
 * another object from SIZES with its own id, label, ounces and price.
 * ---------------------------------------------------------------------------
 */
const SIZES = (price: number, slug: string): ProductSize[] => [
  {
    id: `${slug}-8oz`,
    label: "8 oz jar",
    ounces: 8,
    price,
    servings: "~16 servings · 2 weeks at a tablespoon a day",
  },
];

export const products: Product[] = [
  {
    slug: "alkaline-me",
    name: "Alkaline Me",
    flavor: "alkaline",
    tagline: "Chlorella · Chlorophyll · Moringa · Spirulina",
    blurb:
      "A deep-green mineral blend, crafted to support the body's natural alkalinity and everyday vitality.",
    description: [
      "Alkaline Me is the jar most people start with, and the one most people come back for. Four green superfoods are folded into wildcrafted sea moss gel while it is still warm, so nothing is heat-treated into dullness.",
      "The result is deeply green, faintly grassy and surprisingly smooth — the kind of thing that disappears into a morning smoothie and quietly does its work.",
    ],
    ingredients: ["Chlorella", "Chlorophyll", "Moringa", "Spirulina"],
    fullIngredients:
      "Wildcrafted Jamaican sea moss (Genus Gracilaria), spring water, chlorella, chlorophyll, moringa leaf, spirulina, lime.",
    benefits: [
      { title: "Alkalising", copy: "Chlorophyll-rich greens help balance a diet heavy on processed food." },
      { title: "Mineral dense", copy: "A broad spread of trace minerals and vitamins, in the form your body recognises." },
      { title: "Everyday energy", copy: "Steady, food-based energy — no crash, no stimulants." },
    ],
    badge: "Best seller",
    bestFor: "Energy · Skin · Vitality",
    taste: "Fresh and grassy, with a clean lime finish",
    sizes: SIZES(3000, "alkaline-me"),
    image: "/images/products/alkaline-me-jar.jpg",
    accent: "#1f5e3c",
    accentSoft: "#e7f1e8",
    gradient: ["#123f2a", "#3f8a5f"],
  },
  {
    slug: "beets-and-berry-me",
    name: "Beets and Berry Me",
    flavor: "berry",
    tagline: "Beetroot · Blueberry · Dragonfruit · Elderberry · Raspberry",
    blurb:
      "A bold beetroot-and-berry infusion, rich in natural nitrates and antioxidants, crafted to support circulation and steady recovery.",
    description: [
      "Beetroot for the nitrates, and four deeply pigmented berries and fruits for everything else — blueberry, dragonfruit, elderberry and raspberry. Pigment is antioxidant; the darker the fruit, the harder it works.",
      "It is the one to keep in the fridge through the cold months, stirred into tea or eaten straight off the spoon.",
    ],
    ingredients: ["Beetroot", "Blueberry", "Dragonfruit", "Elderberry", "Raspberry"],
    fullIngredients:
      "Wildcrafted Jamaican sea moss (Genus Gracilaria), spring water, beetroot, blueberry, dragonfruit, elderberry, raspberry, lime.",
    benefits: [
      { title: "Circulation", copy: "Beetroot's natural nitrates are a classic for blood flow and stamina." },
      { title: "Immune support", copy: "Elderberry has been the go-to immune fruit for a very long time." },
      { title: "Antioxidant load", copy: "Five pigment-rich ingredients, no colouring, no concentrates." },
    ],
    bestFor: "Circulation · Immunity · Recovery",
    taste: "Berry-forward and tart, like a dark fruit compote",
    sizes: SIZES(3000, "beets-and-berry-me"),
    image: "/images/products/beets-and-berry-me-jar.jpg",
    accent: "#7a2540",
    accentSoft: "#f7e7ec",
    gradient: ["#4c1428", "#a44766"],
  },
  {
    slug: "golden-me",
    name: "Golden Me",
    flavor: "golden",
    tagline: "Ashwagandha · Ginger · Lemon · Turmeric",
    blurb:
      "A warming infusion of turmeric, ginger, and lemon, designed to ease the body into calm and comfort.",
    description: [
      "Built on the golden milk tradition: turmeric for inflammation, ginger for digestion, lemon to lift the whole thing, and ashwagandha for the days that ask a lot of you.",
      "Warming, a little spiced, and excellent stirred into oat milk before bed.",
    ],
    ingredients: ["Ashwagandha", "Ginger", "Lemon", "Turmeric"],
    fullIngredients:
      "Wildcrafted Jamaican sea moss (Genus Gracilaria), spring water, ashwagandha root, ginger, lemon, turmeric.",
    benefits: [
      { title: "Calms inflammation", copy: "Turmeric and ginger, the pairing this blend is built around." },
      { title: "Calm and sleep", copy: "Ashwagandha is an adaptogen — it helps you hold your line, and wind down." },
      { title: "Gut friendly", copy: "Ginger and sea moss mucilage are both easy on digestion." },
    ],
    bestFor: "Sleep · Calm · Inflammation",
    taste: "Warm and spiced, with a bright citrus finish",
    sizes: SIZES(3000, "golden-me"),
    image: "/images/products/golden-me-jar.jpg",
    accent: "#c98a1e",
    accentSoft: "#fbf0d9",
    gradient: ["#8a5a12", "#e8c268"],
  },
  {
    slug: "tropical-me",
    name: "Tropical Me",
    flavor: "tropical",
    tagline: "Coconut · Mango · Papaya · Pineapple",
    blurb:
      "A bright, enzyme-rich fruit blend that supports digestion while delivering a taste of the islands.",
    description: [
      "Our newest jar, and the easiest one to love. Four tropical fruits grown a short drive from where the moss is harvested — coconut, mango, papaya and pineapple.",
      "Pineapple and papaya both bring natural digestive enzymes, so it is as functional as it is delicious. Available for a limited run.",
    ],
    ingredients: ["Coconut", "Mango", "Papaya", "Pineapple"],
    fullIngredients:
      "Wildcrafted Jamaican sea moss (Genus Gracilaria), spring water, coconut, mango, papaya, pineapple, lime.",
    benefits: [
      { title: "Digestive enzymes", copy: "Bromelain and papain from pineapple and papaya." },
      { title: "Hydration", copy: "Coconut and sea moss minerals — the pair your body rehydrates with." },
      { title: "Gut health", copy: "Gentle, enzyme-led support after a heavy meal." },
    ],
    badge: "Limited edition",
    bestFor: "Digestion · Hydration · Gut Health",
    taste: "Bright, sweet, unmistakably tropical",
    sizes: SIZES(3000, "tropical-me"),
    image: "/images/products/tropical-me-jar.jpg",
    accent: "#d9812a",
    accentSoft: "#fcecd9",
    gradient: ["#a3550f", "#eda85f"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const findSize = (sizeId: string) => {
  for (const product of products) {
    const size = product.sizes.find((s) => s.id === sizeId);
    if (size) return { product, size };
  }
  return null;
};

/** Bundle rules — mirrored on the server before checkout. */
export const BUNDLE = {
  /** Jars needed to unlock free local delivery + the bundle discount. */
  threshold: 3,
  /** Percentage off the subtotal once the threshold is met. */
  discountPct: 10,
  /** Flat local-delivery fee in cents below the threshold. */
  shipping: 895,
} as const;

export const FIRST_ORDER = {
  code: "SEAMOSS20",
  discountPct: 20,
} as const;
