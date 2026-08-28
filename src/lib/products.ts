export type FlavorKey = "purple" | "golden" | "green" | "montego";

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
  /** Product photograph — studio shot on white, lives in /public/images/products */
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
    slug: "super-green-emerald",
    name: "Super Green Emerald",
    flavor: "green",
    tagline: "Chlorophyll · Moringa · Spirulina · Chlorella",
    blurb:
      "Our best seller — a detoxifying, alkalising gel packed with 92 essential minerals for whole-body wellness.",
    description: [
      "Emerald is the jar most people start with, and the one most people come back for. Four green superfoods are folded into wildcrafted sea moss gel while it is still warm, so nothing is heat-treated into dullness.",
      "The result is deeply green, faintly grassy and surprisingly smooth — the kind of thing that disappears into a morning smoothie and quietly does its work.",
    ],
    ingredients: ["Chlorophyll", "Moringa", "Spirulina", "Chlorella"],
    fullIngredients:
      "Wildcrafted Jamaican sea moss (Genus Gracilaria), spring water, chlorophyll, moringa leaf, spirulina, chlorella, lime.",
    benefits: [
      { title: "Alkalising", copy: "Chlorophyll-rich greens help balance a diet heavy on processed food." },
      { title: "Mineral dense", copy: "92 of the minerals and vitamins your body needs, in the form it recognises." },
      { title: "Everyday energy", copy: "Steady, food-based energy — no crash, no stimulants." },
    ],
    badge: "Best seller",
    bestFor: "Daily wellness and gentle detox",
    taste: "Fresh and grassy, with a clean lime finish",
    sizes: SIZES(3000, "super-green-emerald"),
    image: "/images/products/super-green-emerald.jpg",
    accent: "#1f5e3c",
    accentSoft: "#e7f1e8",
    gradient: ["#123f2a", "#3f8a5f"],
  },
  {
    slug: "purple-power-bomb",
    name: "Purple Power Bomb",
    flavor: "purple",
    tagline: "Elderberry · Beetroot · Acai · Dragonfruit",
    blurb:
      "Antioxidant-rich sea moss gel built to boost immunity and help your body fight back, day after day.",
    description: [
      "Four deeply pigmented fruits — elderberry, beetroot, acai and dragonfruit — give this jar its colour and its job. Pigment is antioxidant; the darker the fruit, the harder it works.",
      "It is the one to keep in the fridge through the cold months, stirred into tea or eaten straight off the spoon.",
    ],
    ingredients: ["Elderberry", "Beetroot", "Acai", "Dragonfruit"],
    fullIngredients:
      "Wildcrafted Jamaican sea moss (Genus Gracilaria), spring water, elderberry, beetroot, acai, dragonfruit, lime.",
    benefits: [
      { title: "Immune support", copy: "Elderberry has been the go-to immune fruit for a very long time." },
      { title: "Antioxidant load", copy: "Four pigment-rich fruits, no colouring, no concentrates." },
      { title: "Circulation", copy: "Beetroot is a classic for blood flow and stamina." },
    ],
    bestFor: "Immunity and recovery",
    taste: "Berry-forward and tart, like a dark fruit compote",
    sizes: SIZES(3000, "purple-power-bomb"),
    image: "/images/products/purple-power-bomb.jpg",
    accent: "#7a2540",
    accentSoft: "#f7e7ec",
    gradient: ["#4c1428", "#a44766"],
  },
  {
    slug: "golden-milk",
    name: "Golden Milk",
    flavor: "golden",
    tagline: "Turmeric · Ginger · Ashwagandha · Black Pepper · Cinnamon",
    blurb:
      "A warming blend that supports gut health, eases inflammation and keeps energy steady all day.",
    description: [
      "Built on the golden milk tradition: turmeric for inflammation, black pepper so your body can actually use the turmeric, ginger for digestion, ashwagandha for the days that ask a lot of you.",
      "Warming, a little spiced, and excellent stirred into oat milk before bed.",
    ],
    ingredients: ["Turmeric", "Ginger", "Ashwagandha", "Black pepper", "Cinnamon"],
    fullIngredients:
      "Wildcrafted Jamaican sea moss (Genus Gracilaria), spring water, turmeric, ginger, ashwagandha root, black pepper, cinnamon.",
    benefits: [
      { title: "Calms inflammation", copy: "Turmeric and ginger, paired with pepper for absorption." },
      { title: "Gut friendly", copy: "Ginger and sea moss mucilage are both easy on digestion." },
      { title: "Stress steady", copy: "Ashwagandha is an adaptogen — it helps you hold your line." },
    ],
    bestFor: "Inflammation, digestion and stress",
    taste: "Warm and spiced, cinnamon on the finish",
    sizes: SIZES(3000, "golden-milk"),
    image: "/images/products/golden-milk.jpg",
    accent: "#c98a1e",
    accentSoft: "#fbf0d9",
    gradient: ["#8a5a12", "#e8c268"],
  },
  {
    slug: "montego-tropical-fusion",
    name: "Montego Tropical Fusion",
    flavor: "montego",
    tagline: "Mango · Coconut · Pineapple · Papaya",
    blurb:
      "Jamaican mango, coconut, pineapple and papaya for a bright, tropical twist on the ritual you already love.",
    description: [
      "Our newest jar, and the easiest one to love. Four tropical fruits grown a short drive from where the moss is harvested — mango, coconut, pineapple and papaya.",
      "Pineapple and papaya both bring natural digestive enzymes, so it is as functional as it is delicious. Available for a limited run.",
    ],
    ingredients: ["Jamaican mango", "Coconut", "Pineapple", "Papaya"],
    fullIngredients:
      "Wildcrafted Jamaican sea moss (Genus Gracilaria), spring water, mango, coconut, pineapple, papaya, lime.",
    benefits: [
      { title: "Digestive enzymes", copy: "Bromelain and papain from pineapple and papaya." },
      { title: "Skin and hair", copy: "Vitamin C plus sea moss minerals — the collagen-friendly pair." },
      { title: "Kid approved", copy: "The jar that gets fussy eaters to take their minerals." },
    ],
    badge: "Limited edition",
    bestFor: "Anyone who wants wellness to taste like holiday",
    taste: "Bright, sweet, unmistakably tropical",
    sizes: SIZES(3000, "montego-tropical-fusion"),
    image: "/images/products/montego-tropical-fusion.jpg",
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
  /** Jars needed to unlock free shipping + the bundle discount. */
  threshold: 3,
  /** Percentage off the subtotal once the threshold is met. */
  discountPct: 10,
  /** Flat shipping in cents below the threshold. */
  shipping: 895,
} as const;

export const FIRST_ORDER = {
  code: "SEAMOSS20",
  discountPct: 20,
} as const;
