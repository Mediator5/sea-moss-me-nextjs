"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { ArrowRight } from "./icons";

export function CheckoutButton({
  className = "btn btn-gold w-full",
  label = "Secure checkout",
}: {
  className?: string;
  label?: string;
}) {
  const { lines, totals } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      <button
        type="button"
        onClick={checkout}
        disabled={loading || totals.jars === 0}
        className={className}
      >
        {loading ? "Starting checkout…" : label}
        {!loading && <ArrowRight className="size-4" />}
      </button>
      {error && (
        <p className="mt-3 text-center text-xs leading-relaxed text-red-700">
          {error}{" "}
          <Link href="/contact" className="link-underline font-semibold">
            Order by email instead →
          </Link>
        </p>
      )}
    </div>
  );
}
