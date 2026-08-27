import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/cart";
import { ProductShot } from "./product-shot";
import { QuickAdd } from "./add-to-cart";
import { ArrowRight } from "./icons";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const from = product.sizes[0];

  return (
    <article className="group card relative flex h-full flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-1"
        style={{ backgroundColor: product.accent }}
      />

      {product.badge && (
        <span
          className="absolute top-5 right-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-white uppercase"
          style={{ backgroundColor: product.accent }}
        >
          {product.badge}
        </span>
      )}

      <Link href={`/products/${product.slug}`} className="block">
        <ProductShot
          product={product}
          priority={priority}
          className="aspect-4/5"
          imageClassName="scale-[0.94] transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow" style={{ color: product.accent }}>
          {product.tagline}
        </p>
        <h3 className="mt-3 text-2xl">
          <Link href={`/products/${product.slug}`} className="link-underline">
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-abyss-800/70">{product.blurb}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {product.ingredients.map((ing) => (
            <span
              key={ing}
              className="rounded-full border border-sand-200 bg-sand-100/70 px-2.5 py-1 text-[11px] font-medium text-abyss-800/75"
            >
              {ing}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-7">
          <div>
            <p className="text-[11px] tracking-wide text-abyss-800/50 uppercase">From</p>
            <p className="font-display text-2xl">{formatPrice(from.price)}</p>
          </div>
          <QuickAdd product={product} className="px-5 py-3 text-sm" />
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-abyss-800/60 transition hover:text-abyss-900"
        >
          Full details <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
