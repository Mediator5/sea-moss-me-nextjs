import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page max-w-xl text-center">
        <p className="eyebrow text-reef-600">404</p>
        <h1 className="mt-5 text-5xl leading-tight">This page drifted off</h1>
        <p className="mt-5 leading-relaxed text-abyss-800/70">
          The link you followed doesn&apos;t exist any more. The jars, happily, still do.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/products" className="btn btn-primary">
            Shop the flavours <ArrowRight className="size-4" />
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
