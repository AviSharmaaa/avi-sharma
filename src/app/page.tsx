import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      <Hero />
      <Projects />
      <Blog />
      <Contact />
    </main>
  );
}
