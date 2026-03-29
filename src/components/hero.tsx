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
  hidden: { opacity: 0, y: 40 },
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
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-40" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute top-8 left-0 right-0 z-10 text-center"
      >
        <p className="font-accent italic text-white text-sm tracking-wide">
          कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-white/40 mt-1.5 uppercase">
          Bhagavad Gita · Shloka 2.47
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.h1
            variants={fadeUp}
            className="font-accent font-bold italic leading-[0.85] tracking-tight"
            style={{ y: titleY, opacity: titleOpacity, fontSize: "clamp(3rem, 14vw, 14rem)" }}
          >
            <span className="gold-shimmer">Avi Sharma</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-display font-bold uppercase tracking-[0.35em] text-[#DC143C] mt-6"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.1rem)" }}
          >
            SDE 2 · Questt AI
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute bottom-0 left-0 right-0 z-10 mx-6 sm:mx-8 md:mx-26 lg:mx-34 pb-10"
      >
        <div>
          <div className="accent-line mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <motion.p variants={fadeUp} className="font-body text-white/60 text-sm leading-relaxed max-w-md text-center sm:text-left">
              Give me a black box and I&apos;ll open it. Give me a weekend and I&apos;ll build something beautifully pointless.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <MagneticButton>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 font-display font-bold text-xs uppercase tracking-[0.15em] border border-[#DC143C] text-white hover:bg-[#DC143C] hover:text-white transition-all duration-400"
                >
                  Get in Touch
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="https://github.com/AviSharmaaa" target="_blank" className="flex items-center justify-center w-10 h-10 border border-[#D4AF37]/30 text-white/70 hover:border-[#D4AF37] hover:text-white transition-colors duration-300">
                  <FiGithub className="w-4 h-4" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="https://medium.com/@AviSharmaaa" target="_blank" className="flex items-center justify-center w-10 h-10 border border-[#D4AF37]/30 text-white/70 hover:border-[#D4AF37] hover:text-white transition-colors duration-300">
                  <FaMedium className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="flex justify-center mt-8 scroll-indicator"
        >
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-[#D4AF37]/50">
            <path d="M8 4 L8 16 M4 12 L8 16 L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
