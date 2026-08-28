"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { ArrowRight } from "./icons";

/**
 * The last step of the cart.
 *
 * Two modes, set by NEXT_PUBLIC_CHECKOUT_MODE:
 *   "request" (default) — hands off to /checkout, the order request form.
 *   "stripe"            — creates a Stripe Checkout session instead.
 *
 * The Stripe route is still in the codebase (src/app/api/checkout/route.ts), so
 * switching to card payments later is one environment variable, not a rebuild.
 */
const MODE = process.env.NEXT_PUBLIC_CHECKOUT_MODE === "stripe" ? "stripe" : "request";

export function CheckoutButton({
  className = "btn btn-primary w-full",
  label,
}: {
  className?: string;
  label?: string;
}) {
  const { lines, totals, closeCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const text = label ?? (MODE === "stripe" ? "Secure checkout" : "Continue to checkout");
  const empty = totals.jars === 0;

  if (MODE === "request") {
    return (
      <Link
        href="/checkout"
        onClick={closeCart}
        aria-disabled={empty}
        className={`${className} ${empty ? "pointer-events-none opacity-55" : ""}`}
      >
        {text}
        <ArrowRight className="size-4" />
      </Link>
    );
  }

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "We couldn't start checkout. Please try again.");
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button type="button" onClick={checkout} disabled={loading || empty} className={className}>
        {loading ? "Starting checkout…" : text}
        {!loading && <ArrowRight className="size-4" />}
      </button>
      {error && (
        <p className="mt-3 text-center text-xs leading-relaxed text-flame-700">
          {error}{" "}
          <Link href="/checkout" className="link-underline font-semibold">
            Send an order request instead →
          </Link>
        </p>
      )}
    </div>
  );
}
