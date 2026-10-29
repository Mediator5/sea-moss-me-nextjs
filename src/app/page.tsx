import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { StatsPanel } from "@/components/stats-panel";
import { Testimonials } from "@/components/testimonials";
import { LogoMark } from "@/components/wordmark";
import { ArrowRight, Leaf, Shield, Spark, Wave } from "@/components/icons";
import { ingredientLibrary } from "@/lib/ingredients";

/**
 * The homepage has one job: say where this comes from, what it is, and what we
 * promise. No jars, no prices, no ingredient library — every one of those has
 * its own page, and repeating them here only made the page longer.
 */

const story = [
  {
    icon: Leaf,
    title: "Wild-harvested in Jamaica",
    copy: "Hand-picked from the rocks along Jamaica's coastline, where it grows naturally in clean, mineral-rich seawater. Never farmed, never pool-grown.",
  },
  {
    icon: Spark,
    title: "Whole food, nothing added",
    copy: "We blend whole sea moss with real fruits, herbs and roots. No syrups, no concentrates, no artificial colours — just ingredients you can recognise.",
  },
  {
    icon: Wave,
    title: "Fresh, small-batch quality",
    copy: "Every batch is made in small quantities and carefully watched from start to finish, so each jar reaches you fresh and at its best.",
  },
];

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

      {/* ---------------- Our story ---------------- */}
      <section id="story" className="py-24 sm:py-28">
        <div className="container-page grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl sm:aspect-square">
              <Image
                src="/images/origin.jpg"
                alt="Hands lifting wildcrafted sea moss from clear water on the Jamaican coast"
                width={1600}
                height={1067}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,86,95,0.85),rgba(20,86,95,0.05)_55%)]"
              />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="font-display text-2xl text-sand-50 italic">
                  &ldquo;Real ingredients. No shortcuts.&rdquo;
                </p>
                <p className="mt-2 text-xs tracking-[0.16em] text-sand-100/85 uppercase">
                  Our family standard since day one
                </p>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Our story"
              title={
                <>
                  A Jamaican tradition,
                  <br className="hidden sm:block" /> kept intact
                </>
              }
              copy="Long before the world called it a superfood, sea moss was a staple in Caribbean homes. Sea Moss Me grew out of that same tradition — prepared by hand for family, with sea moss from the same Jamaican coastline it still comes from today. We now make it for far more people, but the source, the method and the standard have not changed."
            />
            <Reveal delay={120}>
              <ul className="mt-9 space-y-5">
                {story.map(({ icon: Icon, title, copy }) => (
                  <li key={title} className="flex gap-4">
                    <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-full bg-flame-100 text-flame-600">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-abyss-800/70">{copy}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-2 font-semibold text-reef-600"
              >
                <span className="link-underline">Read our full story</span>
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- The Doctor Bird ---------------- */}
      <section className="relative overflow-hidden bg-reef-500 py-24 text-sand-50 sm:py-28">
        <div
          aria-hidden
          className="animate-drift pointer-events-none absolute -top-40 -right-32 size-[38rem] rounded-full bg-flame-500/10 blur-3xl"
        />
        <div className="container-page relative grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="text-center lg:text-left">
            <LogoMark tone="light" className="mx-auto h-40 lg:mx-0 lg:h-48" />
          </Reveal>

          <div>
            <SectionHeading
              tone="light"
              eyebrow="The bird on every jar"
              title="Meet the Doctor Bird"
              copy="The hummingbird on our label is found nowhere else on earth but Jamaica — the same island, the same coastline our sea moss is cut from. It weighs less than six grams and beats its wings around eighty times a second."
            />
            <Reveal delay={110}>
              <p className="mt-6 max-w-2xl leading-[1.8] text-sand-100/85">
                Small, precise, and unmistakably itself. Nothing wasted, nothing added, everything
                working. That is the standard we hold our jars to, and it is why the bird is on
                every one of them.
              </p>
              <Link
                href="/blog/the-doctor-bird"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-gold-300"
              >
                <span className="link-underline">Read its story</span>
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- What sea moss is ---------------- */}
      <section className="py-24 sm:py-28">
        <div className="container-page grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="What sea moss is"
              title="A whole food from the sea"
              copy="Sea moss is a nutrient-dense sea vegetable that grows wild on coastal rocks in warm, clear Caribbean water. With no roots, it draws its minerals directly from the ocean around it."
            />
            <Reveal delay={110}>
              <p className="mt-6 leading-[1.8] text-abyss-800/80">
                Ours is hand-cut from the rock, dried naturally in the sun, then soaked and blended
                whole — so you get everything the sea put into it, with nothing stripped away.
                It&apos;s a tradition Caribbean families have trusted for generations, and one
                people have practised for thousands of years.
              </p>
              <Link href="/sea-moss" className="btn btn-ghost mt-8">
                Read Sea Moss 101 <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={120} className="order-first lg:order-last">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/ingredients.jpg"
                alt="Dried sea moss with turmeric, ginger, moringa and berries on a warm surface"
                width={1600}
                height={1200}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

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
