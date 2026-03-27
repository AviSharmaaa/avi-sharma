import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$✦◆";

export function useTextScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const total = text.length * 3;

    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (!/[A-Za-z0-9]/.test(char)) return char;
            if (i < Math.floor(frame / 3)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      frame++;
      if (frame <= total) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, text]);

  return display;
}
