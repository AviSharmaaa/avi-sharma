"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 order-2 md:order-1"
        >
          <div className="space-y-2">
            <h2 className="text-lg text-primary font-medium tracking-wide">
              Hello, I&apos;m
            </h2>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Avi Sharma
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-light">
              Software Engineer @ Questt AI
            </p>
          </div>

          <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-xl">
           Iced Cappuccino–powered problem solver with a flexible toolbox. If it needs doing, I’ll figure it out and make it happen.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
              <Link href="#contact">
                Get in touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link href="https://github.com/AviSharmaaa" target="_blank">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link href="https://medium.com/@AviSharma.exe" target="_blank">
                <FileText className="mr-2 h-4 w-4" /> Medium
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center md:justify-end"
        >
          <motion.div 
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.2}
            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/20 cursor-grab active:cursor-grabbing"
          >
            <Image
              src="/avatar.svg"
              alt="Avi Sharma"
              fill
              className="object-cover"
              priority
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
