import { NextResponse } from "next/server";
import { priceCart, type CartLine } from "@/lib/cart";
import { sendMail } from "@/lib/mailer";
import {
  customerAckHtml,
  customerAckText,
  orderHtml,
  orderReference,
  orderText,
  type OrderDetails,
} from "@/lib/order";

export const runtime = "nodejs";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  let body: { lines?: CartLine[]; details?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Re-price on the server from our own catalogue. The browser tells us *what*
  // is in the cart, never what it costs — same rule the Stripe route follows.
  const totals = priceCart(Array.isArray(body.lines) ? body.lines : []);
  if (totals.jars === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const d = body.details ?? {};
  const details: OrderDetails = {
    name: str(d.name),
    email: str(d.email),
    phone: str(d.phone),
    address1: str(d.address1),
    address2: str(d.address2),
    city: str(d.city),
    region: str(d.region),
    postcode: str(d.postcode),
    country: str(d.country),
    contactPreference: str(d.contactPreference),
    notes: str(d.notes),
  };

  const missing = (["name", "email", "address1", "city", "country"] as const).filter(
    (k) => !details[k],
  );
  if (missing.length) {
    return NextResponse.json(
      { error: `Please fill in: ${missing.join(", ")}.`, fields: missing },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right.", fields: ["email"] },
      { status: 400 },
    );
  }

  const ref = orderReference();

  try {
    // 1. The order, to you.
    const delivered = await sendMail({
      subject: `New order request ${ref} — ${details.name}`,
      text: orderText(ref, details, totals),
      html: orderHtml(ref, details, totals),
      replyTo: details.email,
    });

    // 2. The acknowledgement, to the customer. Never let this one fail the request.
    try {
      await sendMail({
        to: details.email,
        subject: `We've got your order request (${ref}) — Sea Moss Me`,
        text: customerAckText(ref, details, totals),
        html: customerAckHtml(ref, details, totals),
      });
    } catch (err) {
      console.error("[order-request] customer acknowledgement failed", err);
    }

    return NextResponse.json({ ok: true, reference: ref, delivered });
  } catch (err) {
    console.error("[order-request]", err);
    return NextResponse.json(
      {
        error:
          "We couldn't send your request just now. Please email us directly and we'll pick it up straight away.",
      },
      { status: 502 },
    );
  }
}
