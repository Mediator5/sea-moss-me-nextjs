import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "@/components/icons";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "How to take sea moss gel, how we source it, how long it keeps, what shipping costs and everything else people ask before their first jar.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-sand-200 bg-sand-100/60 py-16 sm:py-20">
        <div className="container-page">
          <p className="eyebrow text-flame-600">Questions, answered</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.04] sm:text-6xl">
            Everything people ask before their first jar
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-abyss-800/70">
            If your question isn&apos;t here,{" "}
            <a href={`mailto:${site.email}`} className="link-underline font-semibold text-reef-600">
              email us
            </a>{" "}
            — a real person replies, usually the same day.
          </p>
        </div>
      </section>

      <section id="shipping" className="py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <Reveal>
            <FaqAccordion items={faqs} />
          </Reveal>

          <Reveal delay={120} className="mt-14 rounded-xl bg-reef-500 p-10 text-sand-50">
            <h2 className="text-2xl">Still deciding?</h2>
            <p className="mt-3 text-sm leading-relaxed text-sand-100/85">
              Start with a single 8 oz jar of Alkaline Me. It&apos;s the flavour most people
              begin with, and the smallest commitment we sell.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/products/alkaline-me" className="btn btn-gold">
                See Alkaline Me <ArrowRight className="size-4" />
              </Link>
              <Link href="/contact" className="btn btn-ghost-light">
                Ask a question
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
