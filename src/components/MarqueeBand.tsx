"use client";

const ITEMS = [
  "Software Engineer", "✦", "Open Source", "✦", "TypeScript", "✦",
  "Flutter Dev", "✦", "Problem Solver", "✦", "Questt.ai", "✦",
  "Python", "✦", "React", "✦", "Go", "✦", "नमस्ते", "✦",
];

export function MarqueeBand() {
  const track = [...ITEMS, ...ITEMS];
  return (
    <div
      className="relative overflow-hidden border-y border-[#261809] py-4 select-none"
      style={{ background: "rgba(21, 16, 10, 0.85)" }}
    >
      <div className="marquee-track flex gap-10 w-max">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-display font-bold uppercase text-sm tracking-[0.3em] whitespace-nowrap"
            style={{ color: item === "✦" ? "#9A7820" : item === "नमस्ते" ? "#8C4F30" : "#836048" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
