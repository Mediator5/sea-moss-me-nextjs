import type { Metadata } from "next";
import Link from "next/link";
import { CountUp } from "@/components/count-up";
import { DeepBackdrop, ExploreMore, LiveEyebrow } from "@/components/feature-page";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/wordmark";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Meet the Doctor Bird",
  description:
    "The hummingbird on every Sea Moss Me jar is found nowhere on earth but Jamaica — the same island our sea moss is cut from.",
  alternates: { canonical: "/doctor-bird" },
};

/** Figures taken from the copy: Jamaica only, under six grams, ~80 wingbeats a second. */
const facts = [
  { to: 1, prefix: "", unit: "island", label: "on earth where it lives — Jamaica", tag: "Range" },
  { to: 6, prefix: "<", unit: "grams", label: "is all it weighs", tag: "Weight" },
  { to: 80, prefix: "~", unit: "/ sec", label: "wingbeats, every second", tag: "Wingbeat" },
];

export default function DoctorBirdPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-abyss-800)_0%,var(--color-abyss-950)_100%)] pt-20 pb-24 text-sand-50 sm:pt-24 sm:pb-28">
        <DeepBackdrop />
        <div className="container-page grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="relative text-center lg:text-left">
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame-500/25 blur-3xl lg:left-[40%]"
            />
            <LogoMark tone="light" className="animate-float mx-auto h-56 lg:mx-0 lg:h-72" />
          </Reveal>

          <div>
            <LiveEyebrow>The bird on every jar</LiveEyebrow>
            <h1 className="mt-5 text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
              Meet the <span className="text-flame-400">Doctor Bird</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-sand-100/80 sm:text-xl">
              The hummingbird on our label is found nowhere else on earth but Jamaica — the same
              island, the same coastline our sea moss is cut from. It weighs less than six grams
              and beats its wings around eighty times a second.
            </p>
            <p className="mt-5 max-w-2xl leading-[1.8] text-sand-100/75">
              Small, precise, and unmistakably itself. Nothing wasted, nothing added, everything
              working. That is the standard we hold our jars to, and it is why the bird is on every
              one of them.
            </p>
            <Link
              href="/blog/the-doctor-bird"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-flame-300"
            >
              <span className="link-underline">Read its story</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-abyss-950 py-20 text-sand-50 sm:py-24">
        <DeepBackdrop />
        <div className="container-page">
          <ul className="grid gap-5 md:grid-cols-3">
            {facts.map((f, i) => (
              <Reveal
                key={f.tag}
                as="li"
                delay={i * 100}
                className="rounded-2xl border border-sand-50/10 bg-sand-50/[0.03] p-7 transition-colors duration-500 hover:border-flame-400/40"
              >
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-sand-100/45 uppercase">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{f.tag}</span>
                </div>
                <p className="mt-6 bg-[linear-gradient(120deg,var(--color-flame-400),var(--color-gold-400))] bg-clip-text text-6xl font-light tracking-tight text-transparent">
                  {f.prefix}
                  <CountUp to={f.to} duration={1800} delay={200 + i * 150} />
                  <span className="ml-2 text-xl text-sand-100/60">{f.unit}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sand-100/75">{f.label}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ExploreMore current="/doctor-bird" />
    </>
  );
}
