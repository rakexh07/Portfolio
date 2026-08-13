# Rakesh — Portfolio (Next.js)

A 3D scroll portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and GSAP ScrollTrigger.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Build for production

```bash
npm run build
npm start
```

## Project structure

- `app/` — root layout, global styles, and the main page
- `components/` — Nav, Hero, Quote, BuildLog, Stack, Projects, Ticker, Education, Contact
- `lib/data.ts` — all resume content (internships, projects, stack, certifications, education) in one typed file — edit this to update the site's content
- `public/hero.png` — hero portrait image

## Tech

- Next.js 14 (patched 14.2.35)
- React 18 + TypeScript
- Tailwind CSS (design tokens in `tailwind.config.ts`)
- Framer Motion (scroll reveals, 3D hover tilt)
- GSAP + ScrollTrigger (pinned horizontal "Build Log" scroll effect)

## Deploying

Works out of the box on Vercel, Netlify, or any Node host:

```bash
vercel deploy
```
