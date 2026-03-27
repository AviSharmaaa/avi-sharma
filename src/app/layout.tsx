import type { Metadata } from "next";
import { Rajdhani, Hind, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import StoryCanvasWrapper from "@/components/StoryCanvasWrapper";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hind = Hind({
  variable: "--font-hind",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${rajdhani.variable} ${hind.variable} ${playfair.variable} ${geistMono.variable} antialiased font-body`}
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
