import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ArrowRight } from "@/components/icons";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Guides, sourcing notes and everyday habits from the Sea Moss Me kitchen — written for people who want the honest version.",
  alternates: { canonical: "/blog" },
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="border-b border-sand-200 bg-sand-100/60 py-16 sm:py-20">
        <div className="container-page">
          <p className="eyebrow text-flame-600">From the journal</p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[1.04] sm:text-6xl">
            Notes from the kitchen and the coast
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-abyss-800/70">
            No miracle claims, no filler posts. Just what we&apos;ve learned making sea moss gel and
            what&apos;s worth knowing before you buy any.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group card grid overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] lg:grid-cols-2"
            >
              <div className="relative min-h-56 overflow-hidden">
                <Image
                  src="/images/origin.jpg"
                  alt="Sea moss being gathered from clear coastal water in Jamaica"
                  width={1600}
                  height={1067}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="p-8 sm:p-12">
                <p className="eyebrow text-flame-600">{featured.category}</p>
                <h2 className="mt-4 text-3xl leading-snug">{featured.title}</h2>
                <p className="mt-4 leading-relaxed text-abyss-800/70">{featured.excerpt}</p>
                <p className="mt-7 text-xs text-abyss-800/45">
                  {formatDate(featured.date)} · {featured.readingTime}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-reef-600">
                  Read the post <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-7 md:grid-cols-2">
            {rest.map((post, i) => (
              <Reveal key={post.slug} as="article" delay={i * 90} className="card group p-8">
                <p className="eyebrow text-flame-600">{post.category}</p>
                <h2 className="mt-4 text-2xl leading-snug">
                  <Link href={`/blog/${post.slug}`} className="link-underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-relaxed text-abyss-800/70">{post.excerpt}</p>
                <p className="mt-6 text-xs text-abyss-800/45">
                  {formatDate(post.date)} · {post.readingTime}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
