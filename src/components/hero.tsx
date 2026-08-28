import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, Truck } from "./icons";

const trust = [
  { icon: Leaf, label: "100% certified organic" },
  { icon: Shield, label: "Wildcrafted, never pool-grown" },
  { icon: Truck, label: "Free shipping on 3+ jars" },
];

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

      <div className="container-page relative grid min-h-[38rem] items-center py-20 sm:py-24 lg:min-h-[42rem] lg:py-28">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-abyss-900/15 bg-sand-50/80 px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-abyss-800 uppercase backdrop-blur">
            <span className="size-1.5 rounded-full bg-flame-500" />
            Certified organic · Wildcrafted in Jamaica
          </p>

          <h1 className="mt-7 text-5xl leading-[1.02] text-abyss-950 sm:text-6xl lg:text-[4.25rem]">
            Peak health is
            <br />
            <span className="text-flame-600 italic">true wealth</span>.
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-abyss-800/85">
            Hand-harvested sea moss from Jamaica&apos;s clear coastal water, blended in small
            batches with real superfoods. Up to 92 minerals and vitamins, no fillers, no shortcuts.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/products" className="btn btn-primary">
              Shop the flavours <ArrowRight className="size-4" />
            </Link>
            <Link href="/about" className="btn btn-ghost bg-sand-50/70 backdrop-blur">
              How it&apos;s made
            </Link>
          </div>

          <dl className="mt-11 flex flex-wrap gap-x-8 gap-y-3">
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm text-abyss-800/80">
                <Icon className="size-5 text-flame-600" />
                <dt>{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
