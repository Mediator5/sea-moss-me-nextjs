import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Spark, Wave } from "./icons";
import { LogoMark } from "./wordmark";
import { Reveal } from "./reveal";

/**
 * Building blocks for the stand-alone feature pages (Our story, the Doctor
 * Bird, What sea moss is). Same visual language as the homepage's "By the
 * numbers" panel and "Our commitment" section: deep teal with a blueprint
 * grid, mono labels with a live dot, coral accents, and a coral strip with
 * teal cards to move on to the next page.
 */

/** Mono eyebrow with the pulsing coral dot. */
export function LiveEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] text-flame-300 uppercase">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-flame-500 opacity-70" />
        <span className="relative inline-flex size-2 rounded-full bg-flame-500" />
      </span>
      {children}
    </p>
  );
}

/** Blueprint grid + drifting coral and teal light. Place inside a `relative isolate` parent. */
export function DeepBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(253,248,240,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(253,248,240,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -top-40 -left-32 -z-10 size-[34rem] rounded-full bg-flame-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -right-40 -bottom-48 -z-10 size-[36rem] rounded-full bg-reef-500/30 blur-3xl [animation-delay:-9s]"
      />
    </>
  );
}

/** Page header on deep teal. */
export function FeatureHero({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-abyss-800)_0%,var(--color-abyss-950)_100%)] pt-20 pb-20 text-sand-50 sm:pt-24 sm:pb-24">
      <DeepBackdrop />
      <div className="container-page">
        <div className="max-w-3xl">
          <LiveEyebrow>{eyebrow}</LiveEyebrow>
          <h1 className="mt-5 text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">{title}</h1>
          {copy && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-sand-100/80 sm:text-xl">
              {copy}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

const pages = [
  {
    href: "/our-story",
    eyebrow: "Our story",
    title: "A Jamaican tradition, kept intact",
    copy: "Where Sea Moss Me began, and the standard every jar is still made to.",
    icon: Leaf,
  },
  {
    href: "/doctor-bird",
    eyebrow: "The bird on every jar",
    title: "Meet the Doctor Bird",
    copy: "The hummingbird found only in Jamaica, and why it's on our label.",
    icon: Spark,
  },
  {
    href: "/sea-moss",
    eyebrow: "Sea Moss 101",
    title: "A whole food from the sea",
    copy: "What sea moss is, why its minerals matter, and how to take it.",
    icon: Wave,
  },
] as const;

/** Coral strip with teal cards linking to the other two feature pages and the shop. */
export function ExploreMore({ current }: { current: (typeof pages)[number]["href"] }) {
  const others = pages.filter((p) => p.href !== current);
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,var(--color-flame-600)_0%,var(--color-flame-550)_100%)] py-24 text-white sm:py-28">
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -top-48 -right-40 -z-10 size-[36rem] rounded-full bg-flame-500/70 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -bottom-56 -left-40 -z-10 size-[34rem] rounded-full bg-gold-500/35 blur-3xl [animation-delay:-9s]"
      />
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-white/85">Keep exploring</p>
          <h2 className="mt-4 text-4xl leading-[1.08] sm:text-5xl">There&apos;s more to the jar</h2>
        </Reveal>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {others.map(({ href, eyebrow, title, copy, icon: Icon }, i) => (
            <Reveal key={href} as="li" delay={i * 80} className="h-full">
              <Link
                href={href}
                className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-white/15 bg-[linear-gradient(160deg,var(--color-abyss-700)_0%,var(--color-abyss-800)_100%)] p-8 shadow-[0_28px_60px_-24px_rgba(3,51,58,0.7)] transition-transform duration-500 hover:-translate-y-1"
              >
                <span className="grid size-12 place-items-center rounded-full bg-flame-500 text-white shadow-[0_10px_24px_-8px_rgba(255,111,60,0.9)]">
                  <Icon className="size-6" />
                </span>
                <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-sand-100/55 uppercase">
                  {eyebrow}
                </p>
                <h3 className="mt-2 text-xl text-white">{title}</h3>
                <p className="mt-2.5 leading-relaxed text-sand-100/85">{copy}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-flame-300">
                  Open
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
          <Reveal as="li" delay={others.length * 80} className="h-full">
            <Link
              href="/products"
              className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-white/25 bg-white/10 p-8 backdrop-blur transition-transform duration-500 hover:-translate-y-1"
            >
              <LogoMark tone="light" className="h-12 self-start" />
              <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-white/70 uppercase">
                The flavours
              </p>
              <h3 className="mt-2 text-xl text-white">Find your jar</h3>
              <p className="mt-2.5 leading-relaxed text-white/90">
                Four flavours, one wildcrafted Jamaican base.
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-white">
                Shop now
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
