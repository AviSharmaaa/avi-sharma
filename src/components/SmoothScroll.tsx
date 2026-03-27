"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SECTION_IDS = ["hero", "projects", "blog", "contact"];

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Snap-to-section logic
    let snapTimeout: ReturnType<typeof setTimeout> | null = null;
    let isSnapping = false;

    const getClosestSection = () => {
      const viewportH = window.innerHeight;
      const scrollY = window.scrollY;
      let closest: HTMLElement | null = null;
      let closestDist = Infinity;

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        // Only snap if within 40% of viewport height
        if (dist < viewportH * 0.4 && dist < closestDist) {
          closestDist = dist;
          closest = el;
        }
      }
      return closest;
    };

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      if (isSnapping) return;

      if (snapTimeout) clearTimeout(snapTimeout);

      // When velocity is nearly zero, user stopped scrolling — snap
      if (Math.abs(velocity) < 0.3) {
        snapTimeout = setTimeout(() => {
          const target = getClosestSection();
          if (target) {
            const rect = target.getBoundingClientRect();
            if (Math.abs(rect.top) > 2) {
              isSnapping = true;
              lenis.scrollTo(target, {
                duration: 0.8,
                easing: (t: number) => 1 - Math.pow(1 - t, 3),
                onComplete: () => { isSnapping = false; },
              });
            }
          }
        }, 80);
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      if (snapTimeout) clearTimeout(snapTimeout);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
