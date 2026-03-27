"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const dotX = useSpring(cursorX, { damping: 28, stiffness: 400, mass: 0.5 });
  const dotY = useSpring(cursorY, { damping: 28, stiffness: 400, mass: 0.5 });

  const ringX = useSpring(cursorX, { damping: 45, stiffness: 180, mass: 0.8 });
  const ringY = useSpring(cursorY, { damping: 45, stiffness: 180, mass: 0.8 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnterInteractive = () => setIsHovering(true);
    const onLeaveInteractive = () => setIsHovering(false);

    const interactives = document.querySelectorAll("a, button, [role='button'], [draggable]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#30E3CA]/50"
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          width: isHovering ? 48 : 36,
          height: isHovering ? 48 : 36,
          borderColor: isHovering ? "rgba(233, 69, 96, 0.7)" : "rgba(48, 227, 202, 0.5)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#E94560]"
        style={{
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          width: isHovering ? 6 : 5,
          height: isHovering ? 6 : 5,
          transition: "width 0.2s, height 0.2s",
        }}
      />
    </>
  );
}
