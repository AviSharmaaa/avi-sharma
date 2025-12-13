"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const blogs = [
   {
    title: "Building an HTTP Server from Scratch",
    summary: "Understanding what happens under the hood by implementing a production-ready HTTP/HTTPS server using raw TCP sockets.",
    date: "Sep 28",
    url: "https://medium.com/@AviSharma.exe/building-an-http-server-from-scratch-understanding-what-happens-under-the-hood-5a081591fb10",
  },
  {
    title: "Flutter State Management Without Drama: Building with Built-in Tools",
    summary: "Building with built-in tools for Flutter state management.",
    date: "Jun 10",
    url: "https://medium.com/@AviSharma.exe/flutter-state-management-without-drama-building-with-built-in-tools",
  },
];

export function Blog() {
  return (
    <section id="blog" className="py-20 container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Writing</h2>
            <p className="text-muted-foreground text-lg">Thoughts on Flutter, Systems, and more.</p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="https://medium.com/@AviSharma.exe" target="_blank">
              View all on Medium <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={blog.url} target="_blank">
                <Card className="group hover:bg-accent/50 transition-colors border-none shadow-none bg-transparent">
                  <CardHeader className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="group-hover:text-primary transition-colors text-xl">
                          {blog.title}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                          {blog.date}
                        </span>
                      </div>
                      <CardDescription className="text-base line-clamp-2">
                        {blog.summary}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <Button variant="outline" asChild className="w-full sm:hidden">
            <Link href="https://medium.com/@AviSharma.exe" target="_blank">
              View all on Medium <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </div>
    </section>
  );
}
