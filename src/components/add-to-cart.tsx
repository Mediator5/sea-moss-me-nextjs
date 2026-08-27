"use client";

import { useState } from "react";
import { useCart } from "./cart-provider";
import { Bag, Check, Minus, Plus } from "./icons";
import { formatPrice } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function QuickAdd({ product, className = "" }: { product: Product; className?: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const defaultSize = product.sizes[product.sizes.length - 1];

  return (
    <button
      type="button"
      onClick={() => {
        add(defaultSize.id, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 1600);
      }}
      className={`btn btn-primary ${className}`}
    >
      {added ? (
        <>
          <Check className="size-4" /> Added
        </>
      ) : (
        <>
          <Bag className="size-4" /> Add {defaultSize.label}
        </>
      )}
    </button>
  );
}

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [sizeId, setSizeId] = useState(product.sizes[product.sizes.length - 1].id);
  const [qty, setQty] = useState(1);
  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];

  return (
    <div className="card p-6 sm:p-7">
      <fieldset>
        <legend className="eyebrow text-abyss-800/60">Choose your size</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {product.sizes.map((s) => {
            const active = s.id === sizeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSizeId(s.id)}
                aria-pressed={active}
                className={`rounded-md border p-4 text-left transition ${
                  active
                    ? "border-reef-500 bg-reef-100/60 shadow-sm"
                    : "border-sand-200 bg-white hover:border-sand-300"
                }`}
              >
                <span className="block text-sm font-semibold">{s.label}</span>
                <span className="mt-1 block text-xs text-abyss-800/60">{s.servings}</span>
                <span className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-xl">{formatPrice(s.price)}</span>
                  {s.compareAt && s.compareAt > s.price && (
                    <span className="text-xs text-abyss-800/40 line-through">
                      {formatPrice(s.compareAt)}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-sand-200 bg-white px-2 py-1.5">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid size-8 place-items-center rounded-full transition hover:bg-sand-100"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-6 text-center text-sm font-semibold tabular-nums">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="grid size-8 place-items-center rounded-full transition hover:bg-sand-100"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <button type="button" onClick={() => add(size.id, qty)} className="btn btn-primary flex-1">
          <Bag className="size-4" />
          Add to cart · {formatPrice(size.price * qty)}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-abyss-800/55">
        Free shipping and 10% off on any 3 jars · Ships cold-packed within 1–2 business days
      </p>
    </div>
  );
}
