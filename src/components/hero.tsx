import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "./icons";

/**
 * The homepage hero. Teal-scrimmed rather than cream so the page opens in the
 * brand colour, with the tagline set in the wordmark's typeface.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-sand-50">
      <Image
        src="/images/hero.jpg"
        alt="Sea moss gel in a glass jar on a sunlit rock above the Jamaican shoreline"
        width={2000}
        height={1125}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
      />
      {/* Teal scrim — deep enough on the left to carry text, clearing to the photograph on the right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(20,86,95,0.96)_0%,rgba(31,120,132,0.92)_34%,rgba(49,139,152,0.62)_58%,rgba(49,139,152,0.18)_80%)]"
      />

      <div className="container-page relative grid min-h-[34rem] items-center py-20 sm:py-24 lg:min-h-[38rem]">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-sand-100/25 bg-sand-100/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-sand-100 uppercase backdrop-blur">
            <span className="size-1.5 rounded-full bg-flame-400" />
            Certified organic · Wildcrafted in Jamaica
          </p>

          <h1 className="mt-7 text-5xl leading-[1.03] sm:text-6xl lg:text-[4.5rem]">
            Peak health is
            <br />
            <span className="text-flame-400 italic">true wealth</span>.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-sand-100/90">
            Wildcrafted Jamaican sea moss, blended whole with real superfoods. Rich in iodine,
            magnesium and zinc to support skin, thyroid and gut health.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/sea-moss" className="btn btn-gold">
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
