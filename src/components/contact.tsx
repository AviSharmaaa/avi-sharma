"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { FaMedium } from "react-icons/fa6";
import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/AviSharmaaa", icon: FiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/avisharma05/", icon: FiLinkedin },
  { label: "X", href: "https://x.com/avisharmaaaa", icon: RiTwitterXFill },
  { label: "Medium", href: "https://medium.com/@AviSharmaaa", icon: FaMedium },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start center"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen py-16 overflow-hidden flex flex-col justify-center" style={{ background: "rgba(12, 10, 8, 0.5)" }}>
      <div aria-hidden className="chapter-watermark" style={{ fontSize: "clamp(10rem, 22vw, 22rem)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>04</div>

      <div className="relative z-10 mx-16 md:mx-26 lg:mx-34 text-center">
        <motion.div style={{ y: headingY, opacity: headingOpacity }} className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-[#D4AF37]/30" />
            <span className="font-mono text-xs tracking-wider text-white/40">PARVA IV</span>
            <div className="h-px w-8 bg-[#D4AF37]/30" />
          </div>

          <h2 className="font-accent font-bold italic leading-[0.9] tracking-tight mb-6" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
            <span className="gold-shimmer">संवाद</span>
          </h2>

          <p className="font-body text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            Feel free to reach out for collaborations, questions, or just to say{" "}
            <span className="text-[#D4AF37] font-accent italic">namaste</span>.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <Link href="mailto:hello@example.com" className="group relative inline-flex items-center gap-3 px-12 py-5 font-display font-bold text-base uppercase tracking-[0.2em] border border-[#DC143C] text-white hover:bg-[#DC143C] transition-all duration-400">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <path d="M2 4h16v12H2V4zm0 0l8 7 8-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Send Me an Email</span>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="accent-line-center mb-14 max-w-sm mx-auto" />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="flex justify-center gap-5 mb-10">
          {socials.map((s) => (
            <Link key={s.label} href={s.href} target="_blank" aria-label={s.label} className="group relative flex items-center justify-center w-14 h-14 border border-[#D4AF37]/20 text-white/50 hover:text-white hover:border-[#D4AF37]/50 transition-all duration-300" style={{ background: "rgba(22,18,16,0.5)" }}>
              <s.icon className="relative z-10 w-5 h-5" />
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-wider text-white/0 group-hover:text-white/50 transition-colors whitespace-nowrap">{s.label}</span>
            </Link>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="border-t border-[#2A2420]/60 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {[...Array(3)].map((_, i) => (
              <svg key={i} width="6" height="6" viewBox="0 0 6 6">
                <path d="M3 0 L6 3 L3 6 L0 3 Z" fill="#D4AF37" fillOpacity={0.15 + i * 0.1} />
              </svg>
            ))}
          </div>
          <p className="font-mono text-xs tracking-wider text-white/40">
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Avi Sharma &middot; Built with passion in India
          </p>
        </motion.div>
      </div>
    </section>
  );
}
