import Link from "next/link";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading, WaveDivider } from "@/components/section";
import { StatCounter } from "@/components/stat-counter";
import { Testimonials } from "@/components/testimonials";
import { FaqAccordion } from "@/components/faq-accordion";
import Image from "next/image";
import { ProductShot } from "@/components/product-shot";
import { ArrowRight, Leaf, Spark, Wave } from "@/components/icons";
import { faqs, ingredients, process } from "@/lib/content";
import { posts } from "@/lib/content";
import { products } from "@/lib/products";

export default function HomePage() {
  const montego = products.find((p) => p.slug === "montego-tropical-fusion")!;

  return (
    <>
      <Hero />

      {/* ---------------- Stats ---------------- */}
      <section className="bg-abyss-900 py-14 text-sand-50">
        <div className="container-page grid grid-cols-2 gap-10 text-center sm:grid-cols-4">
          <StatCounter value={5} suffix="+" label="Years of organic wellness" />
          <StatCounter value={102} label="Essential minerals" />
          <StatCounter value={4} label="Small-batch flavours" />
          <StatCounter value={100} suffix="%" label="Wildcrafted, never farmed" />
        </div>
      </section>
      <WaveDivider flip fill="#083d4a" className="-mt-px bg-sand-50" />

      {/* ---------------- Story ---------------- */}
      <section id="story" className="py-24 sm:py-32">
        <div className="container-page grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl sm:aspect-square">
              <Image
                src="/images/origin.jpg"
                alt="Hands lifting wildcrafted sea moss from clear water on the Jamaican coast"
                width={1600}
                height={1067}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,41,50,0.78),rgba(5,41,50,0.05)_55%)]"
              />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="font-display text-2xl text-sand-50 italic">
                  &ldquo;Real ingredients. No shortcuts.&rdquo;
                </p>
                <p className="mt-2 text-xs tracking-[0.16em] text-sand-100/70 uppercase">
                  Our family standard since day one
                </p>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 hidden rounded-xl bg-sand-50 p-5 shadow-[var(--shadow-lift)] sm:block">
              <Wave className="size-7 text-flame-500" />
              <p className="mt-3 max-w-[9rem] text-xs leading-relaxed text-abyss-800/70">
                Harvested by hand on the south coast of Jamaica
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Our story"
              title={
                <>
                  A family remedy that
                  <br className="hidden sm:block" /> outgrew the kitchen
                </>
              }
              copy="Sea Moss Me started the way most good things do — as something made at home, for people we love. The moss came from the same coast it still comes from. The recipe hasn't changed. What changed is how many jars we make."
            />
            <Reveal delay={120}>
              <ul className="mt-9 space-y-5">
                {[
                  {
                    icon: Leaf,
                    title: "Wildcrafted, not farmed",
                    copy: "Cut by hand from open rock, never grown in salt tanks — that's where the mineral density comes from.",
                  },
                  {
                    icon: Spark,
                    title: "Whole superfoods, blended in",
                    copy: "Turmeric, elderberry, spirulina and more. Real ingredients you can name, in amounts you can taste.",
                  },
                  {
                    icon: Wave,
                    title: "Small batches only",
                    copy: "We make what we can sell fresh. Nothing sits in a warehouse waiting for you.",
                  },
                ].map(({ icon: Icon, title, copy }) => (
                  <li key={title} className="flex gap-4">
                    <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-full bg-reef-100 text-reef-600">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-abyss-800/70">{copy}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-2 font-semibold text-reef-600"
              >
                <span className="link-underline">Read our full story</span>
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Products ---------------- */}
      <section id="products" className="bg-sand-100/70 py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="The flavours"
            title="Four jars. One wildcrafted base."
            copy="Every flavour starts with the same hand-harvested Jamaican sea moss — then goes its own way. Pick the one that matches what your body is asking for."
            align="center"
          />

          <div className="mt-14 grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={i * 80} className="h-full">
                <ProductCard product={product} priority={i < 2} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link href="/products" className="btn btn-ghost">
              Compare all flavours <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section id="process" className="relative overflow-hidden bg-abyss-950 py-24 text-sand-50 sm:py-32">
        <div
          aria-hidden
          className="animate-drift pointer-events-none absolute -top-32 -left-32 size-[36rem] rounded-full bg-reef-500/12 blur-3xl"
        />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="How it's made"
            tone="light"
            title="From rock to jar, four steps"
            copy="No industrial processing, no gelatine, no thickeners. The whole method fits on one page — which is exactly the point."
          />

          <ol className="mt-16 grid gap-px overflow-hidden rounded-xl bg-sand-100/10 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal
                key={step.step}
                as="li"
                delay={i * 90}
                className="bg-abyss-950 p-8 transition-colors duration-500 hover:bg-abyss-900"
              >
                <span className="font-display text-4xl text-gold-500/80">{step.step}</span>
                <h3 className="mt-5 text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sand-100/60">{step.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Ingredients ---------------- */}
      <section className="py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="What's inside"
            title="Superfoods that actually do something"
            copy="Every flavour is built around real, wildcrafted ingredients — here's what the key ones bring to the jar."
            align="center"
          />

          <Reveal className="mt-14 overflow-hidden rounded-2xl">
            <Image
              src="/images/ingredients.jpg"
              alt="Turmeric, ginger, spirulina, moringa, berries and dried sea moss laid out on a warm surface"
              width={1600}
              height={1200}
              sizes="(min-width: 1280px) 1200px, 96vw"
              className="aspect-16/9 w-full object-cover"
            />
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ingredients.map((ing, i) => (
              <Reveal
                key={ing.name}
                as="li"
                delay={(i % 4) * 70}
                className="group relative overflow-hidden rounded-lg border border-sand-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: ing.color }}
                />
                <span
                  className="grid size-10 place-items-center rounded-full text-white"
                  style={{ backgroundColor: ing.color }}
                >
                  <Leaf className="size-5" />
                </span>
                <h3 className="mt-5 text-lg">{ing.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-abyss-800/70">{ing.copy}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Bundle + limited edition ---------------- */}
      <section className="pb-24 sm:pb-32">
        <div className="container-page grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="relative isolate overflow-hidden rounded-2xl p-10 text-sand-50 sm:p-14">
            <Image
              src="/images/showcase.jpg"
              alt=""
              aria-hidden
              width={2000}
              height={1125}
              sizes="(min-width: 1024px) 60vw, 96vw"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(5,41,50,0.94)_0%,rgba(5,41,50,0.86)_45%,rgba(5,41,50,0.35)_100%)]"
            />
            <div className="relative max-w-md">
              <p className="eyebrow text-gold-400">Bundle &amp; save</p>
              <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
                Buy 3 jars, get 10% off and free shipping
              </h2>
              <p className="mt-5 leading-relaxed text-sand-100/75">
                Mix and match any flavours you like. Most people run one green and one gold at a
                time — and keep a Purple in the door of the fridge for winter.
              </p>
              <Link href="/products" className="btn btn-gold mt-9">
                Build your bundle <ArrowRight className="size-4" />
              </Link>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -bottom-20 hidden size-80 rounded-full border border-sand-100/20 sm:block"
            />
          </Reveal>

          <Reveal
            delay={120}
            className="relative overflow-hidden rounded-2xl border border-sand-200 bg-white p-10 sm:p-12"
          >
            <p className="eyebrow text-flavor-montego">Limited edition</p>
            <h2 className="mt-4 text-3xl leading-tight">Montego Tropical Fusion</h2>
            <p className="mt-4 text-sm leading-relaxed text-abyss-800/70">
              Jamaican mango, coconut, pineapple and papaya — a bright twist on the ritual you
              already know. Only available while this run lasts.
            </p>
            <Link
              href={`/products/${montego.slug}`}
              className="mt-7 inline-flex items-center gap-2 font-semibold text-flavor-montego"
            >
              <span className="link-underline">Get Montego</span>
              <ArrowRight className="size-4" />
            </Link>
            <ProductShot
              product={montego}
              sizes="240px"
              className="pointer-events-none absolute -right-8 -bottom-10 w-48 rounded-xl sm:w-56"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="bg-sand-100/70 py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="From the fridge door"
            title="What customers actually say"
            align="center"
          />
          <div className="mt-14">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faq" className="py-24 sm:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Questions, answered"
            title="The things people ask before their first jar"
            copy="Still unsure about something? Email us — a real person replies, usually the same day."
          >
            <Link href="/faq" className="btn btn-ghost mt-8">
              See all questions
            </Link>
          </SectionHeading>

          <Reveal delay={100}>
            <FaqAccordion items={faqs.slice(0, 5)} />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Journal ---------------- */}
      <section className="bg-sand-100/70 py-24 sm:py-32">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="From the journal" title="Reading for the curious" />
            <Reveal>
              <Link href="/blog" className="btn btn-ghost">
                All posts <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} as="article" delay={i * 90} className="card group p-7">
                <p className="eyebrow text-reef-600">{post.category}</p>
                <h3 className="mt-4 text-xl leading-snug">
                  <Link href={`/blog/${post.slug}`} className="link-underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-abyss-800/70">{post.excerpt}</p>
                <p className="mt-6 text-xs text-abyss-800/45">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  · {post.readingTime}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="relative overflow-hidden bg-abyss-950 py-24 text-center text-sand-50 sm:py-32">
        <div
          aria-hidden
          className="animate-drift pointer-events-none absolute inset-x-0 top-0 mx-auto size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(213,160,60,0.18),transparent_65%)] blur-2xl"
        />
        <div className="container-page relative">
          <Reveal>
            <p className="eyebrow text-gold-400">Ready when you are</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl leading-[1.06] sm:text-6xl">
              Start with one jar. Your body will tell you the rest.
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-sand-100/70">
              Use code <strong className="text-gold-400">SEAMOSS20</strong> for 20% off your first
              order. Ships cold-packed from Jamaica, worldwide.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/products" className="btn btn-gold">
                Shop now <ArrowRight className="size-4" />
              </Link>
              <Link href="/contact" className="btn btn-ghost-light">
                Talk to us first
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
