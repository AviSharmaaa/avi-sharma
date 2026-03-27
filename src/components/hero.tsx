"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { FaMedium } from "react-icons/fa6";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />

      {/* Giant ghost name */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <motion.span
          style={{ y: titleY, opacity: titleOpacity }}
          className="font-accent font-black italic leading-none tracking-tighter"
          initial={{ fontSize: "clamp(12rem, 30vw, 38rem)", color: "rgba(48, 227, 202, 0.03)" }}
        >
          AVI
        </motion.span>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
            {/* Greeting */}
            <motion.div
              variants={fadeUp}
              style={{ y: subtitleY }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="font-accent text-[#30E3CA] tracking-widest text-lg italic">
                नमस्ते
              </span>
              <div className="h-px w-12 bg-[#30E3CA]/40" />
            </motion.div>

            {/* Main title */}
            <motion.div style={{ y: titleY, opacity: titleOpacity }}>
              <motion.h1
                variants={fadeUp}
                className="font-accent font-black italic leading-[0.9] tracking-tight mb-6"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
              >
                <span className="block text-[#E4E0EE]">Avi Sharma</span>
              </motion.h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={fadeUp} style={{ y: subtitleY }}>
              <p
                className="font-display font-bold uppercase tracking-[0.3em] text-[#E94560] mb-3"
                style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.3rem)" }}
              >
                Software Engineer
              </p>
              <p className="font-display font-light uppercase tracking-[0.2em] text-[#9994AD] text-sm mb-8">
                @ Questt AI
              </p>
            </motion.div>

            {/* Diamond divider */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
              <div className="h-px w-16 bg-linear-to-r from-transparent to-[#30E3CA]/30" />
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="#30E3CA" fillOpacity="0.6" />
              </svg>
              <div className="h-px w-16 bg-linear-to-l from-transparent to-[#30E3CA]/30" />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="font-body text-[#A8A3B8] text-lg leading-relaxed max-w-lg mb-12"
            >
              Give me a black box and I&apos;ll open it. Give me a weekend and I&apos;ll build something beautifully pointless.{" "}
              <span className="text-[#50EDD5]">
                Iced cappuccino in hand, always.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 items-center justify-center mb-8"
            >
              <MagneticButton>
                <Link
                  href="#contact"
                  className="group relative inline-flex items-center gap-2 px-8 py-3.5 font-display font-bold text-sm uppercase tracking-[0.15em] border border-[#E94560] text-[#E4E0EE] hover:bg-[#E94560] hover:text-[#080B16] transition-all duration-400"
                >
                  <span>Get in Touch</span>
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8 L13 8 M9 4 L13 8 L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="https://github.com/AviSharmaaa"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-8 py-3.5 font-display font-bold text-sm uppercase tracking-[0.15em] border border-[#30E3CA]/30 text-[#30E3CA] hover:border-[#30E3CA] hover:text-[#E4E0EE] transition-colors duration-300"
                >
                  <FiGithub className="w-4 h-4" /> GitHub
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="https://medium.com/@AviSharmaaa"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-8 py-3.5 font-display font-bold text-sm uppercase tracking-[0.15em] border border-[#30E3CA]/30 text-[#30E3CA] hover:border-[#30E3CA] hover:text-[#E4E0EE] transition-colors duration-300"
                >
                  <FaMedium className="w-4 h-4" /> Medium
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Tech tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
              {["TypeScript", "Python", "Flutter", "Next.js", "React"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs tracking-wider px-3 py-1.5 border border-[#252547] text-[#9994AD]"
                    style={{ background: "rgba(16,19,42,0.5)" }}
                  >
                    {tech}
                  </span>
                )
              )}
            </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator"
      >
        <span className="font-display text-xs uppercase tracking-[0.3em] text-[#8B87A0]">
          Scroll
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-[#30E3CA]/70">
          <path d="M8 4 L8 16 M4 12 L8 16 L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
