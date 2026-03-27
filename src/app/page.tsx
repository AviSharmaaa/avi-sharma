import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { ChapterNav } from "@/components/ChapterNav";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary/20">
      <ChapterNav />
      <Hero />
      <Projects />
      <Blog />
      <Contact />
    </main>
  );
}
