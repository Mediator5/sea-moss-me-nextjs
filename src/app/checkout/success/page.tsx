"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";
import { ArrowRight, Check } from "@/components/icons";

export default function CheckoutSuccessPage() {
  const { clear, ready } = useCart();

  useEffect(() => {
    if (ready) clear();
  }, [ready, clear]);

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page max-w-2xl text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-reef-100 text-reef-600">
          <Check className="size-8" />
        </span>
        <h1 className="mt-8 text-4xl sm:text-5xl">Order confirmed</h1>
        <p className="mt-5 leading-relaxed text-abyss-800/70">
          Thank you — your payment went through and your jars are already on the list for the next
          batch. A receipt is on its way to your inbox, and you&apos;ll get tracking as soon as it
          ships.
        </p>

        <div className="card mt-10 p-8 text-left">
          <h2 className="text-xl">What happens next</h2>
          <ol className="mt-5 space-y-4 text-sm leading-relaxed text-abyss-800/75">
            <li>
              <strong className="text-abyss-900">1. We make it.</strong> Your gel is blended fresh
              rather than pulled off a shelf — usually within one business day.
            </li>
            <li>
              <strong className="text-abyss-900">2. We pack it cold.</strong> Every order ships
              cold-packed so it arrives the way it left us.
            </li>
            <li>
              <strong className="text-abyss-900">3. You refrigerate it.</strong> Straight into the
              fridge on arrival. One to two tablespoons a day, and give it three weeks.
            </li>
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/blog/ultimate-guide-to-sea-moss" className="btn btn-primary">
            How to use your gel <ArrowRight className="size-4" />
          </Link>
          <Link href="/products" className="btn btn-ghost">
            Back to the shop
          </Link>
        </div>
      </div>
    </section>
  );
}
