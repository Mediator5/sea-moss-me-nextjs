import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { FaqAccordion } from "@/components/faq-accordion";
import { ArrowRight, Check, Close, Leaf, Shield, Spark, Wave } from "@/components/icons";
import {
  deficiencySigns,
  howToUse,
  mineralRoles,
  seaMossFacts,
  sourcingComparison,
} from "@/lib/learn";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sea Moss 101",
  description:
    "What sea moss actually is, why its mineral profile matters, how wildcrafted differs from pool-grown, and how to take it properly. An honest, jargon-free explainer.",
  alternates: { canonical: "/sea-moss" },
};

const contents = [
  { href: "#what", label: "What it is" },
  { href: "#minerals", label: "Why minerals matter" },
  { href: "#sourcing", label: "Wildcrafted vs pool-grown" },
  { href: "#facts", label: "Six things worth knowing" },
  { href: "#how", label: "How to take it" },
  { href: "#questions", label: "Common questions" },
];

export default function SeaMossPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Sea Moss 101 — what it is and why its minerals matter",
    description:
      "An honest explainer on sea moss: what the plant is, the minerals it carries, how wildcrafted differs from pool-grown, and how to take it.",
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/sea-moss`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(49,139,152,0.96)_0%,rgba(49,139,152,0.9)_45%,rgba(49,139,152,0.62)_100%)]"
        />
        <div className="container-page relative">
          <p className="eyebrow text-gold-300">Sea Moss 101</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.04] sm:text-6xl">
            The honest explainer on sea moss
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sand-100/85">
            Sea moss has had a strange decade. For most of its history it was an unglamorous
            Caribbean pantry staple. Then it hit the internet and became a miracle. The truth is
            somewhere more useful than either version — and it takes about eight minutes to explain.
          </p>

          <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
            {contents.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="rounded-full border border-sand-100/25 px-4 py-2 text-sm text-sand-100/90 transition hover:border-sand-100/60 hover:text-sand-50"
              >
                {c.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ---------------- What it is ---------------- */}
      <section id="what" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="First principles"
              title="A sea vegetable with no roots at all"
            />
            <Reveal delay={90} className="mt-6 space-y-4 text-[1.0625rem] leading-[1.8] text-abyss-800/85">
              <p>
                Sea moss is a nutrient-dense red algae that grows wild on coastal rocks in clean,
                moving ocean water. In Jamaica the common species is <em>Gracilaria</em> — the
                slender, golden-brown moss you&apos;ll see drying in the sun along the south coast.
              </p>
              <p>
                Unlike land plants, it has no true roots. It anchors to rock with a{" "}
                <strong className="text-abyss-900">holdfast</strong>, used purely for grip. Every
                nutrient it carries is absorbed directly through its fronds from the seawater around
                it.
              </p>
              <p>
                That single fact explains almost everything else about sea moss. Water quality is
                not a detail — it is the entire product. Cleaner, more mineral-rich water produces
                denser, richer moss. Moss grown in a tank and fed table salt produces exactly what
                you&apos;d expect.
              </p>
              <p>
                Soaked and blended, it becomes a neutral, faintly ocean-scented gel that thickens
                whatever you put it in. That gel texture comes from its natural mucilage — the same
                property that makes it soothing to the digestive tract.
              </p>
            </Reveal>
          </div>

          <Reveal delay={140} className="lg:sticky lg:top-28">
            <div className="card overflow-hidden">
              <div className="bg-reef-500 px-7 py-6 text-sand-50">
                <p className="eyebrow text-gold-300">The short version</p>
                <p className="mt-3 font-display text-2xl leading-snug">
                  A whole food with an unusually wide mineral profile — not a medicine, and not a
                  miracle.
                </p>
              </div>
              <ul className="divide-y divide-sand-200">
                {[
                  { label: "What it is", value: "Red algae (a sea vegetable)" },
                  { label: "Species we use", value: "Gracilaria, wildcrafted" },
                  { label: "Where ours grows", value: "South coast of Jamaica" },
                  { label: "Carries", value: "A broad spread of trace minerals" },
                  { label: "Best known for", value: "Iodine, magnesium, potassium, zinc, iron" },
                  { label: "Daily amount", value: "1–2 tablespoons" },
                  { label: "Keeps for", value: "3–4 weeks refrigerated" },
                ].map((row) => (
                  <li key={row.label} className="flex justify-between gap-4 px-7 py-3.5 text-sm">
                    <span className="text-abyss-800/60">{row.label}</span>
                    <span className="text-right font-medium">{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Minerals ---------------- */}
      <section id="minerals" className="scroll-mt-24 bg-sand-100/70 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why it matters"
            title="Minerals are essential, not optional"
            copy="The nervous, endocrine, digestive and immune systems all depend on minerals to function. When intake falls short, the effects are the ones modern life has quietly normalised."
          />

          <Reveal delay={80} className="mt-10 flex flex-wrap gap-3">
            {deficiencySigns.map((sign) => (
              <span
                key={sign}
                className="inline-flex items-center gap-2 rounded-full border border-flame-500/30 bg-flame-100/60 px-4 py-2 text-sm text-abyss-900"
              >
                <span className="size-1.5 rounded-full bg-flame-500" />
                {sign}
              </span>
            ))}
          </Reveal>

          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {mineralRoles.map((m, i) => (
              <Reveal key={m.mineral} as="li" delay={(i % 3) * 80} className="card h-full p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-2xl">{m.mineral}</h3>
                  <span className="text-[11px] font-semibold tracking-[0.12em] text-reef-600 uppercase">
                    {m.role}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-abyss-800/75">{m.copy}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120} className="mt-10 rounded-xl border border-sand-300 bg-white p-7 sm:p-9">
            <div className="flex gap-4">
              <Shield className="mt-0.5 size-6 shrink-0 text-reef-600" />
              <div>
                <h3 className="text-xl">About that mineral count</h3>
                <p className="mt-3 leading-relaxed text-abyss-800/80">
                  Sea moss is often said to carry up to 92 of the minerals and vitamins the
                  human body needs. It is a genuinely broad profile — but it is not a multivitamin
                  in a jar, and no honest seller should tell you it is. What sea moss offers is a
                  whole food, in a form your body recognises, that fills gaps a processed diet
                  leaves behind. That is a smaller claim than the internet makes, and a more useful
                  one.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Sourcing ---------------- */}
      <section id="sourcing" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="How to buy it well"
            title="Wildcrafted or pool-grown — the difference shows"
            copy="Two jars can look identical and be completely different products. The word that decides it rarely appears on the front of the label, so here is how to tell."
          />

          <Reveal delay={90} className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-sand-300">
                  <th className="py-4 pr-6 font-semibold">Signal</th>
                  <th className="py-4 pr-6 font-semibold text-reef-600">
                    <span className="inline-flex items-center gap-2">
                      <Check className="size-4" /> Wildcrafted
                    </span>
                  </th>
                  <th className="py-4 font-semibold text-abyss-800/50">
                    <span className="inline-flex items-center gap-2">
                      <Close className="size-4" /> Pool-grown
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sourcingComparison.map((row) => (
                  <tr key={row.signal} className="border-b border-sand-200 align-top">
                    <td className="py-5 pr-6 font-semibold">{row.signal}</td>
                    <td className="py-5 pr-6 text-abyss-800/80">{row.wild}</td>
                    <td className="py-5 text-abyss-800/55">{row.pool}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal delay={120} className="mt-8 rounded-xl bg-reef-500 p-8 text-sand-50 sm:p-10">
            <p className="eyebrow text-gold-300">Three questions to ask any seller</p>
            <ol className="mt-5 grid gap-5 sm:grid-cols-3">
              {[
                "Is it wildcrafted or pool-grown?",
                "Where exactly was it harvested?",
                "What else is in the jar?",
              ].map((q, i) => (
                <li key={q} className="flex gap-3">
                  <span className="font-display text-3xl text-gold-500/70">0{i + 1}</span>
                  <p className="mt-1 text-sm leading-relaxed text-sand-100/90">{q}</p>
                </li>
              ))}
            </ol>
            <p className="mt-7 text-sm leading-relaxed text-sand-100/80">
              We answer all three on every jar: wildcrafted, hand-cut on the south coast of Jamaica,
              and nothing in the jar but sea moss, spring water and whole superfoods.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Facts ---------------- */}
      <section id="facts" className="scroll-mt-24 bg-sand-100/70 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Worth knowing"
            title="Six things about sea moss most people don't know"
            align="center"
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {seaMossFacts.map((fact, i) => (
              <Reveal key={fact.title} as="li" delay={(i % 3) * 80} className="card h-full p-7">
                <span
                  className={`grid size-11 place-items-center rounded-full ${
                    i % 3 === 0
                      ? "bg-flame-100 text-flame-600"
                      : i % 3 === 1
                        ? "bg-reef-100 text-reef-600"
                        : "bg-gold-200 text-gold-600"
                  }`}
                >
                  {i % 3 === 0 ? (
                    <Wave className="size-5" />
                  ) : i % 3 === 1 ? (
                    <Leaf className="size-5" />
                  ) : (
                    <Spark className="size-5" />
                  )}
                </span>
                <h3 className="mt-5 text-xl leading-snug">{fact.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-abyss-800/75">{fact.copy}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- How to take it ---------------- */}
      <section id="how" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Everyday practice"
            title="How to actually take it"
            copy="It doesn't need to be a ritual to work. It needs to be consistent."
          >
            <Link href="/products" className="btn btn-primary mt-8">
              Pick a jar to start with <ArrowRight className="size-4" />
            </Link>
          </SectionHeading>

          <ol className="space-y-px overflow-hidden rounded-xl border border-sand-200 bg-sand-200">
            {howToUse.map((s, i) => (
              <Reveal key={s.step} as="li" delay={i * 80} className="bg-white p-7">
                <div className="flex gap-5">
                  <span className="font-display text-3xl text-flame-600/70">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl">{s.step}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-abyss-800/75">{s.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="questions" className="scroll-mt-24 bg-sand-100/70 py-20 sm:py-28">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Common questions" title="The rest of it" align="center" />
          <Reveal delay={80} className="mt-10">
            <FaqAccordion items={faqs.slice(0, 6)} defaultOpen={null} />
          </Reveal>
          <Reveal delay={120} className="mt-10 text-center">
            <Link href="/faq" className="btn btn-ghost">
              See every question <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-abyss-800/50">
            These statements have not been evaluated by the Food and Drug Administration. This
            product is not intended to diagnose, treat, cure or prevent any disease. If you are
            pregnant, nursing or managing a medical condition, speak to your doctor first.
          </p>
        </div>
      </section>
    </>
  );
}
