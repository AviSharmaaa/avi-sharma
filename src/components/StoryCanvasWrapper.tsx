"use client";

import dynamic from "next/dynamic";

const StoryCanvas = dynamic(() => import("@/components/StoryCanvas"), {
  ssr: false,
});

export default function StoryCanvasWrapper() {
  return <StoryCanvas />;
}
