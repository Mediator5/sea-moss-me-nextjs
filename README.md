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

## Turning on payments

1. Copy `.env.example` to `.env.local`.
2. Get your secret key from <https://dashboard.stripe.com/apikeys> — use the **test** key
   (`sk_test_…`) first.
3. Paste it into `STRIPE_SECRET_KEY` and restart the dev server.

Until that key exists, the checkout button politely tells the customer to order by email
instead, so nothing is broken while you set things up.

Test card: `4242 4242 4242 4242`, any future expiry, any CVC.

### How pricing is protected

The browser sends only *what* is in the cart (`sizeId` + quantity), never prices. The
server re-prices everything from `src/lib/products.ts` in `src/lib/cart.ts` before it
creates the Stripe session — so editing prices in devtools does nothing.

### Promo codes

When a cart qualifies for the 3-jar bundle, a 10% coupon is applied automatically. When it
doesn't, Stripe's promotion-code box is enabled instead — create `SEAMOSS20` in the Stripe
dashboard (Products → Coupons → Promotion codes) and it will work at checkout. Stripe
doesn't allow an automatic coupon and a customer-entered code on the same session, which is
why it's one or the other.

---

## Changing the things you'll actually want to change

| What | Where |
| --- | --- |
| Prices, sizes, flavour copy, ingredients | `src/lib/products.ts` |
| Bundle rules (3 jars → 10% + free shipping) | `BUNDLE` at the bottom of `src/lib/products.ts` |
| Email, phone, nav links, announcement bar | `src/lib/site.ts` |
| FAQs, testimonials, blog posts, process steps | `src/lib/content.ts` |
| The ingredient library (30 entries) | `src/lib/ingredients.ts` |
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
| `logo-mark.png` / `logo-mark-light.png` | Spare mark-only versions |
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

## Email (optional)

The contact form and newsletter work without any setup — submissions are written to the
server log. To have them emailed, add a [Resend](https://resend.com) API key to `.env.local`:

- `RESEND_API_KEY` — sends contact-form messages to `CONTACT_EMAIL`
- `RESEND_AUDIENCE_ID` — adds newsletter signups to that audience

---

## What's in the box

```
src/
  app/
    page.tsx                    home
    about/                      our story, process, benefits
    products/                   shop listing + comparison table
    products/[slug]/            product pages (4, statically generated)
    sea-moss/                   Sea Moss 101 — the long-form explainer
    ingredients/                filterable ingredient library
    blog/  blog/[slug]/         journal listing + posts
    faq/  contact/  cart/       supporting pages
    checkout/success/           post-payment confirmation
    privacy/  terms/            legal templates
    api/checkout/               Stripe Checkout session
    api/order/  api/newsletter/ form handlers
    sitemap.ts  robots.ts       SEO
  components/                   header, footer, cart, product UI, animations
  lib/                          products, pricing, content, site config
```

### Built in

- Cart with localStorage persistence, slide-over drawer and a full cart page
- Automatic bundle pricing (3+ jars → 10% off + free shipping) with progress prompts
- Server-side price validation before every Stripe session
- Product, FAQ and BlogPosting JSON-LD structured data
- Generated `sitemap.xml` and `robots.txt`, per-page canonical URLs and OG tags
- Scroll-reveal animations, marquee announcement bar, animated counters
- Full keyboard access, skip link, ARIA labelling and `prefers-reduced-motion` support
- Self-hosted fonts — no Google Fonts request, so the build works offline
- Real brand photography throughout, optimised and served through `next/image`
- A 30-entry ingredient library, filterable by category, benefit and free-text search
- Long-form Sea Moss 101 explainer with Article schema, and the Doctor Bird brand story

---

## Deploying

Easiest is Vercel: push the folder to a Git repo, import it, and add the same environment
variables from `.env.local` in the project settings. `npm run build` also produces a normal
Node server (`npm start`) if you'd rather host it yourself.

Note this is a Node application, not a WordPress theme — it doesn't run under XAMPP/Apache.
Run it with `npm run dev` while you're working on it locally.
