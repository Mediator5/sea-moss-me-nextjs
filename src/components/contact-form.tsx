"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";
import { products } from "@/lib/products";

const field =
  "w-full rounded-sm border border-sand-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-reef-500";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="card flex flex-col items-center p-12 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-reef-100 text-reef-600">
          <Check className="size-7" />
        </span>
        <h2 className="mt-6 text-2xl">Message received</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-abyss-800/70">
          Thanks for reaching out. We reply to everything within one business day — usually much
          sooner.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Full name
          </label>
          <input id="name" name="name" required className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Phone <span className="text-abyss-800/45">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={field} />
        </div>
        <div>
          <label htmlFor="topic" className="mb-2 block text-sm font-medium">
            What&apos;s it about?
          </label>
          <select id="topic" name="topic" className={field} defaultValue="order">
            <option value="order">Placing an order</option>
            <option value="existing">An order I&apos;ve already placed</option>
            <option value="wholesale">Wholesale or stockist enquiry</option>
            <option value="ingredients">Ingredients and allergies</option>
            <option value="other">Something else</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="flavor" className="mb-2 block text-sm font-medium">
          Flavour <span className="text-abyss-800/45">(if relevant)</span>
        </label>
        <select id="flavor" name="flavor" className={field} defaultValue="">
          <option value="">Choose a flavour…</option>
          {products.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={field} />
      </div>

      <button type="submit" disabled={state === "loading"} className="btn btn-primary w-full">
        {state === "loading" ? "Sending…" : "Send message"}
        <ArrowRight className="size-4" />
      </button>

      {state === "error" && (
        <p className="text-center text-xs text-red-700">
          That didn&apos;t send. Please email us directly and we&apos;ll pick it up straight away.
        </p>
      )}
    </form>
  );
}
