"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { ProductThumb } from "@/components/product-shot";
import { ArrowRight, Check, Leaf, Shield, Truck } from "@/components/icons";
import { formatPrice } from "@/lib/cart";
import { BUNDLE, findSize } from "@/lib/products";
import { site } from "@/lib/site";

const field =
  "w-full rounded-sm border border-sand-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-reef-500";

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Jamaica",
  "Trinidad and Tobago",
  "Barbados",
  "Ireland",
  "Australia",
  "New Zealand",
  "Germany",
  "France",
  "Netherlands",
  "Nigeria",
  "Ghana",
  "South Africa",
];

const DRAFT_KEY = "sea-moss-me:checkout-draft:v1";

type Draft = Record<string, string>;

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, totals, ready } = useCart();
  const [draft, setDraft] = useState<Draft>({ country: "United States", contactPreference: "Email" });
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // Bring back whatever they typed last time — they shouldn't retype an address.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      // Deliberate: the draft can only be read on the client, after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setDraft((d) => ({ ...d, ...(JSON.parse(raw) as Draft) }));
    } catch {
      /* private mode — no draft, no problem */
    }
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setDraft((d) => ({ ...d, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError(null);

    const details = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(details));
    } catch {
      /* ignore */
    }

    try {
      const res = await fetch("/api/order-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines, details }),
      });
      const data = (await res.json()) as { ok?: boolean; reference?: string; error?: string };
      if (res.ok && data.ok) {
        router.push(`/checkout/success?ref=${encodeURIComponent(data.reference ?? "")}`);
        return;
      }
      setError(data.error || "Something went wrong. Please try again.");
      setState("error");
    } catch {
      setError("Network error — please check your connection and try again.");
      setState("error");
    }
  }

  if (ready && totals.jars === 0) {
    return (
      <section className="py-20 sm:py-28">
        <div className="container-page max-w-xl text-center">
          <p className="eyebrow text-reef-600">Checkout</p>
          <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">Your cart is empty</h1>
          <p className="mt-5 leading-relaxed text-abyss-800/70">
            Pick a jar or two and we&apos;ll bring you straight back here.
          </p>
          <Link href="/products" className="btn btn-primary mt-9">
            Browse the flavours <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ---------------- Progress ---------------- */}
      <div className="border-b border-sand-200 bg-sand-100/60">
        <div className="container-page flex items-center gap-3 py-4 text-xs sm:gap-5 sm:text-sm">
          <Link href="/cart" className="flex items-center gap-2 text-abyss-800/55 hover:text-abyss-900">
            <span className="grid size-6 place-items-center rounded-full bg-reef-500 text-[11px] font-bold text-sand-50">
              <Check className="size-3.5" />
            </span>
            Your cart
          </Link>
          <span aria-hidden className="h-px flex-1 bg-sand-300" />
          <span className="flex items-center gap-2 font-semibold text-abyss-900">
            <span className="grid size-6 place-items-center rounded-full bg-abyss-900 text-[11px] font-bold text-sand-50">
              2
            </span>
            Your details
          </span>
          <span aria-hidden className="h-px flex-1 bg-sand-300" />
          <span className="flex items-center gap-2 text-abyss-800/45">
            <span className="grid size-6 place-items-center rounded-full border border-sand-300 text-[11px] font-bold">
              3
            </span>
            Confirmed
          </span>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <p className="eyebrow text-reef-600">Final step</p>
          <h1 className="mt-4 max-w-2xl text-4xl leading-[1.06] sm:text-5xl">
            Where should we send it?
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-abyss-800/70">
            Your jars are already listed below — you just need to tell us who you are and where
            you&apos;d like them. We&apos;ll reply within one business day to confirm delivery and
            payment. <strong className="text-abyss-900">Nothing is charged now.</strong>
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            {/* ---------------- The form ---------------- */}
            <form onSubmit={onSubmit} className="order-2 space-y-8 lg:order-1">
              <fieldset className="card p-7 sm:p-8">
                <legend className="eyebrow px-2 text-reef-600">Contact details</legend>

                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Full name <span className="text-flame-600">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={draft.name ?? ""}
                      onChange={set("name")}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email <span className="text-flame-600">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={draft.email ?? ""}
                      onChange={set("email")}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={draft.phone ?? ""}
                      onChange={set("phone")}
                      className={field}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contactPreference" className="mb-2 block text-sm font-medium">
                      Best way to reach you
                    </label>
                    <select
                      id="contactPreference"
                      name="contactPreference"
                      value={draft.contactPreference ?? "Email"}
                      onChange={set("contactPreference")}
                      className={field}
                    >
                      <option>Email</option>
                      <option>Phone call</option>
                      <option>Text message</option>
                      <option>WhatsApp</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              <fieldset className="card p-7 sm:p-8">
                <legend className="eyebrow px-2 text-reef-600">Delivery address</legend>

                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="address1" className="mb-2 block text-sm font-medium">
                      Street address <span className="text-flame-600">*</span>
                    </label>
                    <input
                      id="address1"
                      name="address1"
                      required
                      autoComplete="address-line1"
                      value={draft.address1 ?? ""}
                      onChange={set("address1")}
                      className={field}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address2" className="mb-2 block text-sm font-medium">
                      Apartment, suite, etc. <span className="text-abyss-800/45">(optional)</span>
                    </label>
                    <input
                      id="address2"
                      name="address2"
                      autoComplete="address-line2"
                      value={draft.address2 ?? ""}
                      onChange={set("address2")}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="mb-2 block text-sm font-medium">
                      City <span className="text-flame-600">*</span>
                    </label>
                    <input
                      id="city"
                      name="city"
                      required
                      autoComplete="address-level2"
                      value={draft.city ?? ""}
                      onChange={set("city")}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="region" className="mb-2 block text-sm font-medium">
                      State / parish / region
                    </label>
                    <input
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      value={draft.region ?? ""}
                      onChange={set("region")}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="postcode" className="mb-2 block text-sm font-medium">
                      ZIP / postcode
                    </label>
                    <input
                      id="postcode"
                      name="postcode"
                      autoComplete="postal-code"
                      value={draft.postcode ?? ""}
                      onChange={set("postcode")}
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="mb-2 block text-sm font-medium">
                      Country <span className="text-flame-600">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      autoComplete="country-name"
                      value={draft.country ?? "United States"}
                      onChange={set("country")}
                      className={field}
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                      <option>Somewhere else</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              <fieldset className="card p-7 sm:p-8">
                <legend className="eyebrow px-2 text-reef-600">Anything we should know</legend>
                <label htmlFor="notes" className="mt-4 mb-2 block text-sm font-medium">
                  Allergies, delivery instructions, a gift note
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={draft.notes ?? ""}
                  onChange={set("notes")}
                  placeholder="Leave with the neighbour at number 12 · I'm allergic to shellfish · Please gift-wrap"
                  className={field}
                />
              </fieldset>

              <div>
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="btn btn-primary w-full py-5 text-base"
                >
                  {state === "sending" ? "Sending your request…" : "Send order request"}
                  {state !== "sending" && <ArrowRight className="size-4" />}
                </button>
                <p className="mt-3 text-center text-xs text-abyss-800/55">
                  No payment is taken on this page. We&apos;ll confirm everything by email first.
                </p>
                {error && (
                  <p className="mt-4 rounded-md border border-flame-500/30 bg-flame-100 px-4 py-3 text-center text-sm text-flame-700">
                    {error}{" "}
                    <a href={`mailto:${site.email}`} className="font-semibold underline">
                      Email us instead
                    </a>
                  </p>
                )}
              </div>
            </form>

            {/* ---------------- Pre-filled order ---------------- */}
            <aside className="order-1 h-fit lg:order-2 lg:sticky lg:top-28">
              <div className="card overflow-hidden">
                <div className="flex items-center justify-between border-b border-sand-200 px-7 py-5">
                  <h2 className="text-xl">Your order</h2>
                  <Link
                    href="/cart"
                    className="text-xs font-semibold text-reef-600 underline-offset-4 hover:underline"
                  >
                    Edit
                  </Link>
                </div>

                <ul className="divide-y divide-sand-200 px-7">
                  {totals.lines.map((line) => {
                    const match = findSize(line.sizeId);
                    return (
                      <li key={line.sizeId} className="flex items-center gap-4 py-4">
                        {match && <ProductThumb product={match.product} className="size-16 shrink-0" />}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold">{line.name}</p>
                          <p className="mt-0.5 text-xs text-abyss-800/60">
                            {line.sizeLabel} · {line.qty} × {formatPrice(line.unitPrice)}
                          </p>
                        </div>
                        <span className="text-sm font-semibold tabular-nums">
                          {formatPrice(line.lineTotal)}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <dl className="space-y-3 border-t border-sand-200 px-7 py-5 text-sm">
                  <Row label={`Subtotal (${totals.jars} jars)`} value={formatPrice(totals.subtotal)} />
                  {totals.discount > 0 && (
                    <Row
                      label={`Bundle discount (${BUNDLE.discountPct}%)`}
                      value={`− ${formatPrice(totals.discount)}`}
                      accent
                    />
                  )}
                  <Row
                    label="Shipping"
                    value={totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
                    accent={totals.shipping === 0}
                  />
                </dl>

                <div className="flex items-baseline justify-between border-t border-sand-200 px-7 py-5">
                  <span className="font-display text-lg">Estimated total</span>
                  <span className="font-display text-3xl tabular-nums">
                    {formatPrice(totals.total)}
                  </span>
                </div>

                <ul className="space-y-2.5 border-t border-sand-200 bg-sand-100/50 px-7 py-5 text-xs text-abyss-800/70">
                  <li className="flex items-center gap-2">
                    <Shield className="size-4 shrink-0 text-reef-600" /> Confirmed by a person before
                    anything ships
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="size-4 shrink-0 text-reef-600" /> Cold-packed, tracked delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <Leaf className="size-4 shrink-0 text-reef-600" /> Blended fresh once you confirm
                  </li>
                </ul>
              </div>

              <p className="mt-5 text-center text-xs text-abyss-800/55">
                Prefer to talk it through?{" "}
                <a href={`mailto:${site.email}`} className="link-underline font-semibold">
                  {site.email}
                </a>{" "}
                ·{" "}
                <a href={`tel:${site.phoneHref}`} className="link-underline font-semibold">
                  {site.phone}
                </a>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-abyss-800/70">{label}</dt>
      <dd className={`tabular-nums ${accent ? "font-semibold text-reef-600" : ""}`}>{value}</dd>
    </div>
  );
}
