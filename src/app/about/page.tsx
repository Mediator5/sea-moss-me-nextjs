import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { LogoMark } from "@/components/wordmark";
import { ArrowRight, Leaf, Shield, Spark, Wave } from "@/components/icons";
import { process, getPost } from "@/lib/content";
import { philosophy } from "@/lib/learn";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Sea Moss Me was founded on one idea: eat from the earth, to heal from within. Where our sea moss comes from, the standard we hold it to, and the Doctor Bird on every jar.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Leaf,
    title: "Wildcrafted or nothing",
    copy: "We only buy moss cut by hand from open rock. Pool-grown moss is cheaper and we have never once been tempted.",
  },
  {
    icon: Shield,
    title: "Nothing hidden",
    copy: "Every ingredient is on the label in plain words. If you cannot pronounce it, it is not in the jar.",
  },
  {
    icon: Spark,
    title: "Made in small batches",
    copy: "We make what we can sell fresh. It limits how fast we grow, and that is a trade we are happy with.",
  },
  {
    icon: Wave,
    title: "Rooted in Jamaica",
    copy: "The moss, the fruit and the hands that harvest both come from the same island. That is the whole supply chain.",
  },
];

/** The long-form pieces live on the blog now — About just points at them. */
const reading = [
  "the-doctor-bird",
  "how-our-sea-moss-is-harvested",
  "what-sea-moss-is-good-for",
];

export default function AboutPage() {
  const posts = reading.map((slug) => getPost(slug)!).filter(Boolean);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden bg-reef-500 pt-20 pb-24 text-sand-50">
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
          className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(20,86,95,0.96)_0%,rgba(31,120,132,0.9)_45%,rgba(49,139,152,0.62)_100%)]"
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
      <section className="py-20 sm:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading eyebrow="Why we exist" title="Before laboratories, there was the earth" />
          <Reveal delay={90} className="space-y-5 text-[1.0625rem] leading-[1.85] text-abyss-800/85">
            {philosophy.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              That belief is rooted in Jamaica — in its people, its traditions, and two symbols we
              put on every jar: a bird found nowhere else on the planet, and a sea vegetable that
              has quietly sustained Caribbean households for generations.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Values ---------------- */}
      <section className="bg-sand-100/70 py-20 sm:py-24">
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
                    i % 2 === 0 ? "bg-flame-100 text-flame-600" : "bg-reef-100/12 text-reef-600"
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

      {/* ---------------- The Doctor Bird ---------------- */}
      <section
        id="doctor-bird"
        className="relative scroll-mt-24 overflow-hidden bg-reef-500 py-20 text-sand-50 sm:py-24"
      >
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
              title="The Doctor Bird"
              copy="A hummingbird found nowhere else on earth but Jamaica — the same island, the same waters as our sea moss. It appears on the nation's currency, its coat of arms and its passport."
            />
            <Reveal delay={100}>
              <Link
                href="/blog/the-doctor-bird"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-gold-300"
              >
                <span className="link-underline">Read the full story</span>
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section id="process" className="scroll-mt-24 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it's made"
            title="Four steps, no industrial shortcuts"
            copy="Cut by hand from open rock on the south coast, dried in sun and salt wind, rinsed and soaked in spring water, blended whole in batches one person can watch."
            align="center"
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.step} as="li" delay={i * 90} className="card p-7">
                <span className="font-display text-4xl text-flame-500">{step.step}</span>
                <h3 className="mt-4 text-lg">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-abyss-800/70">{step.copy}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10 text-center">
            <Link href="/blog/how-our-sea-moss-is-harvested" className="btn btn-ghost">
              How it&apos;s harvested, in full <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Read more ---------------- */}
      <section className="bg-sand-100/70 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Keep reading"
            title="The longer versions live on the blog"
            copy="We would rather explain things properly than cram them onto one page."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="card group flex h-full flex-col p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <p className="eyebrow text-flame-600">{post.category}</p>
                  <h3 className="mt-4 text-xl leading-snug">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-abyss-800/70">{post.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-reef-600">
                    Read it
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-20 text-center sm:py-24">
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
