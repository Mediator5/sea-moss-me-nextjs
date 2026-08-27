import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Payload = Record<string, string | undefined>;

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();

  if (!name || !email.includes("@") || !message) {
    return NextResponse.json({ error: "Please fill in name, email and message." }, { status: 400 });
  }

  const lines = [
    `New enquiry from ${site.name}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${data.phone || "—"}`,
    `Topic: ${data.topic || "—"}`,
    `Flavour: ${data.flavor || "—"}`,
    "",
    message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || site.email;

  // No mail provider configured yet — log it so nothing is silently lost.
  if (!apiKey) {
    console.info("[contact] (no RESEND_API_KEY set)\n" + lines);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Sea Moss Me <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `New enquiry — ${name}`,
        text: lines,
      }),
    });

    if (!res.ok) {
      console.error("[contact] resend error", await res.text());
      return NextResponse.json({ error: "Message could not be sent." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Message could not be sent." }, { status: 502 });
  }
}
