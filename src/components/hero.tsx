import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./icons";

/**
 * The homepage hero. Teal backdrop over the coastline photograph, with the
 * headline and standfirst set in light tones.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-reef-500 text-sand-50">
      <Image
        src="/images/hero.jpg"
        alt="Sea moss gel in a glass jar on a sunlit rock above the Jamaican shoreline"
        width={2000}
        height={1125}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
      />
      {/* teal scrim so the photograph reads softly behind the text */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(49,139,152,0.96)_0%,rgba(49,139,152,0.88)_30%,rgba(49,139,152,0.4)_55%,transparent_72%)] md:bg-[linear-gradient(100deg,rgba(49,139,152,0.94)_0%,rgba(49,139,152,0.85)_28%,rgba(49,139,152,0.25)_50%,transparent_66%)]"
      />

      <div className="container-page relative grid min-h-[34rem] items-center py-20 sm:py-24 lg:min-h-[38rem]">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-sand-50/25 bg-sand-50/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-sand-50 uppercase backdrop-blur">
            <span className="size-1.5 rounded-full bg-gold-400" />
            Certified organic · Wildcrafted in Jamaica
          </p>

          <h1 className="mt-7 font-display text-5xl leading-[1.02] uppercase sm:text-6xl lg:text-[4.25rem]">
            Peak health is
            <br />
            <span className="text-gold-400">true wealth</span>.
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-sand-100/85">
            Wildcrafted Jamaican sea moss, blended whole with real superfoods. Rich in iodine,
            magnesium and zinc to support skin, thyroid and gut health.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/sea-moss" className="btn btn-primary">
              What sea moss is <ArrowRight className="size-4" />
            </Link>
            <Link href="/about" className="btn btn-ghost-light">
              Our story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
