"use client";

import { Button } from "@/components/ui/button";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
            >
                <h2 className="text-3xl font-bold tracking-tight">Let&apos;s Connect</h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                    Feel free to reach out for collaborations, questions, or just to say hi!
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex justify-center gap-6"
            >
                <Link href="https://github.com/AviSharmaaa" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                    <FiGithub className="h-8 w-8" />
                    <span className="sr-only">GitHub</span>
                </Link>
                <Link href="https://www.linkedin.com/in/avisharma05/" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                    <FiLinkedin className="h-8 w-8" />
                    <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="https://x.com/avisharmaaaa" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                    <RiTwitterXFill className="h-8 w-8" />
                    <span className="sr-only">X (Twitter)</span>
                </Link>
                 <Link href="https://medium.com/@AviSharma.exe" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Mail className="h-8 w-8" /> {/* Using Mail icon as placeholder for generic contact/medium since email isn't explicit */}
                    <span className="sr-only">Medium</span>
                </Link>
            </motion.div>

             <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
             >
                <Button asChild variant="default" size="lg" className="rounded-full mt-4">
                    <Link href="mailto:hello@example.com"> {/* Placeholder email */}
                        Send me an email
                    </Link>
                </Button>
             </motion.div>
             <p className="text-sm text-muted-foreground pt-10">
                © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Avi Sharma. All rights reserved.
             </p>
        </div>
    </section>
  );
}
