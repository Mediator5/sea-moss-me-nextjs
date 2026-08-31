import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IngredientExplorer } from "@/components/ingredient-explorer";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "@/components/icons";
import { ingredientLibrary } from "@/lib/ingredients";

export const metadata: Metadata = {
  title: "Nature's Wisdom",
  description:
    "Nature's Wisdom — every fruit, herb and root we formulate with. What each one is best for, the compounds behind the claim, and which Sea Moss Me jar it lives in.",
  alternates: { canonical: "/natures-wisdom" },
};

export default function IngredientsPage() {
  const inJars = ingredientLibrary.filter((i) => i.inJars.length > 0).length;
  const pipeline = ingredientLibrary.filter((i) => i.pipeline).length;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-reef-500 pt-20 pb-24 text-sand-50">
        <Image
          src="/images/ingredients.jpg"
          alt=""
          aria-hidden
          width={1600}
          height={1200}
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(49,139,152,0.96)_0%,rgba(49,139,152,0.9)_50%,rgba(49,139,152,0.7)_100%)]"
        />
        <div className="container-page relative">
          <p className="eyebrow text-gold-300">Nature&apos;s Wisdom</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.04] sm:text-6xl">
            Every ingredient, and exactly why it&apos;s in there
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sand-100/85">
            We don&apos;t put anything in a jar we can&apos;t explain. This is the whole library,
            grouped into superfoods, fruits, berries, and herbs &amp; roots — what each one is best
            for, and the compound behind the claim. Filter it by what you&apos;re actually trying to
            fix.
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { n: ingredientLibrary.length, label: "Ingredients documented" },
              { n: inJars, label: "In jars right now" },
              { n: pipeline, label: "In development" },
            ].map((s) => (
              <div key={s.label}>
                <dd className="font-display text-3xl text-gold-300">{s.n}</dd>
                <dt className="mt-1 text-[11px] tracking-[0.14em] text-sand-100/80 uppercase">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-page">
          <IngredientExplorer />
        </div>
      </section>

      <section className="border-t border-sand-200 bg-sand-100/70 py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-flame-600">Start with the base</p>
            <h2 className="mt-4 text-4xl leading-tight">
              Every one of these is folded into wildcrafted sea moss
            </h2>
            <p className="mt-5 leading-relaxed text-abyss-800/70">
              The fruits and herbs are what make each jar distinct. The sea moss underneath them is
              what makes it work — and it deserves its own explanation.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/sea-moss" className="btn btn-primary">
                Read Sea Moss 101 <ArrowRight className="size-4" />
              </Link>
              <Link href="/products" className="btn btn-ghost">
                See the four jars
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
