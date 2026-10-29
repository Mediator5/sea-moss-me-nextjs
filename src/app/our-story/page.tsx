import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DeepBackdrop, ExploreMore, FeatureHero } from "@/components/feature-page";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Leaf, Spark, Wave } from "@/components/icons";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Sea Moss Me grew out of a Caribbean tradition: wildcrafted Jamaican sea moss, prepared by hand, blended whole and made fresh in small batches.",
  alternates: { canonical: "/our-story" },
};

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

export default function OurStoryPage() {
  return (
    <>
      <FeatureHero
        eyebrow="Our story"
        title={
          <>
            A Jamaican tradition, <span className="text-flame-400">kept intact</span>
          </>
        }
        copy="Long before the world called it a superfood, sea moss was a staple in Caribbean homes. Sea Moss Me grew out of that same tradition — prepared by hand for family, with sea moss from the same Jamaican coastline it still comes from today. We now make it for far more people, but the source, the method and the standard have not changed."
      />

      <section className="relative isolate overflow-hidden bg-abyss-950 py-24 text-sand-50 sm:py-28">
        <DeepBackdrop />
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-sand-50/10 sm:aspect-square">
              <Image
                src="/images/origin.jpg"
                alt="Hands lifting wildcrafted sea moss from clear water on the Jamaican coast"
                width={1600}
                height={1067}
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,51,58,0.92),rgba(3,51,58,0.05)_55%)]"
              />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="font-display text-2xl text-sand-50 italic">
                  &ldquo;Real ingredients. No shortcuts.&rdquo;
                </p>
                <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-flame-300 uppercase">
                  Our family standard since day one
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <ul className="space-y-5">
              {story.map(({ icon: Icon, title, copy }, i) => (
                <Reveal
                  key={title}
                  as="li"
                  delay={i * 90}
                  className="flex gap-5 rounded-2xl border border-sand-50/10 bg-sand-50/[0.04] p-6 transition-colors duration-500 hover:border-flame-400/40"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-flame-500 text-white shadow-[0_10px_24px_-8px_rgba(255,111,60,0.9)]">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-sand-100/45 uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 font-sans text-lg font-semibold tracking-normal">{title}</h2>
                    <p className="mt-1.5 leading-relaxed text-sand-100/75">{copy}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={300}>
              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-2 font-semibold text-flame-300"
              >
                <span className="link-underline">Read our full story</span>
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <ExploreMore current="/our-story" />
    </>
  );
}
