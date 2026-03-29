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

export const metadata: Metadata = {
  title: "Avi Sharma | Portfolio",
  description:
    "I build things, break them, fix them, and call it a productive day.",
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
