"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useCart } from "@/components/cart-provider";
import { ArrowRight, Check } from "@/components/icons";
import { site } from "@/lib/site";

function Confirmation() {
  const { clear, ready } = useCart();
  const reference = useSearchParams().get("ref");

  // The request is in — the cart has done its job.
  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);

  return (
    <>
      <div className="border-b border-sand-200 bg-sand-100/60">
        <div className="container-page flex items-center gap-3 py-4 text-xs sm:gap-5 sm:text-sm">
          {["Your cart", "Your details", "Confirmed"].map((step, i) => (
            <span key={step} className="flex flex-1 items-center gap-3 last:flex-none sm:gap-5">
              <span
                className={`flex items-center gap-2 ${
                  i === 2 ? "font-semibold text-abyss-900" : "text-abyss-800/55"
                }`}
              >
                <span className="grid size-6 place-items-center rounded-full bg-reef-500 text-[11px] font-bold text-sand-50">
                  <Check className="size-3.5" />
                </span>
                {step}
              </span>
              {i < 2 && <span aria-hidden className="h-px flex-1 bg-sand-300" />}
            </span>
          ))}
        </div>
      </div>

      <section className="py-16 sm:py-24">
        <div className="container-page max-w-2xl text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-reef-100 text-reef-600">
            <Check className="size-8" />
          </span>
          <h1 className="mt-8 text-4xl sm:text-5xl">Request received</h1>
          <p className="mt-5 leading-relaxed text-abyss-800/70">
            Thank you — your order request is with us and a confirmation is on its way to your
            inbox. <strong className="text-abyss-900">Nothing has been charged.</strong>
          </p>

          {reference && (
            <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-5 py-2.5 text-sm">
              <span className="text-abyss-800/55">Your reference</span>
              <strong className="tracking-wide">{reference}</strong>
            </p>
          )}

          <div className="card mt-10 p-8 text-left">
            <h2 className="text-xl">What happens next</h2>
            <ol className="mt-5 space-y-4 text-sm leading-relaxed text-abyss-800/75">
              <li>
                <strong className="text-abyss-900">1. We reply within one business day.</strong> A
                real person confirms availability, the delivery cost and a day that suits you, and
                how you&apos;d like to pay.
              </li>
              <li>
                <strong className="text-abyss-900">2. We blend it fresh.</strong> Nothing is made
                until your order is confirmed — that&apos;s the whole point of small batches.
              </li>
              <li>
                <strong className="text-abyss-900">3. We deliver it to you.</strong> Kept chilled
                on the way, and we let you know when we&apos;re on our way. Straight into the
                fridge when it arrives.
              </li>
            </ol>
          </div>

          <p className="mt-8 text-sm text-abyss-800/60">
            Need to change something? Reply to the confirmation email, or reach us at{" "}
            <a href={`mailto:${site.email}`} className="link-underline font-semibold">
              {site.email}
            </a>
            .
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/sea-moss" className="btn btn-primary">
              How to use your gel <ArrowRight className="size-4" />
            </Link>
            <Link href="/products" className="btn btn-ghost">
              Back to the shop
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="py-32" />}>
      <Confirmation />
    </Suspense>
  );
}
