"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";

export function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  const dark = tone === "dark";

  if (state === "done") {
    return (
      <p
        className={`flex items-center gap-2 text-sm font-medium ${
          dark ? "text-reef-200" : "text-reef-600"
        }`}
      >
        <Check className="size-5" /> You&apos;re on the list. Watch your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className={`flex-1 rounded-full px-5 py-3.5 text-sm outline-none transition ${
          dark
            ? "border border-sand-100/20 bg-sand-100/5 text-sand-50 placeholder:text-sand-100/60 focus:border-reef-200"
            : "border border-sand-300 bg-white text-abyss-900 placeholder:text-abyss-800/35 focus:border-reef-500"
        }`}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className={`btn ${dark ? "btn-gold" : "btn-primary"} shrink-0`}
      >
        {state === "loading" ? "Signing up…" : "Sign up"}
        <ArrowRight className="size-4" />
      </button>
      {state === "error" && (
        <p className="text-xs text-red-400 sm:absolute sm:mt-14">
          Something went wrong. Try again shortly.
        </p>
      )}
    </form>
  );
}
