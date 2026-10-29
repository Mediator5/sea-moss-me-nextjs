import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DeepBackdrop, ExploreMore, FeatureHero } from "@/components/feature-page";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "What sea moss is",
  description:
    "Sea moss is a nutrient-dense sea vegetable that grows wild on Caribbean coastal rocks and draws its minerals straight from the ocean.",
  alternates: { canonical: "/what-is-sea-moss" },
};

export default function WhatIsSeaMossPage() {
  return (
    <>
      <FeatureHero
        eyebrow="What sea moss is"
        title={
          <>
            A whole food <span className="text-flame-400">from the sea</span>
          </>
        }
        copy="Sea moss is a nutrient-dense sea vegetable that grows wild on coastal rocks in warm, clear Caribbean water. With no roots, it draws its minerals directly from the ocean around it."
      />

      <section className="relative isolate overflow-hidden bg-abyss-950 py-24 text-sand-50 sm:py-28">
        <DeepBackdrop />
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-sand-50/10">
              <Image
                src="/images/ingredients.jpg"
                alt="Dried sea moss with turmeric, ginger, moringa and berries on a warm surface"
                width={1600}
                height={1200}
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={110}>
            <p className="font-mono text-[10px] tracking-[0.2em] text-sand-100/45 uppercase">
              From the rock to the jar
            </p>
            <p className="mt-4 text-xl leading-[1.7] text-sand-100/85">
              Ours is hand-cut from the rock, dried naturally in the sun, then soaked and blended
              whole — so you get everything the sea put into it, with nothing stripped away.
              It&apos;s a tradition Caribbean families have trusted for generations, and one people
              have practised for thousands of years.
            </p>
            <Link href="/sea-moss" className="btn btn-primary mt-9">
              Read Sea Moss 101 <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <ExploreMore current="/what-is-sea-moss" />
    </>
  );
}
