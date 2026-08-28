import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let email = "";
  try {
    const body = (await req.json()) as { email?: string };
    email = (body.email || "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const delivered = await sendMail({
      subject: `Newsletter signup — ${email}`,
      text: `${email} joined the Sea Moss Me list.\n\nAdd them to your mailing list.`,
      replyTo: email,
    });
    return NextResponse.json({ ok: true, delivered });
  } catch (err) {
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Signup failed." }, { status: 502 });
  }
}
