"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  SiTypescript, SiJavascript, SiGo, SiPython, SiDart, SiHtml5, SiCss3,
  SiReact, SiNextdotjs, SiFlutter, SiTailwindcss, SiNodedotjs,
  SiAmazonwebservices, SiPostgresql, SiFirebase, SiVercel, SiGit,
} from "react-icons/si";
import type { IconType } from "react-icons";

const stats = [
  { label: "Years of Experience", value: 3, suffix: "+", sanskrit: "वर्ष" },
  { label: "Products Shipped", value: 15, suffix: "+", sanskrit: "सृष्टि" },
  { label: "Lines of Code", value: 1, suffix: "M+", sanskrit: "श्लोक" },
];

const skillGroups: { sanskrit: string; label: string; skills: { name: string; Icon: IconType }[] }[] = [
  {
    sanskrit: "वाक्",
    label: "Languages",
    skills: [
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Golang", Icon: SiGo },
      { name: "Python", Icon: SiPython },
      { name: "Dart", Icon: SiDart },
      { name: "HTML", Icon: SiHtml5 },
      { name: "CSS", Icon: SiCss3 },
    ],
  },
  {
    sanskrit: "अस्त्र",
    label: "Frameworks",
    skills: [
      { name: "React.js", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Flutter", Icon: SiFlutter },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "Node.js", Icon: SiNodedotjs },
    ],
  },
  {
    sanskrit: "भूमि",
    label: "Infrastructure",
    skills: [
      { name: "AWS", Icon: SiAmazonwebservices },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Firebase", Icon: SiFirebase },
      { name: "Vercel", Icon: SiVercel },
      { name: "Git", Icon: SiGit },
    ],
  },
];

function CountUp({ to, suffix, inView }: { to: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = to / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span>{count}{suffix}</span>;
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start center"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden flex flex-col justify-center"
    >
      <div
        aria-hidden
        className="chapter-watermark"
        style={{
          fontSize: "clamp(10rem, 22vw, 22rem)",
          top: "-0.15em",
          left: "-0.05em",
        }}
      >
        01
      </div>

      <div className="relative z-10 mx-6 sm:mx-8 md:mx-26 lg:mx-34">
        {/* Heading */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-wider text-white/40">
              PROLOGUE
            </span>
            <div className="accent-line flex-1 max-w-24" />
          </div>
          <h2
            className="font-accent font-bold italic leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            परिचय
          </h2>
          <div className="accent-line mt-6 w-full" />
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-20"
        >
          <p className="font-body text-white/70 text-lg leading-relaxed mb-5">
            I&apos;m a software engineer who finds joy in the craft — whether
            that&apos;s reverse-engineering how something works, shipping a
            product that actually helps people, or building something
            beautifully pointless on a weekend.
          </p>
          <p className="font-body text-white/50 text-base leading-relaxed">
            My stack spans the full spectrum: React and Next.js on the front,
            Golang and Python in the back, Flutter on mobile, and AWS stitching
            it all together. I&apos;ve worked at early-stage startups where
            I&apos;ve worn every hat — from architect to debugger at 2am.
          </p>
        </motion.div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-px sm:border sm:border-[#D4AF37]/10 mb-24"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative p-10 border border-[#D4AF37]/10 flex flex-col gap-3 group hover:border-[#D4AF37]/30 transition-colors duration-500"
            >
              <span className="absolute top-5 right-6 font-accent italic text-[#D4AF37]/20 text-sm group-hover:text-[#D4AF37]/40 transition-colors duration-500">
                {stat.sanskrit}
              </span>
              <div
                className="font-accent font-bold italic leading-none"
                style={{
                  fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                  color: "#D4AF37",
                }}
              >
                <CountUp
                  to={stat.value}
                  suffix={stat.suffix}
                  inView={statsInView}
                />
              </div>
              <div
                className="w-8 h-px"
                style={{
                  background: "linear-gradient(to right, #DC143C, #D4AF37)",
                }}
              />
              <span className="font-display font-bold uppercase tracking-[0.2em] text-white/50 text-xs group-hover:text-white/70 transition-colors duration-500">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <div ref={skillsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="font-mono text-xs tracking-wider text-white/40">
              SHASTRA
            </span>
            <div className="accent-line flex-1 max-w-24" />
          </motion.div>

          <div className="space-y-8">
            {skillGroups.map((group, gi) => (
              <motion.div
                key={group.sanskrit}
                initial={{ opacity: 0, x: -20 }}
                animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: gi * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
              >
                {/* Category label */}
                <div className="flex sm:flex-col items-baseline sm:items-start gap-2 sm:gap-0.5 min-w-36">
                  <span
                    className="font-accent italic text-[#D4AF37] leading-none"
                    style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}
                  >
                    {group.sanskrit}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-white/30 uppercase sm:mt-1.5">
                    {group.label}
                  </span>
                </div>

                {/* Divider — vertical on desktop */}
                <div
                  className="hidden sm:block w-px self-stretch"
                  style={{
                    background:
                      "linear-gradient(to bottom, #DC143C, #D4AF37 60%, transparent)",
                  }}
                />

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map(({ name, Icon }, si) => (
                    <motion.span
                      key={name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: gi * 0.1 + si * 0.055,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-center gap-2 px-4 py-1.5 font-mono text-xs tracking-wider text-white border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 hover:text-white transition-all duration-300 cursor-default"
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      {name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
