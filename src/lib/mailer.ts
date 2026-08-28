import nodemailer, { type Transporter } from "nodemailer";
import { site } from "./site";

/**
 * A single Nodemailer transport, shared by the order-request form, the contact
 * form and newsletter signups.
 *
 * Configured for Gmail / Google Workspace SMTP by default. If the environment
 * variables aren't set the transport is simply `null` — every caller falls back
 * to writing the message to the server log, so nothing crashes and nothing is
 * silently lost while you're still setting things up.
 */

let cached: Transporter | null | undefined;

export function getTransport(): Transporter | null {
  if (cached !== undefined) return cached;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn(
      "[mail] SMTP_HOST / SMTP_USER / SMTP_PASS are not all set — messages will be logged instead of emailed.",
    );
    cached = null;
    return cached;
  }

  const port = Number(process.env.SMTP_PORT || 465);

  cached = nodemailer.createTransport({
    host,
    port,
    // Port 465 is implicit TLS; 587 upgrades with STARTTLS.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass },
  });

  return cached;
}

export const mailFrom = () =>
  process.env.MAIL_FROM || `${site.name} <${process.env.SMTP_USER ?? site.email}>`;

/** Where every order request, contact message and signup lands. */
export const mailTo = () => process.env.MAIL_TO || site.email;

/**
 * Send an email, or log it when SMTP isn't configured.
 * Returns true when the message actually left the building.
 */
export async function sendMail(options: {
  to?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  bcc?: string;
}): Promise<boolean> {
  const transport = getTransport();
  const to = options.to || mailTo();

  if (!transport) {
    console.info(
      `[mail] (not sent — SMTP unconfigured)\nTo: ${to}\nSubject: ${options.subject}\n\n${options.text}`,
    );
    return false;
  }

  await transport.sendMail({
    from: mailFrom(),
    to,
    bcc: options.bcc || process.env.MAIL_BCC || undefined,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });

  return true;
}
