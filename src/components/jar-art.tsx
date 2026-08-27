/**
 * Placeholder product artwork.
 *
 * These are vector stand-ins so the site looks finished before your photography
 * lands. When you have real photos, drop them in /public/images and swap
 * <JarArt /> for <Image /> inside ProductCard and the product page — nothing
 * else needs to change.
 */

type JarArtProps = {
  name: string;
  gradient: [string, string];
  accent: string;
  size?: "8" | "16";
  className?: string;
  /** Keeps SVG gradient ids unique when the same jar appears twice on a page. */
  idSuffix?: string;
};

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function JarArt({
  name,
  gradient,
  accent,
  size = "16",
  className,
  idSuffix = "",
}: JarArtProps) {
  const id = `jar-${slugify(name)}-${size}${idSuffix ? `-${slugify(idSuffix)}` : ""}`;
  const [from, to] = gradient;
  const short = size === "8" ? 26 : 0;

  return (
    <svg
      viewBox="0 0 300 340"
      className={className}
      role="img"
      aria-label={`${name} sea moss gel jar`}
    >
      <defs>
        <linearGradient id={`${id}-gel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={to} />
          <stop offset="55%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="18%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="72%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={`${id}-lid`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9a45a" />
          <stop offset="30%" stopColor="#f0dca8" />
          <stop offset="62%" stopColor="#c9a45a" />
          <stop offset="100%" stopColor="#9c7a34" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-40%" y="-20%" width="180%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#04222a" floodOpacity="0.28" />
        </filter>
      </defs>

      <g filter={`url(#${id}-shadow)`}>
        {/* jar body */}
        <path
          d={`M74 ${118 + short}
              q0 -14 14 -14
              h124 q14 0 14 14
              v${170 - short}
              q0 26 -26 26
              h-100 q-26 0 -26 -26 z`}
          fill={`url(#${id}-gel)`}
        />
        {/* gel surface highlight */}
        <ellipse cx="150" cy={122 + short} rx="70" ry="11" fill="#ffffff" opacity="0.18" />
        {/* glass sheen */}
        <path
          d={`M74 ${118 + short}
              q0 -14 14 -14
              h124 q14 0 14 14
              v${170 - short}
              q0 26 -26 26
              h-100 q-26 0 -26 -26 z`}
          fill={`url(#${id}-glass)`}
        />

        {/* label */}
        <rect
          x="86"
          y={182 + short * 0.6}
          width="128"
          height={86 - short * 0.35}
          rx="10"
          fill="#fdfbf6"
          opacity="0.96"
        />
        <rect x="86" y={182 + short * 0.6} width="128" height="5" rx="2.5" fill={accent} />
        <text
          x="150"
          y={205 + short * 0.6}
          textAnchor="middle"
          fontSize="9"
          letterSpacing="2.6"
          fill="#0a3540"
          fontFamily="system-ui, sans-serif"
          fontWeight="700"
        >
          SEA MOSS ME
        </text>
        <text
          x="150"
          y={228 + short * 0.5}
          textAnchor="middle"
          fontSize="13"
          fill={accent}
          fontFamily="Georgia, serif"
          fontStyle="italic"
        >
          {name.split(" ")[0]}
        </text>
        <text
          x="150"
          y={244 + short * 0.5}
          textAnchor="middle"
          fontSize="13"
          fill={accent}
          fontFamily="Georgia, serif"
          fontStyle="italic"
        >
          {name.split(" ").slice(1).join(" ")}
        </text>
        <text
          x="150"
          y={261 + short * 0.4}
          textAnchor="middle"
          fontSize="7.5"
          letterSpacing="1.6"
          fill="#155a69"
          fontFamily="system-ui, sans-serif"
        >
          {size} OZ · WILDCRAFTED
        </text>

        {/* neck + lid */}
        <rect x="80" y={100 + short} width="140" height="16" rx="6" fill="#0f4653" opacity="0.15" />
        <rect x="72" y={72 + short} width="156" height="34" rx="12" fill={`url(#${id}-lid)`} />
        <rect x="72" y={86 + short} width="156" height="5" fill="#00000018" />
        <rect x="72" y={78 + short} width="156" height="3" fill="#ffffff40" />
      </g>
    </svg>
  );
}

export function JarScene({
  name,
  gradient,
  accent,
  className = "",
  float = true,
  idSuffix,
}: JarArtProps & { float?: boolean }) {
  return (
    <div className={`relative isolate ${className}`}>
      <div
        aria-hidden
        className="animate-drift absolute inset-[8%] -z-10 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 40% 35%, ${gradient[1]}55, transparent 68%)`,
        }}
      />
      <JarArt
        name={name}
        gradient={gradient}
        accent={accent}
        idSuffix={idSuffix}
        className={`w-full drop-shadow-xl ${float ? "animate-float" : ""}`}
      />
    </div>
  );
}
