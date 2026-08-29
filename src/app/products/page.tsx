import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { FaqAccordion } from "@/components/faq-accordion";
import { ArrowRight, Check } from "@/components/icons";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/cart";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop sea moss gel",
  description:
    "Four small-batch flavours of wildcrafted Jamaican sea moss gel — Alkaline Me, Beets and Berry Me, Golden Me and Tropical Me.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-reef-500 pt-20 pb-24 text-sand-50">
        <Image
          src="/images/showcase.jpg"
          alt=""
          aria-hidden
          width={2000}
          height={1125}
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(49,139,152,0.93),rgba(49,139,152,0.86))]"
        />
        <div className="container-page relative text-center">
          <p className="eyebrow text-gold-300">The collection</p>
          <h1 className="mx-auto mt-5 max-w-3xl text-5xl leading-[1.04] sm:text-6xl">
            Pick your jar
          </h1>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-sand-100/85">
            Same wildcrafted Jamaican base, four different jobs. Every jar is made to order in small
            batches and ships cold-packed.
          </p>
          <ul className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-sand-100/80">
            {["Vegan & gluten-free", "No added sugar", "No fillers or gelatine", "3 jars ship free"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-gold-300" /> {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-page grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 80} className="h-full">
              <ProductCard product={product} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="pb-20 sm:pb-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Side by side"
            title="Which one is for you?"
            copy="If you're only buying one, start with Alkaline Me. If you're buying three, this is how most people split it."
          />

          <Reveal className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-sand-300">
                  <th className="py-4 pr-6 font-semibold">Flavour</th>
                  <th className="py-4 pr-6 font-semibold">Best for</th>
                  <th className="py-4 pr-6 font-semibold">Tastes like</th>
                  <th className="py-4 pr-6 font-semibold">Key ingredients</th>
                  <th className="py-4 pr-6 font-semibold">Price</th>
                  <th className="py-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug} className="border-b border-sand-200 align-top">
                    <td className="py-5 pr-6">
                      <span className="flex items-center gap-2.5 font-semibold">
                        <span
                          className="size-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: p.accent }}
                        />
                        {p.name}
                      </span>
                    </td>
                    <td className="py-5 pr-6 text-abyss-800/75">{p.bestFor}</td>
                    <td className="py-5 pr-6 text-abyss-800/75">{p.taste}</td>
                    <td className="py-5 pr-6 text-abyss-800/75">{p.ingredients.join(", ")}</td>
                    <td className="py-5 pr-6 font-display text-lg whitespace-nowrap">
                      {formatPrice(p.sizes[0].price)}
                      <span className="ml-1 font-sans text-xs text-abyss-800/50">
                        / {p.sizes[0].ounces} oz
                      </span>
                    </td>
                    <td className="py-5 whitespace-nowrap">
                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center gap-1.5 font-semibold text-reef-600"
                      >
                        <span className="link-underline">View</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand-100/70 py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Before you order" title="Good things to know" />
          <Reveal delay={100}>
            <FaqAccordion items={faqs.slice(1, 6)} defaultOpen={null} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
