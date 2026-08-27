import { NextResponse } from "next/server";

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

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // Not wired to a provider yet — log the signup rather than dropping it.
  if (!apiKey || !audienceId) {
    console.info(`[newsletter] signup: ${email}`);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    if (!res.ok) {
      console.error("[newsletter] resend error", await res.text());
      return NextResponse.json({ error: "Signup failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("[newsletter]", err);
    return NextResponse.json({ error: "Signup failed." }, { status: 502 });
  }
}
