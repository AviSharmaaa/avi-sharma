import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { ChapterNav } from "@/components/ChapterNav";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Avi Sharma",
  url: "https://www.avisharma.xyz",
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Questt AI",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Graphic Era University",
  },
  knowsAbout: [
    "React.js", "Next.js", "TypeScript", "Golang", "Flutter",
    "AWS", "PostgreSQL", "Node.js", "Tailwind CSS",
  ],
  sameAs: [
    "https://github.com/AviSharmaaa",
    "https://medium.com/@AviSharmaaa",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen text-foreground overflow-x-hidden selection:bg-primary/20">
        <ChapterNav />
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </main>
    </>
  );
}
