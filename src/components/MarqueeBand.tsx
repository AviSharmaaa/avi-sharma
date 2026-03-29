"use client";

const ITEMS = [
  "Software Engineer", "✦", "कर्मण्येवाधिकारस्ते", "✦", "TypeScript", "✦",
  "Open Source", "✦", "धर्मो रक्षति रक्षितः", "✦", "Python", "✦",
  "React", "✦", "Flutter Dev", "✦", "विजयते", "✦", "Questt.ai", "✦",
];

export function MarqueeBand() {
  const track = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative overflow-hidden border-y border-[#2A2420] py-4 select-none"
      style={{ background: "rgba(22, 18, 16, 0.85)" }}
    >
      <div className="marquee-track flex gap-10 w-max">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-display font-bold uppercase text-sm tracking-[0.3em] whitespace-nowrap"
            style={{ color: item === "✦" ? "#D4AF37" : /[\u0900-\u097F]/.test(item) ? "#DC143C" : "rgba(255,255,255,0.5)" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
