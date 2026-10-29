import Link from "next/link";
import { FlavourShowcase } from "@/components/flavour-showcase";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { StatsPanel } from "@/components/stats-panel";
import { Testimonials } from "@/components/testimonials";
import { ArrowRight, Leaf, Shield, Wave } from "@/components/icons";
import { ingredientLibrary } from "@/lib/ingredients";

/**
 * The homepage: the hero, the four flavours straight underneath, then the
 * numbers, our commitments and what customers say. The brand story, the
 * Doctor Bird and the sea moss explainer live on their own pages.
 */

const commitments = [
  {
    icon: Shield,
    title: "Full transparency",
    copy: "Every ingredient is listed in plain language on the label. If it doesn't have a clear purpose, it doesn't go in the jar.",
  },
  {
    icon: Leaf,
    title: "Consistent quality",
    copy: "The same wildcrafted moss, the same careful method and the same attention to detail in every single jar, no matter how many we make.",
  },
  {
    icon: Wave,
    title: "Honest guidance",
    copy: "Sea moss is a nourishing whole food, not a cure-all. We'll always give you clear, honest information so you can choose what's right for you.",
  },
];

const next = [
  {
    href: "/sea-moss",
    eyebrow: "Sea Moss 101",
    title: "What it is and why the minerals matter",
    copy: "A sea vegetable with no roots at all, harvested for fourteen thousand years.",
  },
  {
    href: "/natures-wisdom",
    eyebrow: "Nature's Wisdom",
    title: "Every fruit, herb and root, explained",
    copy: "What each one is best for, and which jar it lives in.",
  },
  {
    href: "/products",
    eyebrow: "The flavours",
    title: "Four jars, one wildcrafted base",
    copy: "Pick the one that matches what your body is asking for.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ---------------- The flavours ---------------- */}
      <FlavourShowcase />

      {/* ---------------- By the numbers ---------------- */}
      <StatsPanel ingredientCount={ingredientLibrary.length} />

      {/* ---------------- Our aim ---------------- */}
      {/* Coral ground with deep-teal cards. The coral runs from flame-600 to
          flame-550 so white text keeps AA contrast; the brighter flame-500
          glows in from the corners, away from the text. */}
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
            <p className="eyebrow text-white/85">Our aim</p>
            <h2 className="mt-4 text-4xl leading-[1.08] sm:text-5xl">Our commitment to you</h2>
            <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
              Small-batch production, traceable ingredients, and a standard of quality we do not
              compromise on.
            </p>
          </Reveal>
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {commitments.map(({ icon: Icon, title, copy }, i) => (
              <Reveal
                key={title}
                as="li"
                delay={i * 80}
                className="rounded-[var(--radius-lg)] border border-white/15 bg-[linear-gradient(160deg,var(--color-abyss-700)_0%,var(--color-abyss-800)_100%)] p-8 shadow-[0_28px_60px_-24px_rgba(3,51,58,0.7)] transition-transform duration-500 hover:-translate-y-1"
              >
                <span className="grid size-12 place-items-center rounded-full bg-flame-500 text-white shadow-[0_10px_24px_-8px_rgba(255,111,60,0.9)]">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-xl text-white">{title}</h3>
                <p className="mt-2.5 leading-relaxed text-sand-100/85">{copy}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="py-24 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="From the fridge door"
            title="What customers actually say"
            align="center"
          />
          <div className="mt-14">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ---------------- Where to go next ---------------- */}
      <section className="bg-sand-100/70 pb-24 sm:pb-28">
        <div className="container-page pt-24 sm:pt-28">
          <SectionHeading eyebrow="Where to go next" title="Take it one step deeper" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {next.map((n, i) => (
              <Reveal key={n.href} delay={i * 80} className="h-full">
                <Link
                  href={n.href}
                  className="card group flex h-full flex-col p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <p className="eyebrow text-flame-600">{n.eyebrow}</p>
                  <h3 className="mt-4 text-xl leading-snug">{n.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-abyss-800/70">{n.copy}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-reef-600">
                    Open
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
