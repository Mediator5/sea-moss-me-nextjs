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
        className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(20,84,93,0.96)_0%,rgba(23,97,107,0.92)_38%,rgba(30,116,127,0.78)_62%,rgba(38,128,140,0.5)_82%,rgba(49,139,152,0.28)_100%)] md:bg-[linear-gradient(100deg,rgba(20,84,93,0.94)_0%,rgba(23,97,107,0.9)_30%,rgba(30,116,127,0.74)_52%,rgba(38,128,140,0.42)_70%,transparent_88%)]"
      />

      <div className="container-page relative grid min-h-[32rem] items-center py-16 sm:min-h-[34rem] sm:py-24 lg:min-h-[38rem]">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-sand-50/25 bg-[rgba(8,42,48,0.28)] px-4 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-sand-50 uppercase backdrop-blur sm:text-[11px] sm:tracking-[0.14em]">
            <span className="size-1.5 rounded-full bg-gold-400" />
            Certified organic · Wildcrafted in Jamaica
          </p>

          <h1 className="mt-6 text-balance font-display text-[clamp(2.125rem,10vw,3rem)] leading-[1.06] uppercase [text-shadow:0_2px_14px_rgba(8,42,48,0.45)] sm:mt-7 sm:text-6xl sm:leading-[1.02] md:[text-shadow:0_3px_20px_rgba(8,42,48,0.42)] lg:text-[4.25rem]">
            Peak health is{" "}
            <br className="hidden sm:inline" />
            <span className="text-gold-400">true wealth</span>.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-sand-50 [text-shadow:0_1px_10px_rgba(8,42,48,0.5)] sm:mt-7 sm:text-lg md:[text-shadow:0_1px_12px_rgba(8,42,48,0.45)]">
            Wildcrafted Jamaican sea moss, blended whole with real superfoods. Rich in iodine,
            magnesium and zinc to support skin, thyroid and gut health.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
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
