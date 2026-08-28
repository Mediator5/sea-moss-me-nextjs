import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { StatCounter } from "@/components/stat-counter";
import { LogoMark } from "@/components/wordmark";
import { ArrowRight, Leaf, Shield, Spark, Wave } from "@/components/icons";
import { process } from "@/lib/content";
import { doctorBird, philosophy } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Sea Moss Me was founded on one idea: eat from the earth, to heal from within. The story of our Jamaican sourcing, our standards, and the Doctor Bird on every jar.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Leaf,
    title: "Wildcrafted or nothing",
    copy: "We only buy moss cut by hand from open rock. Pool-grown moss is cheaper and we've never once been tempted.",
  },
  {
    icon: Shield,
    title: "Nothing hidden",
    copy: "Every ingredient is on the label in plain words. If you can't pronounce it, it isn't in the jar.",
  },
  {
    icon: Spark,
    title: "Made in small batches",
    copy: "We make what we can sell fresh. It limits how fast we grow, and that's a trade we're happy with.",
  },
  {
    icon: Wave,
    title: "Rooted in Jamaica",
    copy: "The moss, the fruit and the hands that harvest both come from the same island. That's the whole supply chain.",
  },
];

const benefits = [
  {
    title: "Digestion",
    copy: "Sea moss mucilage is soothing and prebiotic — it feeds the bacteria your gut already relies on.",
  },
  {
    title: "Everyday energy",
    copy: "A dense mineral profile fills the gaps a modern diet leaves, without stimulants or a crash.",
  },
  {
    title: "Skin and hair",
    copy: "Sulphur, zinc and vitamin-rich pairings are why sea moss turns up in skincare as well as smoothies.",
  },
  {
    title: "Immune support",
    copy: "Especially in blends built around elderberry, beetroot and other pigment-rich fruit.",
  },
  {
    title: "Thyroid function",
    copy: "Naturally iodine-rich. Enough that if you manage a thyroid condition, you should talk to your doctor first.",
  },
  {
    title: "Recovery",
    copy: "Magnesium, potassium and trace minerals are the boring backbone of feeling like yourself again.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden bg-reef-500 pt-20 pb-28 text-sand-50">
        <Image
          src="/images/origin.jpg"
          alt=""
          aria-hidden
          width={1600}
          height={1067}
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(3,51,58,0.95)_0%,rgba(3,51,58,0.88)_45%,rgba(3,51,58,0.6)_100%)]"
        />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow text-gold-300">Nature&apos;s notes</p>
            <h1 className="mt-5 max-w-2xl text-5xl leading-[1.03] sm:text-6xl">
              {philosophy.headline}
            </h1>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-sand-100/85">
            That is the whole philosophy Sea Moss Me was founded on — and the standard every jar we
            make is held to.
          </p>
        </div>
      </section>

      {/* ---------------- Philosophy ---------------- */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading eyebrow="Why we exist" title="Before laboratories, there was the earth" />
          <Reveal delay={90} className="space-y-5 text-[1.0625rem] leading-[1.85] text-abyss-800/85">
            {philosophy.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              That belief is rooted in Jamaica — in its people, its traditions, and two symbols we
              chose to put on every jar: a bird found nowhere else on the planet, and a sea
              vegetable that has quietly sustained Caribbean households for generations.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- The Doctor Bird ---------------- */}
      <section
        id="doctor-bird"
        className="relative scroll-mt-24 overflow-hidden bg-reef-500 py-20 text-sand-50 sm:py-28"
      >
        <div
          aria-hidden
          className="animate-drift pointer-events-none absolute -top-40 -right-32 size-[38rem] rounded-full bg-flame-500/10 blur-3xl"
        />
        <div className="container-page relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm rounded-2xl border border-sand-100/12 bg-sand-100/[0.04] p-12 text-center">
              <LogoMark tone="light" className="mx-auto h-44" />
              <p className="mt-8 font-display text-xl leading-snug text-sand-50 italic">
                &ldquo;{doctorBird.taino}&rdquo;
              </p>
              <p className="mt-3 text-[11px] tracking-[0.16em] text-sand-100/85 uppercase">
                Taino tradition
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              tone="light"
              eyebrow="The bird on every jar"
              title="The Doctor Bird — found nowhere else on earth"
            />
            <Reveal delay={90} className="mt-6 space-y-4 leading-[1.8] text-sand-100/85">
              {doctorBird.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-sand-100/10 sm:grid-cols-2">
              {doctorBird.facts.map((f, i) => (
                <Reveal key={f.label} delay={i * 80} className="bg-reef-500 p-6">
                  <p className="font-display text-3xl text-gold-300">{f.stat}</p>
                  <p className="mt-1 text-[11px] font-semibold tracking-[0.12em] text-sand-100/85 uppercase">
                    {f.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-sand-100/85">{f.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Sourcing ---------------- */}
      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
              <Image
                src="/images/ingredients.jpg"
                alt="Fresh turmeric, ginger, spirulina, moringa, berries and dried sea moss"
                width={1600}
                height={1200}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Where it comes from"
              title="The south coast of Jamaica, by hand"
              copy="Our moss grows wild on rock in clear, moving water. It is cut by hand at the right size, and the holdfast is left behind so it grows back — the same way it has been harvested here for generations."
            />
            <Reveal delay={100}>
              <p className="mt-5 leading-relaxed text-abyss-800/75">
                From there it dries in open sun and salt wind, is rinsed clean, soaked in spring
                water with fresh lime, and blended in batches small enough that one person can watch
                every one of them. Fruits and roots go in whole, never as syrups or concentrates.
              </p>
              <p className="mt-4 leading-relaxed text-abyss-800/75">
                It takes longer and costs more. It is also the only reason the gel sets firm, tastes
                clean, and carries the mineral profile people come to sea moss for in the first
                place.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/sea-moss" className="btn btn-primary">
                  Read Sea Moss 101 <ArrowRight className="size-4" />
                </Link>
                <Link href="/natures-wisdom" className="btn btn-ghost">
                  Nature&apos;s Wisdom
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section id="process" className="scroll-mt-24 bg-reef-500 py-20 text-sand-50 sm:py-28">
        <div className="container-page">
          <SectionHeading
            tone="light"
            eyebrow="How it's made"
            title="Four steps, no industrial shortcuts"
            align="center"
          />
          <Reveal className="mt-12 overflow-hidden rounded-2xl">
            <Image
              src="/images/lineup.jpg"
              alt="The four Sea Moss Me flavours lined up against the Jamaican coast"
              width={2000}
              height={1125}
              sizes="(min-width: 1280px) 1200px, 96vw"
              className="aspect-21/9 w-full object-cover"
            />
          </Reveal>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl bg-sand-100/10 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.step} as="li" delay={i * 90} className="bg-reef-500 p-8">
                <span className="font-display text-4xl text-flame-300">{step.step}</span>
                <h3 className="mt-5 text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sand-100/80">{step.copy}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-16 grid grid-cols-2 gap-10 text-center sm:grid-cols-4">
            <StatCounter value={5} suffix="+" label="Years making it" />
            <StatCounter value={92} label="Minerals &amp; vitamins" />
            <StatCounter value={4} label="Flavours" />
            <StatCounter value={0} label="Fillers, ever" />
          </div>
        </div>
      </section>

      {/* ---------------- Values ---------------- */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we stand on"
            title="Four rules we don't bend"
            align="center"
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} as="li" delay={i * 80} className="card flex gap-5 p-8">
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-full ${
                    i % 2 === 0 ? "bg-flame-100 text-flame-600" : "bg-reef-100 text-reef-600"
                  }`}
                >
                  <v.icon className="size-6" />
                </span>
                <div>
                  <h3 className="text-xl">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-abyss-800/70">{v.copy}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Benefits ---------------- */}
      <section id="benefits" className="scroll-mt-24 bg-sand-100/70 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why people take it"
            title="What sea moss is actually good for"
            copy="Sea moss is a food, not a medicine — and anyone telling you it cures things is selling you something. Here's the honest version of what it supports."
            align="center"
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} as="li" delay={(i % 3) * 80} className="card p-7">
                <h3 className="text-lg">{b.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-abyss-800/70">{b.copy}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-abyss-800/50">
            These statements have not been evaluated by the Food and Drug Administration. This
            product is not intended to diagnose, treat, cure or prevent any disease. If you are
            pregnant, nursing or managing a medical condition, speak to your doctor first.
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-20 text-center sm:py-28">
        <div className="container-page">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-4xl leading-tight sm:text-5xl">
              Try one jar. That&apos;s the whole pitch.
            </h2>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/products" className="btn btn-primary">
                Shop the flavours <ArrowRight className="size-4" />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Ask us a question
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
