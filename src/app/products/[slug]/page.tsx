import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchasePanel } from "@/components/add-to-cart";
import { ProductShot } from "@/components/product-shot";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { ArrowRight, Check, Leaf, Shield, Truck } from "@/components/icons";
import { ingredientsForProduct } from "@/lib/ingredients";
import { getProduct, products } from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.blurb,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${product.name} · ${site.name}`, description: product.blurb },
  };
}

const guarantees = [
  { icon: Leaf, text: "100% certified organic, wildcrafted in Jamaica" },
  { icon: Truck, text: "Local delivery — Broward & Dade County" },
  { icon: Shield, text: "No fillers, gelatine, sugar or preservatives" },
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const jarIngredients = ingredientsForProduct(product.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.blurb,
    brand: { "@type": "Brand", name: site.name },
    category: "Sea moss gel",
    offers: product.sizes.map((s) => ({
      "@type": "Offer",
      name: s.label,
      price: (s.price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${site.url}/products/${product.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-sand-200 bg-sand-100/50">
        <nav aria-label="Breadcrumb" className="container-page py-4 text-xs text-abyss-800/60">
          <Link href="/" className="hover:text-abyss-900">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link href="/products" className="hover:text-abyss-900">
            Shop
          </Link>
          <span className="px-2">/</span>
          <span className="text-abyss-900">{product.name}</span>
        </nav>
      </div>

      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <ProductShot
              product={product}
              priority
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="aspect-4/5 rounded-2xl sm:aspect-square lg:aspect-4/5"
            />
            {product.badge && (
              <span
                className="absolute top-5 left-5 rounded-full px-3.5 py-1.5 text-[10px] font-bold tracking-[0.12em] text-white uppercase"
                style={{ backgroundColor: product.accent }}
              >
                {product.badge}
              </span>
            )}
          </div>

          <div>
            <p className="eyebrow" style={{ color: product.accent }}>
              {product.tagline}
            </p>
            <h1 className="mt-4 text-4xl leading-[1.06] sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-relaxed text-abyss-800/75">{product.blurb}</p>

            <div className="mt-8">
              <ProductPurchasePanel product={product} />
            </div>

            <ul className="mt-8 space-y-3">
              {guarantees.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-abyss-800/75">
                  <Icon className="size-5 shrink-0 text-reef-600" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-sand-200 py-16 sm:py-20">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-3xl">About this jar</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-abyss-800/80">
              {product.description.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>

            <h3 className="mt-12 text-2xl">How to take it</h3>
            <ul className="mt-5 space-y-3 text-abyss-800/80">
              {[
                "1–2 tablespoons daily, straight off the spoon or blended in.",
                "Stir into smoothies, tea, coffee, oatmeal or soup.",
                "Keep refrigerated; use a clean, dry spoon each time.",
                "Freezes well — portion into an ice cube tray for smoothies.",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-sm sm:text-base">
                  <Check className="mt-0.5 size-5 shrink-0 text-reef-500" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="card p-7">
              <h3 className="text-xl">What it&apos;s good for</h3>
              <ul className="mt-5 space-y-5">
                {product.benefits.map((b) => (
                  <li key={b.title}>
                    <p className="font-semibold" style={{ color: product.accent }}>
                      {b.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-abyss-800/70">{b.copy}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <h3 className="text-xl">The essentials</h3>
              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-abyss-800/60">Size</dt>
                  <dd className="text-right font-medium">{product.sizes[0].label}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-abyss-800/60">Servings</dt>
                  <dd className="text-right font-medium">~16 at a tablespoon a day</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-abyss-800/60">Best for</dt>
                  <dd className="text-right font-medium">{product.bestFor}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-abyss-800/60">Taste</dt>
                  <dd className="text-right font-medium">{product.taste}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-abyss-800/60">Shelf life</dt>
                  <dd className="text-right font-medium">3–4 weeks refrigerated</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- What's in the jar, ingredient by ingredient ---------------- */}
      <section className="border-t border-sand-200 bg-sand-100/70 py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Ingredient by ingredient"
              title="What's actually in this jar"
              copy="Every ingredient earns its place. Here is what each one brings, and who it suits."
            />
            <Reveal>
              <Link href="/natures-wisdom" className="btn btn-ghost">
                Nature&apos;s Wisdom <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jarIngredients.map((ing, i) => (
              <Reveal key={ing.slug} as="li" delay={(i % 3) * 80} className="card h-full p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl leading-tight">{ing.name}</h3>
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: `${ing.color}1a`, color: ing.color }}
                  >
                    <Leaf className="size-5" />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-abyss-900/85">{ing.summary}</p>
                <ul className="mt-5 space-y-3">
                  {ing.benefits.slice(0, 3).map((b) => (
                    <li key={b.term} className="flex gap-2.5 text-sm leading-relaxed">
                      <Check className="mt-0.5 size-4 shrink-0" style={{ color: ing.color }} />
                      <span className="text-abyss-800/80">
                        <strong className="font-semibold text-abyss-900">{b.term}</strong> — {b.copy}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/natures-wisdom#${ing.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-abyss-800/60 transition hover:text-abyss-900"
                >
                  More on {ing.name} <ArrowRight className="size-3.5" />
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-10 rounded-xl border border-sand-300 bg-white p-7 text-sm leading-relaxed text-abyss-800/75 sm:p-8">
            <strong className="font-semibold text-abyss-900">Full ingredient list: </strong>
            {product.fullIngredients} Vegan, gluten-free, dairy-free, and free from added sugar,
            fillers and preservatives.
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Keep going" title="Pairs well with" />
            <Reveal>
              <Link href="/products" className="btn btn-ghost">
                All flavours <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
