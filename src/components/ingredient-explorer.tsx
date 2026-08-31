"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  benefitTags,
  groupLabels,
  groupOrder,
  ingredientLibrary,
  type BenefitTag,
  type Ingredient,
  type IngredientGroup,
} from "@/lib/ingredients";
import { getProduct } from "@/lib/products";
import { Check, Close, Leaf } from "./icons";

type GroupFilter = IngredientGroup | "all";

export function IngredientExplorer() {
  const [group, setGroup] = useState<GroupFilter>("all");
  const [tag, setTag] = useState<BenefitTag | null>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ingredientLibrary.filter((ing) => {
      if (group !== "all" && ing.group !== group) return false;
      if (tag && !ing.tags.includes(tag)) return false;
      if (!q) return true;
      return (
        ing.name.toLowerCase().includes(q) ||
        ing.summary.toLowerCase().includes(q) ||
        ing.bestFor.toLowerCase().includes(q) ||
        ing.benefits.some(
          (b) =>
            b.term.toLowerCase().includes(q) ||
            b.copy.toLowerCase().includes(q),
        )
      );
    });
  }, [group, tag, query]);

  /** Results split into the four library sections, in order, empty ones dropped. */
  const sections = useMemo(
    () =>
      groupOrder
        .map((g) => ({
          group: g,
          label: groupLabels[g],
          items: results.filter((i) => i.group === g),
        }))
        .filter((sec) => sec.items.length > 0),
    [results],
  );

  const groups: { value: GroupFilter; label: string }[] = [
    { value: "all", label: "Everything" },
    ...groupOrder.map((g) => ({
      value: g as GroupFilter,
      label: groupLabels[g],
    })),
  ];

  const filtersActive = group !== "all" || tag !== null || query !== "";

  return (
    <div>
      {/* ---------------- Controls ---------------- */}
      {/* Static on phones — a sticky bar this tall eats the whole viewport and
          leaves nothing to scroll. Sticky from md up, where it costs one row. */}
      <div className="relative z-40 -mx-5 border-y border-sand-200 bg-sand-50/95 px-5 py-4 backdrop-blur-xl md:sticky md:top-20 md:-mx-8 md:px-8">
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
            {/* One swipeable row on phones, wrapping chips from md up */}
            <div className="scroll-strip -mx-5 flex gap-1.5 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              {groups.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGroup(g.value)}
                  aria-pressed={group === g.value}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    group === g.value
                      ? "bg-reef-600 text-sand-50"
                      : "border border-sand-300 text-abyss-800/80 hover:border-abyss-900/40"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            <div className="md:ms-auto">
              <label htmlFor="ingredient-search" className="sr-only">
                Search ingredients
              </label>
              <input
                id="ingredient-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search — sleep, turmeric, digestion…"
                className="w-full rounded-full border border-sand-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-reef-500 md:w-64"
              />
            </div>
          </div>

          <div className="scroll-strip -mx-5 flex items-center gap-1.5 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            <span className="mr-1 shrink-0 text-xs font-semibold tracking-[0.12em] text-abyss-800/45 uppercase">
              What for
            </span>
            {benefitTags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(tag === t ? null : t)}
                aria-pressed={tag === t}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  tag === t
                    ? "bg-flame-600 text-sand-50"
                    : "border border-sand-300 text-abyss-800/70 hover:border-flame-500/50 hover:text-abyss-900"
                }`}
              >
                {t}
              </button>
            ))}
            {filtersActive && (
              <button
                onClick={() => {
                  setGroup("all");
                  setTag(null);
                  setQuery("");
                }}
                className="ml-1 inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-flame-600 hover:underline"
              >
                <Close className="size-3" /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- Results ---------------- */}
      <p className="mt-8 text-sm text-abyss-800/60" aria-live="polite">
        {results.length} {results.length === 1 ? "ingredient" : "ingredients"}
        {tag ? ` for ${tag.toLowerCase()}` : ""}
      </p>

      {results.length === 0 ? (
        <div className="mt-8 rounded-xl border border-sand-200 bg-white p-12 text-center">
          <p className="font-display text-2xl">Nothing matches that yet</p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-abyss-800/65">
            Try a broader term, or clear the filters to see the whole library.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-14">
          {sections.map((section) => (
            <section key={section.group}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-sand-300 pb-3">
                <h2 className="text-3xl leading-tight">{section.label}</h2>
                <p className="text-xs tracking-[0.12em] text-abyss-800/50 uppercase">
                  {section.items.length}{" "}
                  {section.items.length === 1 ? "ingredient" : "ingredients"}
                </p>
              </div>
              <ul className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map((ing: Ingredient) => (
                  <li
                    key={ing.slug}
                    id={ing.slug}
                    className="card flex h-full scroll-mt-24 flex-col overflow-hidden md:scroll-mt-44"
                  >
                    <span
                      aria-hidden
                      className="h-1 w-full shrink-0"
                      style={{ backgroundColor: ing.color }}
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-2xl leading-tight">{ing.name}</h3>
                          <p
                            className="mt-1 text-[11px] font-semibold tracking-[0.12em] uppercase"
                            style={{ color: ing.color }}
                          >
                            {groupLabels[ing.group]}
                            {ing.pipeline && " · In development"}
                          </p>
                        </div>
                        <span
                          className="grid size-10 shrink-0 place-items-center rounded-full"
                          style={{
                            backgroundColor: `${ing.color}1a`,
                            color: ing.color,
                          }}
                        >
                          <Leaf className="size-5" />
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-abyss-900/85">
                        {ing.summary}
                      </p>

                      <p className="mt-4 rounded-md bg-sand-100/80 px-4 py-3 text-xs leading-relaxed text-abyss-800/75">
                        <span className="font-semibold text-abyss-900">
                          Best for:{" "}
                        </span>
                        {ing.bestFor}
                      </p>

                      <ul className="mt-5 space-y-3">
                        {ing.benefits.map((b) => (
                          <li
                            key={b.term}
                            className="flex gap-2.5 text-sm leading-relaxed"
                          >
                            <Check
                              className="mt-0.5 size-4 shrink-0"
                              style={{ color: ing.color }}
                            />
                            <span className="text-abyss-800/80">
                              <strong className="font-semibold text-abyss-900">
                                {b.term}
                              </strong>{" "}
                              — {b.copy}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {ing.caution && (
                        <p className="mt-5 rounded-md border border-gold-400/40 bg-gold-200/30 px-4 py-3 text-xs leading-relaxed text-abyss-900">
                          <strong className="font-semibold">
                            Good to know:{" "}
                          </strong>
                          {ing.caution}
                        </p>
                      )}

                      <div className="mt-auto pt-6">
                        {ing.inJars.length > 0 ? (
                          <div className="flex flex-wrap items-center gap-2 border-t border-sand-200 pt-5 text-xs">
                            <span className="text-abyss-800/50">In:</span>
                            {ing.inJars.map((slug) => {
                              const product = getProduct(slug);
                              if (!product) return null;
                              return (
                                <Link
                                  key={slug}
                                  href={`/products/${slug}`}
                                  className="rounded-full border px-2.5 py-1 font-medium transition hover:bg-sand-100"
                                  style={{
                                    borderColor: `${product.accent}55`,
                                    color: product.accent,
                                  }}
                                >
                                  {product.name}
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="border-t border-sand-200 pt-5 text-xs text-abyss-800/50">
                            {ing.pipeline
                              ? "In development — coming to a future blend."
                              : "Part of our wider formulation library, not currently in a jar."}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
