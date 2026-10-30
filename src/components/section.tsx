import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  tone = "dark",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  /** "dark" (default) = on the orange ground. "light" = on a teal or photo panel. */
  tone?: "dark" | "light";
  children?: ReactNode;
}) {
  const light = tone === "light";
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${
        light ? "text-sand-50" : ""
      }`}
    >
      {eyebrow && (
        <p className={`eyebrow ${light ? "text-gold-300" : "text-white"}`}>{eyebrow}</p>
      )}
      <h2 className="mt-4 text-4xl leading-[1.08] sm:text-5xl">{title}</h2>
      {copy && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            light ? "text-sand-100/85" : "text-white"
          }`}
        >
          {copy}
        </p>
      )}
      {children}
    </Reveal>
  );
}

export function WaveDivider({
  className = "",
  flip = false,
  fill = "#c73f0d",
}: {
  className?: string;
  flip?: boolean;
  fill?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden
      className={`block h-12 w-full sm:h-[74px] ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M0 46c120-30 240-40 360-20s240 60 360 58 240-46 360-58 240 6 360 20v44H0z"
        fill={fill}
      />
    </svg>
  );
}
