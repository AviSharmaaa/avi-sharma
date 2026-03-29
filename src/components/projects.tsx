"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";

const projects = [
  {
    number: "01",
    name: "FAAA",
    description:
      "VS Code extension that plays a sound whenever a terminal command fails. Uses VS Code's Shell Integration to detect non-zero exit codes.",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 9,
    downloads: "15k+",
    url: "https://github.com/AviSharmaaa/faaa",
    liveUrl: "https://open-vsx.org/extension/AviSharma/faaa",
  },
  {
    number: "02",
    name: "Http Server",
    description:
      "HTTP/HTTPS server built from raw TCP and TLS sockets — routing, middleware, compression, and security without any framework.",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 1,
    url: "https://github.com/AviSharmaaa/http-server",
  },
  {
    number: "03",
    name: "Cursor Chase",
    description:
      "Browser game where you collect orbs while dodging an AI cursor chaser. Built with Next.js and Framer Motion.",
    language: "TypeScript",
    languageColor: "#3178C6",
    stars: 0,
    url: "https://github.com/AviSharmaaa/cursor-chase",
    liveUrl: "https://cursor-chase-sage.vercel.app/",
  },
  {
    number: "04",
    name: "Light the Gains",
    description:
      "Stock portfolio tracker that syncs live market data with a Tuya smart bulb — green for gains, red for losses. Auto-refreshes every 10 minutes.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 1,
    url: "https://github.com/AviSharmaaa/light_the_gains",
  },
  {
    number: "05",
    name: "Nimbus",
    description:
      "Animated ASCII weather app for the terminal. Renders dynamic rain, snow, and sunshine scenes using curses with real-time data from wttr.in.",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    url: "https://github.com/AviSharmaaa/nimbus",
  },
  {
    number: "06",
    name: "Hands Off Village",
    description:
      "ADB-based automation for Clash of Clans — keeps the screen awake and collects resources at fixed intervals, no root required.",
    language: "Shell",
    languageColor: "#89E051",
    stars: 0,
    url: "https://github.com/AviSharmaaa/hands-off-village",
  },
];

type Project = (typeof projects)[number] & { liveUrl?: string; downloads?: string };

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(212,175,55,0.10) 0%, transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rotateX.set(
      (-(e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 12,
    );
    rotateY.set(
      ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 12,
    );
    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative story-card p-7 h-full flex flex-col cursor-pointer"
        onClick={() => window.open(project.url, "_blank")}
      >
        <motion.div
          style={{ background: glareBackground }}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="flex items-start justify-between mb-6">
          <span
            className="font-accent font-bold italic text-[#DC143C]/15 leading-none tracking-tight select-none"
            style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
          >
            {project.number}
          </span>
          <div className="flex flex-col items-end gap-2 mt-2">
            <span
              className="font-mono text-xs tracking-wider px-3 py-1"
              style={{
                border: `1px solid ${project.languageColor}25`,
                color: project.languageColor,
                background: `${project.languageColor}08`,
              }}
            >
              {project.language}
            </span>
            {project.downloads && (
              <span className="flex items-center gap-1 font-mono text-xs text-[#D4AF37] tracking-wide">
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v10M4 7l4 4 4-4M2 14h12" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {project.downloads}
              </span>
            )}
            {project.stars > 0 && (
              <span className="flex items-center gap-1 font-mono text-xs text-[#D4AF37] tracking-wide">
                <svg className="w-3 h-3 fill-[#D4AF37]" viewBox="0 0 16 16">
                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.836 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                </svg>
                {project.stars}
              </span>
            )}
          </div>
        </div>

        <h3
          className="font-display font-bold uppercase tracking-tight mb-3 text-white group-hover:text-[#D4AF37] transition-colors duration-400"
          style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
        >
          {project.name}
        </h3>

        <p className="font-body text-white/60 text-sm leading-relaxed flex-1 mb-6">
          {project.description}
        </p>

        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2 text-[#D4AF37] font-display text-xs uppercase tracking-[0.25em] group-hover:gap-4 transition-all duration-300">
            View Source
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2 7 L12 7 M8 3 L12 7 L8 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex items-center gap-2 text-[#DC143C] font-display text-xs uppercase tracking-[0.25em] hover:text-white transition-colors duration-300"
            >
              Try It
              <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 11 L11 3 M5 3 L11 3 L11 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center"
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
        02
      </div>

      <div className="relative z-10 mx-6 sm:mx-8 md:mx-26 lg:mx-34">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-wider text-white/40">
              PARVA II
            </span>
            <div className="accent-line flex-1 max-w-24" />
          </div>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              className="font-accent font-bold italic leading-[0.9] tracking-tight text-white"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              कर्मक्षेत्र
            </h2>
            <Link
              href="https://github.com/AviSharmaaa"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 font-display text-sm uppercase tracking-[0.18em] border border-[#D4AF37]/25 text-[#D4AF37] hover:border-[#D4AF37] hover:text-white transition-colors duration-300 mb-2"
            >
              View All on GitHub
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7 L12 7 M8 3 L12 7 L8 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <div className="accent-line mt-6 w-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 sm:hidden"
        >
          <Link
            href="https://github.com/AviSharmaaa"
            target="_blank"
            className="flex items-center justify-center gap-2 py-3.5 font-display text-sm uppercase tracking-[0.18em] border border-[#D4AF37]/35 text-[#D4AF37] w-full"
          >
            View All on GitHub
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
