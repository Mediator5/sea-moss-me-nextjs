"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";
import { CheckoutButton } from "./checkout-button";
import { Close, Minus, Plus, Truck } from "./icons";
import { formatPrice } from "@/lib/cart";
import { BUNDLE, findSize } from "@/lib/products";
import { ProductThumb } from "./product-shot";

export function CartDrawer() {
  const { isOpen, closeCart, totals, setQty, remove } = useCart();

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[70] ${isOpen ? "" : "pointer-events-none"}`}
    >
      <button
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
        className={`absolute inset-0 bg-abyss-950/50 backdrop-blur-[2px] transition-opacity duration-[400ms] ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal={isOpen}
        aria-label="Your cart"
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-sand-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-sand-200 px-6 py-5">
          <div>
            <p className="eyebrow text-flame-600">Your cart</p>
            <p className="font-display text-xl">
              {totals.jars} {totals.jars === 1 ? "jar" : "jars"}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="grid size-10 place-items-center rounded-full border border-sand-200 bg-white transition hover:bg-sand-100"
          >
            <Close className="size-4" />
          </button>
        </header>

        {totals.jars === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="font-display text-2xl">Nothing in here yet</p>
            <p className="text-sm text-abyss-800/70">
              Four flavours, all made from the same wildcrafted Jamaican moss.
            </p>
            <Link href="/products" onClick={closeCart} className="btn btn-primary">
              Browse the flavours
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {!totals.freeShipping && (
                <div className="mb-5 rounded-md border border-gold-400/40 bg-gold-200/40 px-4 py-3 text-xs leading-relaxed text-abyss-900">
                  <Truck className="mr-1.5 inline size-4 -translate-y-px" />
                  Add <strong>{totals.jarsToBundle}</strong> more{" "}
                  {totals.jarsToBundle === 1 ? "jar" : "jars"} for free delivery and{" "}
                  {BUNDLE.discountPct}% off.
                </div>
              )}
              {totals.freeShipping && (
                <div className="mb-5 rounded-md border border-reef-400/40 bg-reef-100 px-4 py-3 text-xs font-medium text-reef-600">
                  Bundle unlocked — free delivery and {BUNDLE.discountPct}% off applied.
                </div>
              )}

              <ul className="space-y-4">
                {totals.lines.map((line) => {
                  const match = findSize(line.sizeId);
                  return (
                    <li key={line.sizeId} className="flex gap-4 rounded-md bg-white p-3 shadow-sm">
                      {match && <ProductThumb product={match.product} className="size-20 shrink-0" />}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="text-sm font-semibold">{line.name}</p>
                          <p className="text-xs text-abyss-800/60">{line.sizeLabel}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-sand-200">
                            <button
                              aria-label={`Decrease ${line.name}`}
                              onClick={() => setQty(line.sizeId, line.qty - 1)}
                              className="grid size-7 place-items-center rounded-full transition hover:bg-sand-100"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-semibold tabular-nums">
                              {line.qty}
                            </span>
                            <button
                              aria-label={`Increase ${line.name}`}
                              onClick={() => setQty(line.sizeId, line.qty + 1)}
                              className="grid size-7 place-items-center rounded-full transition hover:bg-sand-100"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold tabular-nums">
                            {formatPrice(line.lineTotal)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(line.sizeId)}
                        aria-label={`Remove ${line.name}`}
                        className="self-start text-abyss-800/40 transition hover:text-abyss-900"
                      >
                        <Close className="size-4" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <footer className="space-y-3 border-t border-sand-200 bg-white px-6 py-5">
              <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
              {totals.discount > 0 && (
                <Row
                  label={`Bundle discount (${BUNDLE.discountPct}%)`}
                  value={`− ${formatPrice(totals.discount)}`}
                  accent
                />
              )}
              <Row
                label="Delivery"
                value={totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
                accent={totals.shipping === 0}
              />
              <div className="flex items-baseline justify-between border-t border-sand-200 pt-3">
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-2xl tabular-nums">
                  {formatPrice(totals.total)}
                </span>
              </div>
              <CheckoutButton />
              <Link
                href="/cart"
                onClick={closeCart}
                className="block text-center text-xs text-abyss-800/60 underline-offset-4 hover:underline"
              >
                View full cart
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-abyss-800/70">{label}</span>
      <span className={`tabular-nums ${accent ? "font-semibold text-reef-600" : ""}`}>{value}</span>
    </div>
  );
}
