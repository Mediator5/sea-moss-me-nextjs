import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <>
      <section className="surface-coral-alt border-b border-white/20 py-14">
        <div className="container-page max-w-3xl">
          <h1 className="text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-white">Last updated {updated}</p>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="text-lg leading-relaxed text-white">{intro}</p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl">{section.heading}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-white">
                  {section.body}
                </div>
              </div>
            ))}
          </div>

          <p className="card mt-14 p-6 text-sm leading-relaxed text-abyss-800/75">
            This page is a starting template written for a small food business. Have it reviewed by
            a lawyer in your jurisdiction before you rely on it.
          </p>
        </div>
      </section>
    </>
  );
}
