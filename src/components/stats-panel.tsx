"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * "Sea moss, by the numbers" — a dark, data-style panel for the homepage.
 * Every figure counts up once the panel scrolls into view; the headline ring
 * lights its 102 ticks one by one as the count climbs to 92. Visitors who
 * prefer reduced motion see the final numbers straight away.
 */

const MINERALS = 92;
const OF = 102;

/** Server and browser compute trig to slightly different precision; round so hydration matches. */
const round = (n: number) => Math.round(n * 100) / 100;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
  }, []);
  return reduced;
}

function useStartOnView(ref: RefObject<HTMLElement | null>) {
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return run;
}

/** Counts from `from` to `to` once `run` turns true. Returns value and progress 0–1. */
function useCount(to: number, run: boolean, { from = 0, duration = 2000, delay = 0 } = {}) {
  const [state, setState] = useState({ value: from, progress: 0 });
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 4);
      setState({ value: Math.round(from + (to - from) * eased), progress: eased });
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, from, duration, delay]);
  return state;
}

function MineralRing({ run, instant }: { run: boolean; instant: boolean }) {
  const counted = useCount(MINERALS, run, { duration: 2600 });
  const value = instant ? MINERALS : counted.value;
  const size = 240;
  const c = size / 2;
  const arcR = 86;
  const circumference = 2 * Math.PI * arcR;
  const fraction = value / OF;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[15rem] shrink-0">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-flame-500)" />
            <stop offset="100%" stopColor="var(--color-gold-400)" />
          </linearGradient>
        </defs>
        {/* 102 ticks — one per mineral, lit as the count reaches it */}
        {Array.from({ length: OF }, (_, i) => {
          const a = (i / OF) * Math.PI * 2 - Math.PI / 2;
          const lit = i < value;
          const r1 = 100;
          const r2 = lit ? 114 : 110;
          return (
            <line
              key={i}
              x1={round(c + Math.cos(a) * r1)}
              y1={round(c + Math.sin(a) * r1)}
              x2={round(c + Math.cos(a) * r2)}
              y2={round(c + Math.sin(a) * r2)}
              stroke={lit ? "url(#ring-grad)" : "rgba(253,248,240,0.14)"}
              strokeWidth={lit ? 2.2 : 1.4}
              strokeLinecap="round"
              style={{ transition: "stroke-width 0.3s, stroke 0.3s" }}
            />
          );
        })}
        <circle cx={c} cy={c} r={arcR} fill="none" stroke="rgba(253,248,240,0.07)" strokeWidth={6} />
        <circle
          cx={c}
          cy={c}
          r={arcR}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - fraction)}
          transform={`rotate(-90 ${c} ${c})`}
          style={{ filter: "drop-shadow(0 0 10px rgba(255,111,60,0.55))" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <p className="text-6xl font-light tracking-tight tabular-nums text-sand-50">
          {value}
          <span className="align-top text-2xl text-flame-400">*</span>
        </p>
        <p className="mt-1 font-mono text-xs tracking-[0.2em] text-sand-100/60">OF {OF}</p>
      </div>
    </div>
  );
}

type Stat = {
  to: number;
  from?: number;
  suffix?: string;
  unit?: string;
  label: string;
  tag: string;
};

function StatTile({
  stat,
  index,
  run,
  instant,
}: {
  stat: Stat;
  index: number;
  run: boolean;
  instant: boolean;
}) {
  const { to, from = 0, suffix = "", unit, label, tag } = stat;
  const counted = useCount(to, run, { from, duration: 2200, delay: 250 + index * 150 });
  const value = instant ? to : counted.value;
  const progress = instant ? 1 : counted.progress;

  return (
    <li className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand-50/10 bg-sand-50/[0.03] p-6 transition-colors duration-500 hover:border-flame-400/40 hover:bg-sand-50/[0.05]">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-sand-100/45 uppercase">
        <span>{String(index + 2).padStart(2, "0")}</span>
        <span>{tag}</span>
      </div>
      <p className="mt-6 bg-[linear-gradient(120deg,var(--color-flame-400),var(--color-gold-400))] bg-clip-text text-5xl font-light tracking-tight text-transparent tabular-nums">
        {value.toLocaleString("en-US")}
        {suffix}
        {unit && <span className="ml-1.5 text-xl text-sand-100/60">{unit}</span>}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-sand-100/75">{label}</p>
      <div className="mt-auto pt-6">
        <div className="h-px w-full bg-sand-50/10">
          <div
            className="h-px bg-[linear-gradient(90deg,var(--color-flame-500),var(--color-gold-400))] shadow-[0_0_8px_rgba(255,111,60,0.8)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </li>
  );
}

export function StatsPanel({ ingredientCount }: { ingredientCount: number }) {
  const ref = useRef<HTMLElement>(null);
  const run = useStartOnView(ref);
  const instant = useReducedMotion();

  const stats: Stat[] = [
    { to: 14000, unit: "yrs", label: "of people harvesting sea moss from the sea", tag: "Heritage" },
    { to: 100, suffix: "%", label: "certified organic, wildcrafted Jamaican sea moss", tag: "Source" },
    { to: ingredientCount, label: "fruits, herbs and roots explained in Nature's Wisdom", tag: "Library" },
    { to: 0, from: 99, label: "syrups, concentrates or artificial colours", tag: "Additives" },
  ];

  return (
    <section
      ref={ref}
      aria-labelledby="numbers-title"
      className="relative isolate overflow-hidden bg-abyss-950 py-24 text-sand-50 sm:py-28"
    >
      {/* blueprint grid, fading out toward the edges */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(253,248,240,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(253,248,240,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -top-40 -left-32 -z-10 size-[34rem] rounded-full bg-flame-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -right-40 -bottom-48 -z-10 size-[36rem] rounded-full bg-reef-500/30 blur-3xl [animation-delay:-9s]"
      />

      <div className="container-page">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] text-flame-300 uppercase">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-flame-500 opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-flame-500" />
            </span>
            By the numbers
          </p>
          <h2 id="numbers-title" className="mt-4 text-4xl leading-[1.08] sm:text-5xl">
            Small jar. <span className="text-flame-400">Big nutrition.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-sand-100/75 sm:text-lg">
            A quick look at what makes wildcrafted Jamaican sea moss worth a spoonful every day.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_1fr]">
          {/* headline figure */}
          <div className="relative overflow-hidden rounded-2xl border border-sand-50/10 bg-sand-50/[0.03] p-7 sm:p-9">
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-sand-100/45 uppercase">
              <span>01</span>
              <span>Mineral profile</span>
            </div>
            <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-center">
              <MineralRing run={run} instant={instant} />
              <div className="text-center sm:text-left">
                <p className="text-3xl leading-tight sm:text-4xl">
                  <span className="text-flame-400">92</span> of the{" "}
                  <span className="text-gold-400">102</span> minerals
                </p>
                <p className="mt-3 leading-relaxed text-sand-100/75">
                  Sea moss is widely credited with carrying up to 92 of the 102 minerals your body
                  uses — absorbed straight from the seawater it grows in.
                </p>
                <ul className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {["Iodine", "Magnesium", "Zinc", "Potassium", "Calcium", "Iron"].map((m) => (
                    <li
                      key={m}
                      className="rounded-full border border-reef-500/50 bg-reef-500/15 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-sand-100/85 uppercase"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* supporting figures */}
          <ul className="grid gap-5 sm:grid-cols-2">
            {stats.map((s, i) => (
              <StatTile key={s.tag} stat={s} index={i} run={run} instant={instant} />
            ))}
          </ul>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-sand-100/55">
          * The figure most often quoted for sea moss. It describes a broad, naturally occurring
          mineral profile rather than a lab measurement of every jar.{" "}
          <Link href="/sea-moss#minerals" className="link-underline text-flame-300">
            How we read that number
          </Link>
        </p>
      </div>
    </section>
  );
}
