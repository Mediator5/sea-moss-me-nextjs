import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { getPost, posts } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-xs text-abyss-800/60">
            <Link href="/blog" className="hover:text-abyss-900">
              ← Back to the journal
            </Link>
          </nav>

          <p className="eyebrow mt-8 text-flame-600">{post.category}</p>
          <h1 className="mt-4 text-4xl leading-[1.08] sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-sm text-abyss-800/50">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · {post.readingTime}
          </p>

          <div className="mt-10 space-y-6">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="pt-6 text-2xl sm:text-3xl">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="space-y-3 border-l-2 border-reef-300 pl-6">
                    {block.items?.map((item) => (
                      <li key={item} className="leading-relaxed text-abyss-800/80">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-[1.0625rem] leading-[1.8] text-abyss-800/85">
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="mt-14 rounded-xl bg-reef-500 p-8 text-sand-50 sm:p-10">
            <p className="eyebrow text-gold-300">Put it into practice</p>
            <h2 className="mt-4 text-2xl">Start with a jar of the real thing</h2>
            <p className="mt-3 text-sm leading-relaxed text-sand-100/85">
              Wildcrafted in Jamaica, blended in small batches, shipped cold-packed. 20% off your
              first order with code SEAMOSS20.
            </p>
            <Link href="/products" className="btn btn-gold mt-7">
              Shop the flavours <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </article>

      <section className="border-t border-sand-200 bg-sand-100/60 py-16">
        <div className="container-page">
          <h2 className="text-2xl">Keep reading</h2>
          <div className="mt-8 grid gap-7 md:grid-cols-2">
            {more.map((p) => (
              <article key={p.slug} className="card p-7">
                <p className="eyebrow text-flame-600">{p.category}</p>
                <h3 className="mt-3 text-xl leading-snug">
                  <Link href={`/blog/${p.slug}`} className="link-underline">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-abyss-800/70">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
