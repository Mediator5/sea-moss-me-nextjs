import { formatPrice, type CartTotals } from "./cart";
import { BUNDLE } from "./products";
import { site } from "./site";

export type OrderDetails = {
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  region?: string;
  postcode?: string;
  country: string;
  contactPreference?: string;
  notes?: string;
};

/** A short, human reference so you and the customer can talk about one order. */
export function orderReference(date = new Date()) {
  const stamp = date.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SMM-${stamp}-${rand}`;
}

const addressLines = (d: OrderDetails) =>
  [d.address1, d.address2, [d.city, d.region].filter(Boolean).join(", "), d.postcode, d.country]
    .filter(Boolean)
    .join("\n");

/** Plain-text order — this is what lands in your inbox. */
export function orderText(ref: string, d: OrderDetails, totals: CartTotals) {
  const lines = totals.lines
    .map((l) => `  ${l.qty} × ${l.name} (${l.sizeLabel})  —  ${formatPrice(l.lineTotal)}`)
    .join("\n");

  return [
    `NEW ORDER REQUEST — ${ref}`,
    "",
    "ORDER",
    lines,
    "",
    `  Subtotal        ${formatPrice(totals.subtotal)}`,
    totals.discount > 0
      ? `  Bundle discount −${formatPrice(totals.discount)}  (${BUNDLE.discountPct}% on ${totals.jars} jars)`
      : null,
    `  Delivery        ${totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}`,
    `  TOTAL           ${formatPrice(totals.total)}`,
    "",
    "CUSTOMER",
    `  Name     ${d.name}`,
    `  Email    ${d.email}`,
    `  Phone    ${d.phone || "—"}`,
    `  Prefers  ${d.contactPreference || "—"}`,
    "",
    "DELIVER TO",
    addressLines(d)
      .split("\n")
      .map((l) => `  ${l}`)
      .join("\n"),
    "",
    "NOTES",
    `  ${d.notes?.trim() || "—"}`,
    "",
    "—",
    "Payment has NOT been taken. Reply to this email to confirm the order,",
    "delivery timing and how the customer would like to pay.",
  ]
    .filter((l) => l !== null)
    .join("\n");
}

/** The same order as HTML, for a nicer inbox. */
export function orderHtml(ref: string, d: OrderDetails, totals: CartTotals) {
  const row = (label: string, value: string, strong = false) => `
    <tr>
      <td style="padding:6px 0;color:#5b6f74;font-size:14px">${label}</td>
      <td style="padding:6px 0;text-align:right;font-size:14px;${
        strong ? "font-weight:700;font-size:18px;" : ""
      }color:#05454c">${value}</td>
    </tr>`;

  const items = totals.lines
    .map(
      (l) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #efe1cd">
        <strong style="color:#05454c">${l.name}</strong><br>
        <span style="color:#5b6f74;font-size:13px">${l.sizeLabel} · ${l.qty} × ${formatPrice(
          l.unitPrice,
        )}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #efe1cd;text-align:right;color:#05454c">${formatPrice(
        l.lineTotal,
      )}</td>
    </tr>`,
    )
    .join("");

  return `
  <div style="background:#fdf8f0;padding:28px;font-family:-apple-system,Segoe UI,Roboto,sans-serif">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #efe1cd;border-radius:16px;overflow:hidden">
      <div style="background:#0f6b78;padding:22px 28px">
        <div style="color:#fbd88c;font-size:11px;letter-spacing:2px;text-transform:uppercase">New order request</div>
        <div style="color:#fdf8f0;font-size:22px;margin-top:6px">${ref}</div>
      </div>

      <div style="padding:24px 28px">
        <table style="width:100%;border-collapse:collapse">${items}</table>

        <table style="width:100%;border-collapse:collapse;margin-top:14px">
          ${row("Subtotal", formatPrice(totals.subtotal))}
          ${
            totals.discount > 0
              ? row(`Bundle discount (${BUNDLE.discountPct}%)`, `− ${formatPrice(totals.discount)}`)
              : ""
          }
          ${row("Delivery", totals.shipping === 0 ? "Free" : formatPrice(totals.shipping))}
          ${row("Total", formatPrice(totals.total), true)}
        </table>

        <h3 style="margin:26px 0 8px;color:#05454c;font-size:15px">Customer</h3>
        <p style="margin:0;color:#33484d;font-size:14px;line-height:1.7">
          ${d.name}<br>
          <a href="mailto:${d.email}" style="color:#0f6b78">${d.email}</a><br>
          ${d.phone || "—"}${
            d.contactPreference ? `<br><span style="color:#5b6f74">Prefers ${d.contactPreference}</span>` : ""
          }
        </p>

        <h3 style="margin:22px 0 8px;color:#05454c;font-size:15px">Deliver to</h3>
        <p style="margin:0;color:#33484d;font-size:14px;line-height:1.7">
          ${addressLines(d).replace(/\n/g, "<br>")}
        </p>

        ${
          d.notes?.trim()
            ? `<h3 style="margin:22px 0 8px;color:#05454c;font-size:15px">Notes</h3>
               <p style="margin:0;color:#33484d;font-size:14px;line-height:1.7">${d.notes}</p>`
            : ""
        }

        <p style="margin:26px 0 0;padding:14px 16px;background:#fde7e0;border-radius:10px;color:#a93b23;font-size:13px;line-height:1.6">
          <strong>No payment has been taken.</strong> Reply to this email to confirm the order,
          delivery timing and how they'd like to pay.
        </p>
      </div>
    </div>
  </div>`;
}

/** The acknowledgement the customer receives. */
export function customerAckText(ref: string, d: OrderDetails, totals: CartTotals) {
  const lines = totals.lines
    .map((l) => `  ${l.qty} × ${l.name} (${l.sizeLabel})  —  ${formatPrice(l.lineTotal)}`)
    .join("\n");

  return [
    `Hi ${d.name.split(" ")[0]},`,
    "",
    `Thank you — we've received your order request (${ref}). Nothing has been charged yet.`,
    "",
    "HERE'S WHAT YOU ASKED FOR",
    lines,
    "",
    `  Total (estimated)  ${formatPrice(totals.total)}`,
    "",
    "WHAT HAPPENS NEXT",
    "  We'll reply within one business day to confirm availability, a delivery",
    "  day that suits you, and how you'd like to pay. Your jars are blended",
    "  fresh once that's settled, and delivered to you chilled.",
    "",
    "If anything above looks wrong, just reply to this email and we'll fix it.",
    "",
    `— ${site.name}`,
    `${site.email} · ${site.phone}`,
  ].join("\n");
}

export function customerAckHtml(ref: string, d: OrderDetails, totals: CartTotals) {
  const items = totals.lines
    .map(
      (l) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #efe1cd;color:#05454c">
        ${l.qty} × <strong>${l.name}</strong>
        <span style="color:#5b6f74;font-size:13px"> · ${l.sizeLabel}</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #efe1cd;text-align:right;color:#05454c">${formatPrice(
        l.lineTotal,
      )}</td>
    </tr>`,
    )
    .join("");

  return `
  <div style="background:#fdf8f0;padding:28px;font-family:-apple-system,Segoe UI,Roboto,sans-serif">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #efe1cd;border-radius:16px;overflow:hidden">
      <div style="background:#0f6b78;padding:26px 28px">
        <div style="color:#fbd88c;font-size:11px;letter-spacing:2px;text-transform:uppercase">Order request received</div>
        <div style="color:#fdf8f0;font-size:24px;margin-top:8px">Thank you, ${d.name.split(" ")[0]}</div>
        <div style="color:#c2e5ea;font-size:13px;margin-top:6px">Reference ${ref}</div>
      </div>

      <div style="padding:24px 28px;color:#33484d;font-size:15px;line-height:1.7">
        <p style="margin:0 0 18px">
          We've got your request and <strong>nothing has been charged</strong>. Here's what you asked for:
        </p>

        <table style="width:100%;border-collapse:collapse">${items}
          <tr>
            <td style="padding:14px 0;font-size:17px;color:#05454c"><strong>Estimated total</strong></td>
            <td style="padding:14px 0;text-align:right;font-size:19px;font-weight:700;color:#05454c">${formatPrice(
              totals.total,
            )}</td>
          </tr>
        </table>

        <h3 style="margin:24px 0 8px;color:#05454c;font-size:16px">What happens next</h3>
        <p style="margin:0">
          We'll reply within one business day to confirm availability, a delivery day that suits
          you, and how you'd like to pay. Your jars are blended fresh once that's settled, and
          delivered to you chilled.
        </p>

        <p style="margin:22px 0 0;color:#5b6f74;font-size:14px">
          If anything above looks wrong, just reply to this email and we'll fix it.
        </p>

        <p style="margin:24px 0 0;padding-top:18px;border-top:1px solid #efe1cd;color:#5b6f74;font-size:13px">
          ${site.name} · <a href="mailto:${site.email}" style="color:#0f6b78">${site.email}</a> · ${site.phone}
        </p>
      </div>
    </div>
  </div>`;
}
