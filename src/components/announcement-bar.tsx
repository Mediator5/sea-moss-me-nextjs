import { announcements } from "@/lib/site";

export function AnnouncementBar() {
  const items = [...announcements, ...announcements];

  return (
    <div className="relative z-50 overflow-hidden bg-abyss-950 py-2.5 text-sand-100">
      <div className="flex w-max animate-marquee">
        {items.map((text, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-[11px] font-medium tracking-[0.14em] whitespace-nowrap uppercase"
          >
            <span className="size-1 rounded-full bg-flame-400" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
