import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import StoryCanvasWrapper from "@/components/StoryCanvasWrapper";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const BASE_URL = "https://www.avisharma.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Avi Sharma — Software Engineer",
    template: "%s | Avi Sharma",
  },
  description:
    "Software Engineer (SDE 2) at Questt AI. I build fast, thoughtful products across React, Next.js, Golang, Flutter, and AWS. Open-source contributor with 15+ shipped products.",
  keywords: [
    "Avi Sharma",
    "Software Engineer",
    "SDE 2",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Golang",
    "Flutter",
    "Full Stack Engineer",
    "Questt AI",
    "Portfolio",
    "Open Source",
    "TypeScript",
    "AWS",
  ],
  authors: [{ name: "Avi Sharma", url: BASE_URL }],
  creator: "Avi Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Avi Sharma",
    title: "Avi Sharma — Software Engineer",
    description:
      "Software Engineer (SDE 2) at Questt AI. Building fast, thoughtful products across React, Next.js, Golang, Flutter, and AWS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avi Sharma — Software Engineer",
    description:
      "Software Engineer (SDE 2) at Questt AI. Building fast, thoughtful products across React, Next.js, Golang, Flutter, and AWS.",
    creator: "@AviSharmaaa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} antialiased font-body`}
      >
        <StoryCanvasWrapper />
        <div className="grain-overlay" aria-hidden="true" />
        <CustomCursor />
        <SmoothScroll>
          <div className="relative z-1">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
