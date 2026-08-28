# Sea Moss Me — Next.js storefront

A complete replacement for the WordPress site at seamossme.com: Next.js 16 (App Router),
TypeScript, Tailwind CSS v4, a real cart, and Stripe Checkout.

---

## Running it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

Requires Node 20.9 or newer.

---

## How checkout works

The shopping flow is a normal store: browse → add to cart → cart drawer → cart page →
checkout. The last step is where it differs. Instead of taking a card payment, the
customer lands on **`/checkout`**, an order request form that already knows what they
chose. They only fill in contact and delivery details.

```
/products/[slug]  →  cart drawer  →  /cart  →  /checkout  →  /checkout/success
                                               (the request form)   (confirmation + reference)
```

On submit, two emails go out through Nodemailer:

1. **The order, to you** at `MAIL_TO` — items, quantities, the bundle discount, the
   full delivery address and any notes, with reply-to set to the customer.
2. **An acknowledgement, to the customer** — what they asked for, the estimated
   total, a reference number, and a clear statement that nothing has been charged.

The cart empties itself once the request is in.

### It re-prices on the server

The browser sends only *what* is in the cart (`sizeId` + quantity), never prices.
`/api/order-request` re-prices from `src/lib/products.ts` before composing the email,
so the figures in your inbox are always the real ones.

### Setting up the email — Gmail or Google Workspace

1. Turn on 2-Step Verification for the Google account that will send:
   <https://myaccount.google.com/security>
2. In that same section, open **App passwords** and create one. Google gives you
   16 characters like `abcd efgh ijkl mnop`. (App passwords only appear once
   2-Step Verification is on.)
3. Open `.env.local` and fill in:

   ```
   SMTP_USER=the-google-account@yourdomain.com
   SMTP_PASS=abcd efgh ijkl mnop
   ```

4. Restart the dev server.

`MAIL_TO` is already set to `info@seamossme.com` — that's where every order request,
contact message and newsletter signup lands.

**Until SMTP is configured, nothing breaks.** Every message is written to the terminal
running `npm run dev` instead of being emailed, clearly marked `[mail] (not sent —
SMTP unconfigured)`. Good for testing the flow before you wire up the mailbox.

One Gmail note: the `MAIL_FROM` address must be the `SMTP_USER` account itself, or an
alias that account is allowed to "send mail as". Gmail rejects anything else.

### Adding Stripe later

The Stripe integration is still in the codebase, untouched, at
`src/app/api/checkout/route.ts`. To switch from request-form to card payments:

```
NEXT_PUBLIC_CHECKOUT_MODE=stripe
STRIPE_SECRET_KEY=sk_test_...
```

That's the whole change — the checkout button reads that variable and re-points
itself. Test card: `4242 4242 4242 4242`, any future expiry, any CVC. When a cart
qualifies for the 3-jar bundle a 10% coupon is applied automatically; otherwise
Stripe's promotion-code box is enabled, so a `SEAMOSS20` code created in the Stripe
dashboard will work there.

---

## Changing the things you'll actually want to change

| What | Where |
| --- | --- |
| Prices, sizes, flavour copy, ingredients | `src/lib/products.ts` |
| Bundle rules (3 jars → 10% + free shipping) | `BUNDLE` at the bottom of `src/lib/products.ts` |
| Email, phone, nav links, announcement bar | `src/lib/site.ts` |
| FAQs, testimonials, blog posts, process steps | `src/lib/content.ts` |
| Nature's Wisdom entries (the ingredient library) | `src/lib/ingredients.ts` |
| Sea moss facts, minerals, Doctor Bird content | `src/lib/learn.ts` |
| Colours, fonts, buttons, shadows | `src/app/globals.css` (the `@theme` block at the top) |

**Pricing is one number.** Every flavour is a single 8 oz jar at `3000` — that's $30.00, stored
in cents so there are no rounding bugs. Change it in `SIZES(...)` in `src/lib/products.ts` and the
cards, product pages, cart, drawer and Stripe line items all update together. To add a second size
later, return another object from `SIZES` with its own `id`, `label`, `ounces` and `price` — the
size selector reappears on the product page automatically.

---

## Brand assets and photography

All artwork lives in `public/images/` and is already wired into the site:

| File | Where it appears |
| --- | --- |
| `logo-lockup.png` / `logo-lockup-light.png` | Header (light backgrounds) and footer / mobile menu (dark) |
| `logo-mark.png` / `logo-mark-light.png` | The bird-and-wreath mark on its own |
| `logo-full.png` / `logo-full-light.png` | Stacked mark-over-wordmark, for anywhere you need it |
| `hero.jpg` | Home page hero background |
| `origin.jpg` | Home "our story" panel, About hero, Journal feature |
| `ingredients.jpg` | Home "what's inside" band, About sourcing panel |
| `showcase.jpg` | Shop page hero, home bundle panel |
| `lineup.jpg` | About "how it's made" band |
| `og.jpg` | Social share image (1200×630) |
| `products/<slug>.jpg` | Product cards, product pages, cart |
| `src/app/icon.png` | Browser tab / bookmark icon |

The product shots are studio photographs on white. `ProductShot`
(`src/components/product-shot.tsx`) renders them with `mix-blend-multiply` over a
tint of each flavour's accent colour, so the white background disappears without
needing cut-out PNGs. To swap in a new photo, drop a replacement at the same path
and keep it roughly 600×750 — nothing in the code needs to change.

Your original full-resolution artwork is kept out of the deployed site in
`brand-source/` at the project root. Nothing there is served to visitors, so it
never slows the site down — but it is there when you need to re-crop something.

### The palette

Sampled pixel-for-pixel from your brand board, in `src/app/globals.css`:

| Brand name | Hex | Token | Where it leads |
| --- | --- | --- | --- |
| Deep Petrol Teal | `#05454c` | `abyss-900` | Body text, dark sections, footer |
| Caribbean Teal | `#28807a` | `reef-500` | Primary buttons, links, eyebrows, icons |
| Saffron Yellow | `#f7bb3f` | `gold-500` | Buttons and eyebrows on dark sections |
| Sunrise Coral | `#ea6951` | `flame-500` | Active nav, badges, cart count, highlights |
| Warm Sand | `#ddc5ac` | `sand-300` | Borders and rules; lighter steps are the page paper |

Each brand colour sits at the `-500` step. Darker steps (`-600`, `-700`) exist so
button fills and link text clear WCAG AA contrast — Caribbean Teal itself is 4.45:1
on paper, which is fine for large type but short for body text, so links use
`reef-600` at 6.3:1.

To lead with coral instead of teal on the main buttons, swap two colour values in
the `.btn-primary` rule — there's a comment above it showing exactly what to change.

### The logo artwork

The mark is recoloured from your original file by `scripts/recolor-logo.py`. It
separates the three elements automatically — the bird, the water and the sea moss
wreath are found by colour and by connected shape, not by hand-drawn masks — so if
you ever want to change a colour, edit the hex values at the bottom of that script,
re-run it, then run `scripts/rebuild-logo-assets.py` to regenerate every derivative
(both lockups, both marks, the favicon) in one pass.

| Element | Light backgrounds | Dark backgrounds |
| --- | --- | --- |
| Bird — wing | `#F26B4F` Sunrise Coral | `#F26B4F` |
| Bird — body, head, tail | `#C9482C` deeper coral | `#FBA88F` light coral |
| Water | `#0F6B78` Caribbean Teal | `#F9F2E4` cream |
| Sea moss wreath | `#D28C22` gold | `#E5AF52` brighter gold |
| Wordmark | `#05454C` Deep Petrol Teal | `#F9F2E4` cream |

## What's in the box

```
src/
  app/
    page.tsx                    home
    about/                      our story, process, benefits
    products/                   shop listing + comparison table
    products/[slug]/            product pages (4, statically generated)
    sea-moss/                   Sea Moss 101 — the long-form explainer
    natures-wisdom/             Nature's Wisdom — the filterable ingredient library
    blog/  blog/[slug]/         journal listing + posts
    faq/  contact/  cart/       supporting pages
    checkout/                   the order request form
    checkout/success/           confirmation + order reference
    privacy/  terms/            legal templates
    api/checkout/               Stripe Checkout session
    api/order-request/          order emails (Nodemailer)
    api/order/  api/newsletter/ contact form and signups
    sitemap.ts  robots.ts       SEO
  components/                   header, footer, cart, product UI, animations
  lib/                          products, pricing, content, site config
                                mailer.ts (SMTP), order.ts (email templates)
  scripts/                      logo recolour + asset rebuild
```

### Built in

- Cart with localStorage persistence, slide-over drawer and a full cart page
- Order request checkout — pre-filled from the cart, emailed via Nodemailer, no payment step
- Automatic bundle pricing (3+ jars → 10% off + free shipping) with progress prompts
- Server-side price validation before any order email or Stripe session
- Product, FAQ and BlogPosting JSON-LD structured data
- Generated `sitemap.xml` and `robots.txt`, per-page canonical URLs and OG tags
- Scroll-reveal animations, marquee announcement bar, animated counters
- Full keyboard access, skip link, ARIA labelling and `prefers-reduced-motion` support
- Self-hosted fonts — no Google Fonts request, so the build works offline
- Real brand photography throughout, optimised and served through `next/image`
- Nature's Wisdom — a 35-entry ingredient library, filterable by category, benefit and free-text search
- Long-form Sea Moss 101 explainer with Article schema, and the Doctor Bird brand story

---

## Deploying

Easiest is Vercel: push the folder to a Git repo, import it, and add the same environment
variables from `.env.local` in the project settings — including `SMTP_USER` and `SMTP_PASS`,
or the order form will only log to the server instead of emailing. `npm run build` also
produces a normal Node server (`npm start`) if you'd rather host it yourself.

Note this is a Node application, not a WordPress theme — it doesn't run under XAMPP/Apache.
Run it with `npm run dev` while you're working on it locally.
