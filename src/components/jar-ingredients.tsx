"use client";

import Link from "next/link";
import { useState } from "react";
import { ingredientLibrary, ingredientsForProduct } from "@/lib/ingredients";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/cart";
import { QuickAdd } from "./add-to-cart";
import { ArrowRight } from "./icons";
import { IngredientCard } from "./ingredient-explorer";
import { ProductThumb } from "./product-shot";

/**
 * Nature's Wisdom, jar by jar — sits under the jars on the shop page. Pick a
 * flavour and every fruit, herb and root inside it appears, on the same cards
 * as the full Nature's Wisdom library, with the jar itself one tap from the cart.
 */
export function JarIngredients() {
  const [slug, setSlug] = useState(products[0].slug);
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const inJar = ingredientsForProduct(product.slug);

  return (
    <div>
      {/* flavour picker */}
      <div
        role="group"
        aria-label="Choose a jar"
        className="scroll-strip -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        {products.map((p) => {
          const active = p.slug === slug;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setSlug(p.slug)}
              aria-pressed={active}
              className={`inline-flex shrink-0 items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-abyss-800 text-sand-50 shadow-[0_14px_30px_-14px_rgba(3,51,58,0.9)]"
                  : "border border-white/50 text-white hover:border-white"
              }`}
            >
              <span
                aria-hidden
                className="size-2.5 rounded-full ring-2 ring-white/70"
                style={{ backgroundColor: p.gradient[1] }}
              />
              {p.name}
            </button>
          );
        })}
      </div>

      {/* the chosen jar */}
      <div
        key={`bar-${product.slug}`}
        className="animate-rise mt-8 flex flex-col gap-5 rounded-2xl border border-white/15 bg-[linear-gradient(160deg,var(--color-abyss-700)_0%,var(--color-abyss-800)_100%)] p-5 text-sand-50 shadow-[0_28px_60px_-24px_rgba(3,51,58,0.7)] sm:flex-row sm:items-center sm:p-6"
      >
        <ProductThumb product={product} className="size-20 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] tracking-[0.2em] text-sand-100/55 uppercase">
            {inJar.length} ingredients · {product.sizes[0].label}
          </p>
          <h3 className="mt-1 text-2xl leading-tight">{product.name}</h3>
          <p className="mt-1 text-sm text-sand-100/75">{product.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:justify-end">
          <p className="text-2xl font-light tracking-tight tabular-nums">
            {formatPrice(product.sizes[0].price)}
          </p>
          <QuickAdd product={product} className="px-5 py-3 text-sm" />
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame-300"
          >
            Details <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* every ingredient in it */}
      <ul
        key={`grid-${product.slug}`}
        className="animate-rise mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {inJar.map((ing) => (
          <IngredientCard key={ing.slug} ing={ing} anchor={false} />
        ))}
      </ul>

      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="max-w-xl text-white">
          Curious about the rest? Our full library explains all {ingredientLibrary.length}{" "}
          fruits, herbs and roots we work with.
        </p>
        <Link href="/natures-wisdom" className="btn btn-light">
          Explore Nature&apos;s Wisdom <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
