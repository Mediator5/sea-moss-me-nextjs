import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about flavours, allergies, shipping or wholesale? Email, call, or send us a message — a real person replies within a business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow text-reef-600">Get in touch</p>
          <h1 className="mt-5 text-5xl leading-[1.05]">Talk to a person</h1>
          <p className="mt-6 leading-relaxed text-abyss-800/70">
            Wholesale, allergies, a delayed delivery, or you just want to know which jar to start
            with — send it over. We answer everything within one business day.
          </p>

          <dl className="mt-10 space-y-6 border-t border-sand-200 pt-8 text-sm">
            <div>
              <dt className="eyebrow text-abyss-800/50">Email</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${site.email}`} className="link-underline text-base font-medium">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-abyss-800/50">Phone</dt>
              <dd className="mt-1.5">
                <a href={`tel:${site.phoneHref}`} className="link-underline text-base font-medium">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-abyss-800/50">Shipping from</dt>
              <dd className="mt-1.5 text-base">{site.address}</dd>
            </div>
            <div>
              <dt className="eyebrow text-abyss-800/50">Response time</dt>
              <dd className="mt-1.5 text-base">Within 1 business day</dd>
            </div>
          </dl>

          <div className="mt-10 rounded-lg border border-sand-200 bg-sand-100/60 p-6">
            <p className="text-sm font-semibold">Restock alerts</p>
            <p className="mt-1.5 mb-4 text-xs leading-relaxed text-abyss-800/65">
              Montego Tropical Fusion sells out. Get told when the next batch lands.
            </p>
            <NewsletterForm tone="light" />
          </div>
        </div>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
