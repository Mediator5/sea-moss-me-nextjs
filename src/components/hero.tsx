import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./icons";

/**
 * The homepage hero. Warm cream scrim over the coastline photograph, with the
 * headline and standfirst set in the brand teal.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Sea moss gel in a glass jar on a sunlit rock above the Jamaican shoreline"
        width={2000}
        height={1125}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
      />
      {/* legibility scrim — warm, so it reads as part of the photograph */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(253,250,244,0.97)_0%,rgba(253,250,244,0.92)_32%,rgba(253,250,244,0.55)_52%,rgba(253,250,244,0.06)_72%)] md:bg-[linear-gradient(100deg,rgba(253,250,244,0.96)_0%,rgba(253,250,244,0.88)_30%,rgba(253,250,244,0.35)_50%,transparent_66%)]"
      />

      <div className="container-page relative grid min-h-[34rem] items-center py-20 sm:py-24 lg:min-h-[38rem]">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-abyss-900/15 bg-sand-50/80 px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-abyss-800 uppercase backdrop-blur">
            <span className="size-1.5 rounded-full bg-flame-500" />
            Certified organic · Wildcrafted in Jamaica
          </p>

          <h1 className="mt-7 text-5xl leading-[1.02] text-reef-500 sm:text-6xl lg:text-[4.25rem]">
            Peak health is
            <br />
            <span className="text-flame-500 italic">true wealth</span>.
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-reef-500">
            Wildcrafted Jamaican sea moss, blended whole with real superfoods. Rich in iodine,
            magnesium and zinc to support skin, thyroid and gut health.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/sea-moss" className="btn btn-primary">
              What sea moss is <ArrowRight className="size-4" />
            </Link>
            <Link href="/about" className="btn btn-ghost bg-sand-50/70 backdrop-blur">
              Our story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
