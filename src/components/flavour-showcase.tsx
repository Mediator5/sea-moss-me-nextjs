import type { CSSProperties } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/cart";
import { QuickAdd } from "./add-to-cart";
import { ArrowRight } from "./icons";
import { ProductShot } from "./product-shot";
import { Reveal } from "./reveal";

/**
 * The four flavours, straight under the homepage hero. Sits on deep teal that
 * flows down into the "By the numbers" panel below, with the same glass cards,
 * mono labels and coral accents. Each card glows in its own flavour colour.
 */
export function FlavourShowcase() {
  return (
    <section
      aria-labelledby="flavours-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-abyss-800)_0%,var(--color-abyss-950)_100%)] py-24 text-sand-50 sm:py-28"
    >
      {/* soft light on the water */}
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -top-48 left-1/2 -z-10 size-[44rem] -translate-x-1/2 rounded-full bg-reef-500/35 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -right-48 bottom-0 -z-10 size-[30rem] rounded-full bg-flame-500/15 blur-3xl [animation-delay:-7s]"
      />

      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] text-flame-300 uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-flame-500 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-flame-500" />
              </span>
              The flavours
            </p>
            <h2 id="flavours-title" className="mt-4 text-4xl leading-[1.08] sm:text-5xl">
              Four flavours. <span className="text-flame-400">One wildcrafted base.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-sand-100/75 sm:text-lg">
              Every jar starts with the same hand-harvested Jamaican sea moss, blended with real
              superfoods. Pick the one that suits your day.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-flame-300"
          >
            <span className="link-underline">Compare all flavours</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p, i) => {
            const glow = p.gradient[1];
            return (
              <Reveal key={p.slug} as="li" delay={i * 90} className="h-full">
                <article
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-sand-50/10 bg-sand-50/[0.04] backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-[var(--glow)] hover:shadow-[0_30px_70px_-30px_var(--glow)]"
                  style={{ "--glow": `${glow}aa` } as CSSProperties}
                >
                  <div className="flex h-12 items-center justify-between px-5 font-mono text-[10px] tracking-[0.2em] text-sand-100/45 uppercase">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {p.badge ? (
                      <span
                        className="rounded-full px-2.5 py-1 font-sans text-[10px] font-bold tracking-[0.12em] text-white"
                        style={{ backgroundColor: p.accent }}
                      >
                        {p.badge}
                      </span>
                    ) : (
                      <span>{p.sizes[0].ounces} oz</span>
                    )}
                  </div>

                  <Link
                    href={`/products/${p.slug}`}
                    className="relative mx-3 block overflow-hidden rounded-xl"
                  >
                    <ProductShot
                      product={p}
                      priority={i < 2}
                      className="aspect-square"
                      imageClassName="scale-[0.94] object-[center_30%] transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1"
                      style={{ background: `linear-gradient(90deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
                    />
                  </Link>

                  <div className="flex flex-1 flex-col p-5 pt-6">
                    <h3 className="text-2xl leading-tight">
                      <Link href={`/products/${p.slug}`} className="link-underline">
                        {p.name}
                      </Link>
                    </h3>
                    <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-sand-100/60">
                      <span
                        aria-hidden
                        className="mt-1 size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: glow }}
                      />
                      {p.ingredients.join(" · ")}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-sand-100/75">{p.blurb}</p>

                    <div className="mt-auto pt-6">
                      <div className="flex items-end justify-between gap-3 border-t border-sand-50/10 pt-5">
                        <div>
                          <p className="font-mono text-[10px] tracking-[0.2em] text-sand-100/45 uppercase">
                            From
                          </p>
                          <p className="mt-1 text-2xl font-light tracking-tight tabular-nums">
                            {formatPrice(p.sizes[0].price)}
                          </p>
                        </div>
                        <Link
                          href={`/products/${p.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sand-100/70 transition hover:text-sand-50"
                        >
                          Details <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                      <QuickAdd product={p} className="mt-4 w-full px-5 py-3 text-sm" />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
