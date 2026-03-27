"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const blogs = [
  { title: "Building an HTTP Server from Scratch", summary: "Understanding what happens under the hood by implementing a production-ready HTTP/HTTPS server using raw TCP sockets.", date: "Sep 28", year: "2024", readTime: "8 min read", url: "https://medium.com/@AviSharmaaa/building-an-http-server-from-scratch-understanding-what-happens-under-the-hood-5a081591fb10" },
  { title: "How That Little Dot Moves on Zomato", summary: "Real-time location tracking without a single page refresh — exploring WebSockets, event streams, and live map updates.", date: "Oct 15", year: "2024", readTime: "7 min read", url: "https://medium.com/@AviSharmaaa/how-that-little-dot-moves-on-zomato-real-time-location-tracking-without-a-single-page-refresh-622dfc8170b7" },
  { title: "Flutter State Management Without Drama", summary: "Building with built-in tools for Flutter state management — no third-party library required.", date: "Jun 10", year: "2024", readTime: "6 min read", url: "https://medium.com/@AviSharmaaa/flutter-state-management-without-drama-building-with-built-in-tools-c69598519351" },
  { title: "How I Built a Shell Script to Stay Online in Clash of Clans", summary: "Never lose another resource — an ADB automation script that keeps the game running and collects loot on autopilot.", date: "May 20", year: "2024", readTime: "5 min read", url: "https://medium.com/@AviSharmaaa/how-i-built-a-shell-script-to-stay-online-in-clash-of-clans-and-never-lose-another-resource-9ab6f0711149" },
];

export function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start center"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section id="blog" ref={sectionRef} className="relative min-h-screen py-32 overflow-hidden flex flex-col justify-center">
      <div aria-hidden className="chapter-watermark" style={{ fontSize: "clamp(10rem, 22vw, 22rem)", top: "-0.15em", left: "-0.05em" }}>02</div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div style={{ y: headingY, opacity: headingOpacity }} className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-wider text-[#8B87A0]">CHAPTER II</span>
            <div className="accent-line flex-1 max-w-24" />
          </div>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2 className="font-accent font-black italic leading-[0.9] tracking-tight text-[#E4E0EE]" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>Writings</h2>
            <Link href="https://medium.com/@AviSharmaaa" target="_blank" className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 font-display text-sm uppercase tracking-[0.18em] border border-[#30E3CA]/25 text-[#30E3CA] hover:border-[#30E3CA] hover:text-[#E4E0EE] transition-colors duration-300 mb-2">
              All on Medium
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none"><path d="M2 7 L12 7 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
          <div className="accent-line mt-6 w-full" />
        </motion.div>

        <div className="space-y-8">
          {blogs.map((blog, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}>
              <Link href={blog.url} target="_blank" className="group block">
                <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.3, ease: "easeOut" }} className="relative story-card p-8 lg:p-10">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom, #E94560, #30E3CA, transparent)" }} />

                  <div className="flex gap-8 lg:gap-12 items-start">
                    <div className="hidden sm:flex flex-col items-center min-w-20 pt-1">
                      <span className="font-accent font-black italic text-[#E94560]/25 leading-none tracking-tight" style={{ fontSize: "3.5rem" }}>
                        {blog.date.split(" ")[1] || blog.date}
                      </span>
                      <span className="font-display text-xs uppercase tracking-[0.2em] text-[#8B87A0] mt-1">
                        {blog.date.split(" ")[0]}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs tracking-wider text-[#8B87A0]">{blog.year}</span>
                        <span className="w-1 h-1 rounded-full bg-[#30E3CA]/30" />
                        <span className="font-mono text-xs tracking-wider text-[#8B87A0]">{blog.readTime}</span>
                        <span className="sm:hidden font-mono text-xs tracking-wider text-[#8B87A0] ml-auto">{blog.date}</span>
                      </div>

                      <h3 className="font-accent font-bold italic tracking-tight text-[#E4E0EE] group-hover:text-[#30E3CA] transition-colors duration-400 leading-tight mb-3" style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.7rem)" }}>
                        {blog.title}
                      </h3>

                      <p className="font-body text-[#A8A3B8] text-sm leading-relaxed mb-5">{blog.summary}</p>

                      <div className="flex items-center gap-2 text-[#FF6B81] font-display text-xs uppercase tracking-[0.25em] group-hover:gap-4 transition-all duration-300">
                        Read Article
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7 L12 7 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 sm:hidden">
          <Link href="https://medium.com/@AviSharmaaa" target="_blank" className="flex items-center justify-center gap-2 py-3.5 font-display text-sm uppercase tracking-[0.18em] border border-[#30E3CA]/35 text-[#30E3CA] w-full">All on Medium</Link>
        </motion.div>
      </div>
    </section>
  );
}
