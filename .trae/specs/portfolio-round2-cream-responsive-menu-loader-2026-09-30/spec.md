# Portfolio Round 2 — Cream Palette, Menu Overlay, Loader, Card Scroll

## Problem
The portfolio was recently migrated to a dark-brown + orange contact section. User now requests:
- The ENTIRE site's color palette should match the contact section (light cream/beige + orange family, not dark brown)
- Contact section headline "Let's build [word] together" must stay on ONE horizontal line with rotating word between and "together" last
- Remove Instagram and Twitter/X icons from Contact (keep only LinkedIn + GitHub)
- Clicking "≡ Menu" should open a FULL SCREEN overlay menu similar to the reference (cream bg, huge burnt-orange section links stacked: Home / About / Stack / Projects, email at the bottom, CLOSE ✕ top-right)
- Loading page on site visit: typewriter animation of "Rakesh" name (script/cursive or serif italic), pure dark or black background
- As user scrolls down: each section should appear and animate "like a card" on scroll entrance

## Users
Primary: Rakesh (portfolio owner)
Secondary: Recruiters, clients

## Goals
1. Repaint entire site from dark warm brown to the CONTACT palette family — bright cream backgrounds, burnt-orange accents
2. Responsive: every section + navbar + menu works on mobile/tablet/desktop (320px up)
3. Contact headline forced single-line on all breakpoints where possible (allow wrap only on extreme xs) with rotating word center, "together" trailing
4. Contact icon list trimmed to LinkedIn + GitHub only
5. Full-screen Menu Overlay component with close button, big section links, and email reach-out block
6. Typewriter-style initial Loader with Rakesh name, hides after completion + page hydration
7. Scroll-in card-like animation per section (elevate, reveal, or translate as a card)

## Non-Goals
- No changes to profile data in lib/data.ts
- No new NPM dependencies beyond what's installed
- No page routing changes; single-page anchor nav preserved
- No backend/API work

---

## Functional Requirements

### FR-1: Full-site cream/orange palette (match contact family)
- Page body background: warm light cream (~#f5e6d3 or #ede0cc)
- Section panels/bands: slightly different warm cream tones (very subtle cream gradient, no dark brown)
- Text primary: dark warm brown (e.g. #3d1e14 or #2d1810) instead of cream on dark
- Text muted: medium warm brown (#6b3a2a)
- Accent: burnt orange (#e07020 / #c2410c) for CTAs and section heading accents
- Borders: warm tan (#c9a88a / #b08d6f)
- Navbar transparent → semi-opaque cream on scroll
- Contact section gradient is still the most saturated accent; the rest of the site lives in the light cream family that precedes it (the "Menu overlay" cream is the reference)

### FR-2: Contact headline single-line layout
- On md+ screens "Let's build [rotating word] together" must render as ONE unbroken line with inline display
  - "Let's build" → display sans uppercase
  - rotating word → italic serif burnt (inline-block, same line)
  - "together" → display sans uppercase
- On xs-sm screens: allow 2-line break ONLY if viewport cannot fit; rotating word should NOT orphan alone on its line preferentially
- Words do not wrap to 3 lines; use font-size clamp aggressively to keep together
- Rotating word (RotatingWords) still animates properly on the same baseline

### FR-3: Contact section — remove Instagram + Twitter/X
- Social icon list shows ONLY LinkedIn + GitHub (in that order)
- Pill-style icon buttons preserved with same hover/opacity behavior; just fewer of them

### FR-4: Menu overlay (≡ Menu opens full page)
- Click handler on Nav.tsx left "≡ Menu" toggles a `menuOpen` state
- When menuOpen=true: render a fixed inset-0 z-[200] overlay (MenuOverlay component)
- Menu overlay visual design (matches reference image 1):
  - Background color: solid light warm cream (~#f0e1c8 or #ede0cc)
  - Top-right: "CLOSE ✕" button in burnt-orange, mono uppercase, tracking wide, onClick closes
  - Center of the page (main content): a vertically stacked column of huge burnt-orange serif/display anchor links
    - HOME → #hero
    - ABOUT → #about
    - STACK → #stack
    - PROJECTS → #projects
    - CONTACT → #contact
    - Each word is independent line, text-align: CENTER, clamp size ~72-160px
    - Bold burnt-orange accent color; hover darkens or animates scale
  - Below the links (closer to page bottom): a reach-out block, also centered
    - Small uppercase mono eyebrow: "REACH OUT TO ME"
    - Email link: large serif italic burnt-orange mailto:{profile.email}
- Animation: fade + slide-in (framer-motion or CSS) on open/close; no body scroll while menu open (document.body.style.overflow = "hidden" on open)
- Clicking a section link closes the menu and scrolls to anchor
- On mobile: menu items must fit; reduce clamp start size

### FR-5: Initial Loader / Typing intro
- New component `Loader.tsx` (client) rendered at top of page in layout or page
- Behavior:
  - Full viewport overlay, solid black (#000 or very dark brown #0f0805) background
  - Centered content: the name "Rakesh" rendered in PLAYFAIR DISPLAY ITALIC or elegant script-like serif italic, color gold/warm-orange (#e0a050 or #e07020), large clamp size ~40px→96px
  - Typewriter character-by-character reveal with blinking caret ("R" then "Ra" ... then "Rakesh")
  - Brief pause after completion (600ms) then fade out
  - Mounted only once on initial page load; use a hook so navigating back via SPA doesn't re-trigger (use localStorage or react state in page layout)
- During loader visible, hide page content visually (opacity-0 or hidden)

### FR-6: Scroll sections animate "like a card"
- Every <section> (hero, about, stack, projects, contact) gets a scroll-triggered entrance animation that feels like a card being dealt/revealed
- Options (implement whichever fits best):
  - Option A: Each section has a warm cream card container with rounded corners, soft shadow, and on-scroll appears via y:+40 → y:0 + opacity:0→1
  - Option B: Sections translate in slightly like stacked cards, slightly rotate/scale, with 3D perspective
  - Option C: Container has a "card" appearance on a cream page and all content sits in these card panels with white-space/background between
- Use framer-motion whileInView (already installed) or GSAP ScrollTrigger (already installed)
- Must feel responsive on mobile; entrance timing staggered per section, not per card inside sections

### FR-7: Responsiveness across all devices
- All sections verified to have no horizontal overflow at 320px (iPhone SE 1st gen) through 1920px
- Navbar:
  - xs: shrink Menu and CTA labels if needed; name stays visible and centered
  - sm/md/lg: proportions scale up
- Menu overlay items scale smoothly with clamp()
- Projects: grid always stacks to col-1 on mobile, 2-col md+; featured always spans 2 cols in 2-col mode
- Stack: chip wrap always works
- About: image column order correct on mobile (image first, or as-is — no overflow)
- Contact headline on tiny screens uses smaller clamp to try single line, falls back to 2 clean lines

---

## Non-Functional Requirements

### NFR-1 No new deps
- Only use libraries already in package.json: next@14 react@18 framer-motion gsap lucide-react

### NFR-2 Type safety
- All new components typed with TypeScript, no `any`

### NFR-3 Body scroll lock behavior
- Menu open → scroll locked
- Loader visible → scroll locked
- On route/SPA nav normal scroll restored

### NFR-4 Build + Lint
- Build exits 0; lint exits 0

---

## Constraints & Dependencies
- Next.js 14 App Router; loader likely belongs in page.tsx wrapper (to render above <main>) or in layout with a state/context provider
- framer-motion already loaded → use for menu overlay/loader fade, section animations
- gsap ScrollTrigger available if needed for card-scroll effect
- Palette constrained to cream/orange/warm brown family matching reference menu overlay & contact gradient

## Assumptions
- Menu labels: reference shows "Home, Roles, Projects" — we match project sections: HOME, ABOUT, STACK, PROJECTS, CONTACT (5 sections, consistent with current anchors)
- Loader typing "Rakesh" (single name from profile.name) — keep Playfair Display italic, not cursive script (close to reference visual)
- Card scroll = each section gets "card" treatment (rounded corners, soft shadow on cream-page background + framer entrance y:30→0, scale:0.98→1)

## Open Questions
None. Decisions driven from reference images.

---

## Acceptance Criteria

### Rule ACs
- **AC-R1** Palette: body background class/style renders a LIGHT warm cream (not dark brown #2d1810) AND section headings/paragraphs use dark warm brown text.
- **AC-R2** Contact.tsx social array length === 2; labels LinkedIn + GitHub only (no Instagram, no X/Twitter).
- **AC-R3** Contact headline uses `flex flex-nowrap items-baseline` or equivalent in md+, displaying "Let's build", rotating word, "together" on the same single visual line on md/lg/xl (width ≥ 768px); children inline/inline-block not block-stacked.
- **AC-R4** Click on Nav.tsx left Menu toggles state `menuOpen=true` and a fixed inset overlay (MenuOverlay.tsx or inline in Nav) is rendered with z-index > Nav (≥200).
- **AC-R5** MenuOverlay.tsx (or MenuOverlay JSX) contains: top-right "CLOSE" + ✕; center column of 5 section anchor links; bottom "REACH OUT TO ME" eyebrow + mailto email.
- **AC-R6** Menu overlay closes on CLOSE click AND on clicking any of the 5 section anchor links; body scroll is locked while open and restored after close.
- **AC-R7** Loader.tsx component exists and renders full-vp black/very-dark overlay with character-by-character typewriter reveal of string "Rakesh" including a blinking caret, then fades out after completion.
- **AC-R8** Loader renders ONLY on INITIAL site load; SPA-internal navigation (anchors) does not replay it.
- **AC-R9** All sections (Hero, About, Stack, Projects, Contact) have a card-style wrapper (rounded corners + shadow OR 3D-scale entrance) with scroll-triggered entrance (framer whileInView OR GSAP).
- **AC-R10** npm run build exits 0, npm run lint exits 0.
- **AC-R11** (Responsiveness) Layout has no horizontal scroll overflow at width 320px (verified by layout/no-overflow in tailwind classes and test: render at 320w viewport, inspect scrollWidth ≤ clientWidth).

### Rubric ACs
- **AC-U1 Palette cohesion (0-4, threshold 3)**: Degree the whole site feels visually consistent with the reference cream Menu-overlay + contact-gradient family.
  0 = still looks like old dark brown site.
  1 = colors changed but harsh/unbalanced.
  2 = cream + orange applied but some inconsistent dark sections.
  3 = Every section feels unified in cream/light-orange/burnt palette, contact gradient is the accent climax.
  4 = Pixel-palette-accurate to reference cream/orange feeling throughout.
- **AC-U2 Typography single-line contact (0-3, threshold 2)**: How tightly the contact headline tracks as one line on desktop/tablet, and falls back cleanly on mobile.
  0 = 3+ lines on desktop.
  1 = rotating word breaks to own line frequently.
  2 = single line on md+, clean 2-line wrap on sm, rotating word never orphans.
  3 = perfect typographic balance even on small screens via clamp.
- **AC-U3 Menu overlay UX (0-3, threshold 2)**: Faithfulness to the reference menu image.
  0 = missing or no overlay.
  1 = overlay exists but text styles/layout wrong.
  2 = cream bg, 5 stacked center large orange links, close top-right, reach-out bottom; only minor differences from reference.
  3 = matches reference layout pixel-feel (proportions, colors, weights, tracking).
- **AC-U4 Loader typing fidelity (0-3, threshold 2)**: Typewriter feel + fade-out.
  0 = no loader.
  1 = static name + fade.
  2 = character-by-character reveal + caret + pause + fade.
  3 = reference-accurate gold/italic elegant cursive-feel Playfair with smooth timing.
- **AC-U5 Card scroll feel (0-3, threshold 2)**: Section entrance as "cards".
  0 = no animation beyond previous.
  1 = subtle fade only.
  2 = distinct card-like y/scale + shadow reveal on each section scroll.
  3 = strong card-deal / stacked reveal with cohesive easing.
