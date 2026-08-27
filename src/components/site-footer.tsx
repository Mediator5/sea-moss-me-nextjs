import Link from "next/link";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { NewsletterForm } from "./newsletter-form";
import { Wordmark } from "./wordmark";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All flavours", href: "/products" },
      ...products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Our story", href: "/about" },
      { label: "How it's made", href: "/about#process" },
      { label: "Journal", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Shipping & delivery", href: "/faq#shipping" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-abyss-950 text-sand-100">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 size-[32rem] rounded-full bg-reef-500/15 blur-3xl"
      />

      <div className="container-page relative py-20">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_2fr]">
          <div className="max-w-sm">
            <Wordmark tone="light" className="h-12" />
            <p className="mt-6 text-sm leading-relaxed text-sand-100/65">{site.description}</p>
            <div className="mt-8 space-y-1.5 text-sm">
              <a href={`mailto:${site.email}`} className="link-underline block text-sand-100/85">
                {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`} className="link-underline block text-sand-100/85">
                {site.phone}
              </a>
              <p className="text-sand-100/45">{site.address}</p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="eyebrow font-sans text-gold-400">{col.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="link-underline text-sm text-sand-100/70 hover:text-sand-50"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 rounded-lg border border-sand-100/10 bg-sand-100/[0.04] p-8 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-display text-2xl text-sand-50">Join the Sea Moss Me list</h3>
            <p className="mt-2 text-sm text-sand-100/60">
              New batches, restock alerts and the odd recipe. No noise, unsubscribe any time.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-sand-100/10 pt-8 text-xs text-sand-100/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-xl leading-relaxed">
            These statements have not been evaluated by the Food and Drug Administration. This
            product is not intended to diagnose, treat, cure or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}
