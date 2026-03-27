# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build production bundle
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

Single-page Next.js 15 portfolio (App Router) with a dark-first design.

**Stack:** Next.js · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · React Three Fiber

### Page Structure

`src/app/page.tsx` assembles four full-width sections in order:
1. **Hero** – animated intro, draggable avatar, CTA buttons
2. **Projects** – 3D tilt cards showcasing open-source work
3. **Blog** – Medium article list with hover effects
4. **Contact** – social links and email CTA

`src/app/layout.tsx` wraps everything in `<FluidBackground>`, which renders a WebGL fluid simulation as the global background layer.

### Key Patterns

**Animations:** Framer Motion is used everywhere — page-load fades, `whileInView` scroll triggers, staggered containers, and the draggable avatar. The `TiltCard` component (`src/components/ui/tilt-card.tsx`) drives rotateX/Y on mouse movement via Framer Motion.

**FluidBackground** (`src/components/FluidBackground.tsx`): A GPU-accelerated fluid simulation using Three.js shaders and a ping-pong framebuffer technique. Runs at 384×384 and responds to pointer movement. Rendered with React Three Fiber inside the root layout.

**UI components** live in `src/components/ui/` and follow the shadcn/ui pattern (style: `new-york`, configured in `components.json`). New primitives should be added there.

**Styling:** Tailwind CSS v4 via `@import 'tailwindcss'` in `globals.css`. Theme tokens (colors, radius) are CSS custom properties defined in that file. Primary accent is `#3453FD`, background is `#020202`. Use the `cn()` helper from `src/lib/utils.ts` for conditional class names.

**Path alias:** `@/*` maps to `src/*`.

### Remote Images

`next.config.mjs` whitelists `media.licdn.com` for Next.js image optimization. Add other remote domains there if needed.
