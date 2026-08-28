import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
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

  const text = [
    `New enquiry from ${site.name}`,
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${data.phone || "—"}`,
    `Topic:   ${data.topic || "—"}`,
    `Flavour: ${data.flavor || "—"}`,
    "",
    message,
  ].join("\n");

  try {
    const delivered = await sendMail({
      subject: `New enquiry — ${name}`,
      text,
      replyTo: email,
    });
    return NextResponse.json({ ok: true, delivered });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Message could not be sent." }, { status: 502 });
  }
}
