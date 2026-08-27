import { NextResponse } from "next/server";
import { priceCart, type CartLine } from "@/lib/cart";
import { BUNDLE } from "@/lib/products";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function resolveOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (origin) return origin;
  const host = req.headers.get("host");
  if (host) return `${host.startsWith("localhost") ? "http" : "https"}://${host}`;
  return site.url;
}

export async function POST(req: Request) {
  let body: { lines?: CartLine[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const lines = Array.isArray(body.lines) ? body.lines : [];

  // Re-price on the server. The client never decides what anything costs.
  const totals = priceCart(lines);
  if (totals.jars === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    console.warn(
      "[checkout] STRIPE_SECRET_KEY is not set — add it to .env.local to enable card payments.",
    );
    return NextResponse.json(
      {
        error:
          "Card payment isn't available right now. Send us your order by email and we'll take it from there.",
      },
      { status: 503 },
    );
  }

  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(secret);
    const origin = resolveOrigin(req);

    const coupon =
      totals.discount > 0
        ? await stripe.coupons.create({
            percent_off: BUNDLE.discountPct,
            duration: "once",
            name: `Bundle of ${totals.jars} — ${BUNDLE.discountPct}% off`,
          })
        : null;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: totals.lines.map((line) => ({
        quantity: line.qty,
        price_data: {
          currency: "usd",
          unit_amount: line.unitPrice,
          product_data: {
            name: `${line.name} — ${line.sizeLabel}`,
            description: "Wildcrafted organic Jamaican sea moss gel",
          },
        },
      })),
      ...(coupon ? { discounts: [{ coupon: coupon.id }] } : { allow_promotion_codes: true }),
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "JM", "IE", "AU", "NZ", "DE", "FR", "NL", "NG", "ZA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: totals.freeShipping ? "Free shipping (bundle)" : "Standard shipping",
            fixed_amount: { amount: totals.shipping, currency: "usd" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: "allergies",
          label: { type: "custom", custom: "Allergies or delivery notes" },
          type: "text",
          optional: true,
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json(
      { error: "We couldn't reach the payment provider. Please try again in a moment." },
      { status: 502 },
    );
  }
}
