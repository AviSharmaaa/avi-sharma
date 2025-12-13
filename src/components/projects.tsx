"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";

const projects = [
  {
    name: "Http Server",
    description: "Production-ready HTTP/HTTPS server implemented using raw TCP sockets to understand web frameworks under the hood.",
    language: "TypeScript",
    url: "https://github.com/AviSharmaaa/http-server",
  },
  {
    name: "Cursor Chase",
    description: "A Next.js game involving cursor interactions where players collect orbs while avoiding a chaser.",
    language: "TypeScript",
    url: "https://github.com/AviSharmaaa/cursor-chase",
  },
  {
    name: "Light the Gains",
    description: "A Python-based portfolio tracker that connects stock performance to a Tuya Wi-Fi light bulb, visualizing gains and losses in real-time.",
    language: "Python",
    url: "https://github.com/AviSharmaaa/light_the_gains",
  },
  {
    name: "State without drama",
    description: "A Flutter project to implement state management without using any 3rd party libraries.",
    language: "Flutter",
    url: "https://github.com/AviSharmaaa/state_without_drama",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Projects() {
  return (
    <section id="projects" className="py-20 container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
         <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Open Source</h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            A collection of projects I&apos;ve built to explore new technologies and solve interesting problems.
          </p>
        </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="https://github.com/AviSharmaaa" target="_blank">
              View all on GitHub <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.name} variants={item}>
              <TiltCard className="h-full">
                <Card className="h-full flex flex-col hover:border-foreground/50 transition-colors bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{project.name}</CardTitle>
                      <Badge variant="secondary">{project.language}</Badge>
                    </div>
                    <CardDescription className="text-base pt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {/* Additional content could go here */}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={project.url} target="_blank">
                        <Github className="mr-2 h-4 w-4" /> View Source
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
