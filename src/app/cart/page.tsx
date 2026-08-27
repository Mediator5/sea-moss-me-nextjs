"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { CheckoutButton } from "@/components/checkout-button";
import { ProductThumb } from "@/components/product-shot";
import { Close, Minus, Plus, Shield, Truck } from "@/components/icons";
import { formatPrice } from "@/lib/cart";
import { BUNDLE, findSize, products } from "@/lib/products";

export default function CartPage() {
  const { totals, setQty, remove, ready, add } = useCart();

  return (
    <section className="py-14 sm:py-20">
      <div className="container-page">
        <h1 className="text-4xl sm:text-5xl">Your cart</h1>

        {ready && totals.jars === 0 ? (
          <div className="mt-10 rounded-xl border border-sand-200 bg-white p-12 text-center">
            <p className="font-display text-2xl">Nothing in here yet</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-abyss-800/65">
              Four small-batch flavours, all made from the same wildcrafted Jamaican moss.
            </p>
            <Link href="/products" className="btn btn-primary mt-8">
              Browse the flavours
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              {!totals.freeShipping && totals.jars > 0 && (
                <p className="mb-6 rounded-md border border-gold-400/40 bg-gold-200/40 px-5 py-4 text-sm">
                  <Truck className="mr-2 inline size-4 -translate-y-px" />
                  Add <strong>{totals.jarsToBundle}</strong> more{" "}
                  {totals.jarsToBundle === 1 ? "jar" : "jars"} to unlock free shipping and{" "}
                  {BUNDLE.discountPct}% off your order.
                </p>
              )}

              <ul className="divide-y divide-sand-200 border-y border-sand-200">
                {totals.lines.map((line) => {
                  const match = findSize(line.sizeId);
                  return (
                    <li key={line.sizeId} className="flex gap-5 py-6">
                      {match && (
                        <ProductThumb product={match.product} className="size-28 shrink-0 rounded-md" />
                      )}

                      <div className="flex flex-1 flex-col justify-between gap-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h2 className="text-lg">
                              <Link href={`/products/${line.slug}`} className="link-underline">
                                {line.name}
                              </Link>
                            </h2>
                            <p className="mt-1 text-sm text-abyss-800/60">{line.sizeLabel}</p>
                            <p className="mt-1 text-sm text-abyss-800/60">
                              {formatPrice(line.unitPrice)} each
                            </p>
                          </div>
                          <button
                            onClick={() => remove(line.sizeId)}
                            aria-label={`Remove ${line.name}`}
                            className="text-abyss-800/40 transition hover:text-abyss-900"
                          >
                            <Close className="size-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 rounded-full border border-sand-300 px-1.5 py-1">
                            <button
                              aria-label={`Decrease ${line.name}`}
                              onClick={() => setQty(line.sizeId, line.qty - 1)}
                              className="grid size-8 place-items-center rounded-full transition hover:bg-sand-100"
                            >
                              <Minus className="size-4" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold tabular-nums">
                              {line.qty}
                            </span>
                            <button
                              aria-label={`Increase ${line.name}`}
                              onClick={() => setQty(line.sizeId, line.qty + 1)}
                              className="grid size-8 place-items-center rounded-full transition hover:bg-sand-100"
                            >
                              <Plus className="size-4" />
                            </button>
                          </div>
                          <span className="font-display text-xl tabular-nums">
                            {formatPrice(line.lineTotal)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10">
                <h2 className="text-xl">Complete the bundle</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {products
                    .filter((p) => !totals.lines.some((l) => l.slug === p.slug))
                    .slice(0, 3)
                    .map((p) => (
                      <div key={p.slug} className="card flex items-center gap-3 p-4">
                        <ProductThumb product={p} className="size-14 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{p.name}</p>
                          <button
                            onClick={() => add(p.sizes[p.sizes.length - 1].id, 1)}
                            className="mt-1 text-xs font-semibold text-reef-600 underline-offset-4 hover:underline"
                          >
                            Add · {formatPrice(p.sizes[p.sizes.length - 1].price)}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <aside className="h-fit lg:sticky lg:top-28">
              <div className="card p-7">
                <h2 className="text-xl">Order summary</h2>
                <dl className="mt-6 space-y-3 text-sm">
                  <Row label={`Subtotal (${totals.jars} jars)`} value={formatPrice(totals.subtotal)} />
                  {totals.discount > 0 && (
                    <Row
                      label={`Bundle discount (${BUNDLE.discountPct}%)`}
                      value={`− ${formatPrice(totals.discount)}`}
                      accent
                    />
                  )}
                  <Row
                    label="Shipping"
                    value={totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
                    accent={totals.shipping === 0 && totals.jars > 0}
                  />
                </dl>
                <div className="mt-5 flex items-baseline justify-between border-t border-sand-200 pt-5">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-3xl tabular-nums">
                    {formatPrice(totals.total)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-abyss-800/50">
                  Taxes and any duties calculated at checkout.
                </p>

                <div className="mt-6">
                  <CheckoutButton />
                </div>

                <ul className="mt-6 space-y-2.5 border-t border-sand-200 pt-5 text-xs text-abyss-800/65">
                  <li className="flex items-center gap-2">
                    <Shield className="size-4 text-reef-600" /> Secure payment via Stripe
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="size-4 text-reef-600" /> Cold-packed, tracked delivery
                  </li>
                </ul>
              </div>

              <p className="mt-5 text-center text-xs text-abyss-800/55">
                Prefer to order by email?{" "}
                <Link href="/contact" className="link-underline font-semibold">
                  Send us a message
                </Link>
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-abyss-800/70">{label}</dt>
      <dd className={`tabular-nums ${accent ? "font-semibold text-reef-600" : ""}`}>{value}</dd>
    </div>
  );
}
