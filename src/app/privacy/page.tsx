import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What data Sea Moss Me collects, why we collect it, and how to have it removed.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="August 2026"
      intro={`We collect the least we can get away with: what we need to make your order, ship it, and answer you when you write in. This page explains exactly what that means.`}
      sections={[
        {
          heading: "What we collect",
          body: (
            <>
              <p>
                When you place an order: your name, email, phone number, shipping address and any
                notes you add. Payment card details are entered directly with Stripe and never touch
                our servers.
              </p>
              <p>
                When you contact us or join the newsletter: your name and email, plus whatever you
                choose to write.
              </p>
              <p>
                When you browse: standard server logs and, if analytics are enabled, anonymous usage
                statistics. We do not sell any of it.
              </p>
            </>
          ),
        },
        {
          heading: "Why we collect it",
          body: (
            <p>
              To take payment, ship your order, tell you where it is, answer your questions, and —
              only if you asked for it — send you occasional email. Nothing else.
            </p>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <p>
              Our payment processor (Stripe), our shipping carriers, and our email provider. Each of
              them only receives the part they need to do their job. We never sell or rent your
              details to anyone.
            </p>
          ),
        },
        {
          heading: "Cookies",
          body: (
            <p>
              We keep your cart in your browser&apos;s local storage so it survives a refresh. Stripe
              sets its own cookies during checkout for fraud prevention. Clearing your browser data
              removes both.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              You can ask us for a copy of what we hold about you, ask us to correct it, or ask us to
              delete it. Email <a className="link-underline font-medium" href={`mailto:${site.email}`}>{site.email}</a>{" "}
              and we&apos;ll action it within 30 days. Newsletter emails have an unsubscribe link in
              every message.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about this policy? Email{" "}
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
