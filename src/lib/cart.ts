import { BUNDLE, findSize } from "./products";

export type CartLine = {
  sizeId: string;
  qty: number;
};

export type PricedLine = CartLine & {
  name: string;
  slug: string;
  sizeLabel: string;
  unitPrice: number;
  lineTotal: number;
  accent: string;
  flavor: string;
};

export type CartTotals = {
  lines: PricedLine[];
  jars: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShipping: boolean;
  jarsToBundle: number;
};

export function formatPrice(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/**
 * Single source of truth for pricing. Used by the cart UI *and* re-run on the
 * server before a Stripe session is created, so a tampered client payload can
 * never change what someone is charged.
 */
export function priceCart(lines: CartLine[]): CartTotals {
  const priced: PricedLine[] = [];

  for (const line of lines) {
    const match = findSize(line.sizeId);
    if (!match) continue;
    const qty = Math.max(1, Math.min(50, Math.floor(line.qty) || 1));
    priced.push({
      sizeId: line.sizeId,
      qty,
      name: match.product.name,
      slug: match.product.slug,
      sizeLabel: match.size.label,
      unitPrice: match.size.price,
      lineTotal: match.size.price * qty,
      accent: match.product.accent,
      flavor: match.product.flavor,
    });
  }

  const jars = priced.reduce((n, l) => n + l.qty, 0);
  const subtotal = priced.reduce((n, l) => n + l.lineTotal, 0);
  const freeShipping = jars >= BUNDLE.threshold;
  const discount = freeShipping ? Math.round((subtotal * BUNDLE.discountPct) / 100) : 0;
  const shipping = jars === 0 || freeShipping ? 0 : BUNDLE.shipping;

  return {
    lines: priced,
    jars,
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
    freeShipping,
    jarsToBundle: Math.max(0, BUNDLE.threshold - jars),
  };
}
