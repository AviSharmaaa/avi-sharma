"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CHAPTERS = [
  { id: "hero", label: "प्रस्तावना" },
  { id: "experience", label: "I · रणभूमि" },
  { id: "projects", label: "II · कर्मक्षेत्र" },
  { id: "blog", label: "III · ज्ञानसार" },
  { id: "contact", label: "IV · संवाद" },
];

export function ChapterNav() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ratioMap = new Map<string, number>();

    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          ratioMap.set(id, entry.intersectionRatio);
          let best = "hero";
          let bestRatio = -1;
          ratioMap.forEach((ratio, key) => {
            if (ratio > bestRatio) { bestRatio = ratio; best = key; }
          });
          setActive(best);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    observerRef.current = observers[0] ?? null;
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav aria-label="Chapter navigation" className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-6">
      {CHAPTERS.map(({ id, label }) => {
        const isActive = active === id;
        const isHovered = hovered === id;

        return (
          <div key={id} className="relative flex items-center" onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)}>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.2 }}
                className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                style={{
                  background: "rgba(12,10,8,0.9)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  padding: "4px 10px",
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                }}
              >
                {label}
              </motion.div>
            )}

            <button
              onClick={() => scrollTo(id)}
              aria-label={`Navigate to ${label}`}
              className="flex items-center justify-center transition-all duration-300"
              style={{ width: isActive ? 14 : 6, height: isActive ? 14 : 6 }}
            >
              {isActive ? (
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path d="M7 0 L14 7 L7 14 L0 7 Z" fill="#DC143C" />
                  <path d="M7 3.5 L10.5 7 L7 10.5 L3.5 7 Z" fill="#D4AF37" fillOpacity="0.9" />
                </svg>
              ) : (
                <div
                  className="rounded-full transition-colors duration-300"
                  style={{
                    width: 6, height: 6,
                    background: isHovered ? "rgba(212, 175, 55, 0.6)" : "rgba(255, 255, 255, 0.2)",
                  }}
                />
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
