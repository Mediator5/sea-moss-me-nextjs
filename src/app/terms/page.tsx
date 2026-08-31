import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms that apply when you order sea moss gel from Sea Moss Me.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="August 2026"
      intro="These terms cover what you can expect from us, and what we need from you, when you order from Sea Moss Me."
      sections={[
        {
          heading: "Orders and payment",
          body: (
            <p>
              Placing an order is a request, not a completed sale — a person confirms availability and
              the delivery day with you before any payment is taken. Prices are shown in US dollars.
              We may cancel and refund an order if a product is unavailable or if we suspect fraud.
            </p>
          ),
        },
        {
          heading: "Delivery",
          body: (
            <p>
              We deliver locally, in Orlando and the surrounding Central Florida area, and do not
              post orders at present. Nothing is blended until your order is confirmed, and we agree
              the delivery day with you when we reply. Delivery is $8.95; any order of three jars or
              more is delivered free.
            </p>
          ),
        },
        {
          heading: "Returns and refunds",
          body: (
            <p>
              Because this is a fresh, perishable food product, we cannot accept returns on opened
              jars. If your order arrives damaged, melted or not as described, email us within 48
              hours of delivery with a photo and we will replace it or refund you in full.
            </p>
          ),
        },
        {
          heading: "Health information",
          body: (
            <p>
              Our products are foods, not medicines. Nothing on this site is medical advice, and
              nothing we sell is intended to diagnose, treat, cure or prevent any disease. Sea moss is
              naturally high in iodine — if you are pregnant, nursing, managing a thyroid condition or
              taking prescription medication, speak to your doctor before adding it to your routine.
            </p>
          ),
        },
        {
          heading: "Allergies",
          body: (
            <p>
              Full ingredients are listed on every product page and on every jar. If you have a
              specific allergy, tell us before you order and we will confirm suitability in writing.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Anything unclear? Email{" "}
              <a className="link-underline font-medium" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or call {site.phone}.
            </p>
          ),
        },
      ]}
    />
  );
}
