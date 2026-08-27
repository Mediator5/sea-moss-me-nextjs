import { testimonials } from "@/lib/content";
import { Star } from "./icons";
import { Reveal } from "./reveal";

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <Reveal key={t.name} as="article" delay={i * 90} className="card flex flex-col p-7">
          <div className="flex gap-0.5 text-gold-500">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} className="size-4" />
            ))}
          </div>
          <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-abyss-900/85">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <footer className="mt-6 border-t border-sand-200 pt-4">
            <p className="text-sm font-semibold">{t.name}</p>
            <p className="text-xs text-abyss-800/55">{t.detail}</p>
          </footer>
        </Reveal>
      ))}
    </div>
  );
}
