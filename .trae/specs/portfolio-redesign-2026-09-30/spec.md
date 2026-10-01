# Portfolio Redesign Specification

## Problem
The current portfolio uses a dark minimalist (#0a0a0a) theme with generic section structure. User wants a redesign inspired by reference screenshots showing:
- Warm orange/red/brown color palette (instead of cool black)
- Editorial serif-font aesthetic with "name centered in navbar" pattern
- "FEATURED WORKS" project showcase with visual previews instead of numbered cards
- "Let's build [rotating word] together" hero/contact pattern with rotating words: systems, ideas, visions, impact
- Orange gradient contact section with contact info on right side

## Users
Primary: Rakesh (portfolio owner)
Secondary: Recruiters, clients, professional contacts viewing the portfolio

## Goals
1. Implement new warm color theme across entire site (brown, orange, cream accents)
2. Redesign navbar with left "Menu", center serif name "Rakesh", right "Let's chat" CTA
3. Remove all eyebrow/small section headings (About, Tech Stack, etc.)
4. Redesign Tech Stack section visual style
5. Redesign Projects: remove numbering, use "FEATURED WORKS" heading, card-based previews
6. Add rotating word animation: "Let's build [systems|ideas|visions|impact] together"
7. Redesign Contact section with orange gradient bg, email right-aligned, social icons

## Non-Goals
- No changes to data/content in lib/data.ts (profile name, projects, etc.)
- No new dependencies beyond what's already installed (framer-motion, gsap, lucide-react already present)
- No multi-page routing; keep single-page anchor navigation
- No backend/API changes

---

## Functional Requirements

### FR-1 Color Theme Overhaul
- Replace dark (#0a0a0a) palette with warm brown/orange palette
- Page background: warm dark brown (#3d1e14 or #2d1810 range)
- Panel backgrounds: slightly lighter warm brown
- Accent: warm cream/off-white text
- Primary accent: burnt orange / terracotta
- Contact section: radial orange-to-deep-red gradient background

### FR-2 Navbar Redesign
- Layout: 3-column flex (left | center | right)
- Left: "Menu" label with hamburger icon (≡)
- Center: "Rakesh" rendered in italic serif font (like "GargiBhardwaj" in ref image)
- Right: "Let's chat →" CTA link pointing to #contact
- Transparent-to-solid scrolled behavior preserved
- Remove current pill-style centered nav links

### FR-3 Remove Section Eyebrows
- Remove eyebrow text from SectionHead usage in About, Stack, Projects
- Remove "05 — Contact" eyebrow from Contact section
- Keep main section titles but adjust styling to match new theme

### FR-4 Tech Stack Redesign
- Replace current grid-of-cards logo layout with a new visual style
- Options: tag cloud style, horizontal grouped pills, or minimalist text-heavy layout
- Integrate with warm color theme; no grayscale filter requirement
- Keep layered grouping (Frontend, Backend, Data, Cloud & DevOps)

### FR-5 Projects Section Redesign
- Heading: "FEATURED WORKS" (large, bold, centered or editorial style)
- Remove "01/02/03" numbering from every project card
- Use horizontal featured layout: one large featured card + two smaller cards below (per ref image pattern)
- Each card should show: project name, tag label, small preview area (colored/placeholder block)
- Preserve click-through to repo URLs and stack tech labels

### FR-6 Rotating Word Animation ("Let's build...")
- Location: Hero section (prominent) OR Contact section (before footer)
- Structure: "Let's build" (bold sans) → [word] (italic serif, large) → "together" (bold sans)
- Word cycle: systems → ideas → visions → impact (loop)
- Smooth fade/wipe transition between words
- Animation loop with ~2-3s dwell per word

### FR-7 Contact Section Redesign
- Background: radial/linear gradient from bright orange (#f97316) to deep red (#7f1d1d or #991b1b)
- Left side: "Let's build [rotating word] together" (from FR-6 OR static "ideas" variant)
- Right side: email address + social icon row (LinkedIn, GitHub, Instagram, X - use available)
- Cream/white text on orange gradient background
- Footer simplified, inherits warm theme

---

## Non-Functional Requirements

### NFR-1 Type Safety
- All new props/interfaces typed with TypeScript
- No `any` types introduced

### NFR-2 Responsive
- All new layouts collapse cleanly at sm/md breakpoints
- Mobile: navbar name still visible; stack wraps; projects stack vertically; contact stacks vertically

### NFR-3 Performance
- Rotating word animation uses CSS transitions or framer-motion (already installed)
- No layout thrash from scroll listeners

### NFR-4 Existing Behavior Preserved
- Scroll progress rail (ProgressRail) still works
- Smooth scroll anchor navigation preserved
- Framer-motion viewport entrance animations preserved where applicable

---

## Constraints & Dependencies
- Use Tailwind for all styling (custom colors in tailwind.config.ts)
- Add serif Google Font (Playfair Display Italic or Cormorant Garamond Italic) for the center navbar name and rotating word
- Keep Next.js 14 App Router structure
- Fonts must be loaded via Google Fonts <link> in layout.tsx (existing pattern)

## Assumptions
- User's first/only name for navbar center is "Rakesh" (from profile.name) — use italic serif styling
- Project screenshots are not available; use colored placeholder preview areas with project initials
- The "Let's build [X] together" should appear in both Hero (prominent) and Contact sections, OR Contact section only — implement in both with consistent styling
- "Let's chat →" in navbar is a link to #contact section

## Open Questions
None — all design decisions derived from reference images and user profile preferences (serif headings, futuristic + warm palette).

---

## Acceptance Criteria

### Rule ACs
- **AC-R1**: `tailwind.config.ts` contains new warm color palette tokens (e.g., bg-warm, cream, orange-*, burnt-*)
- **AC-R2**: `<link>` for serif italic font (Playfair Display / Cormorant Garamond) present in layout.tsx
- **AC-R3**: Navbar component renders: left "≡ Menu", center "Rakesh" serif italic, right "Let's chat →"
- **AC-R4**: No SectionHead eyebrow props are passed/rendered in About, Stack, Projects; "05 — Contact" string removed from Contact.tsx
- **AC-R5**: Stack section no longer renders the TechLogo card grid (replaced with new style)
- **AC-R6**: Projects section heading contains "FEATURED WORKS" and no project card shows "01"/"02"/"03" numbering
- **AC-R7**: A rotating word animation component cycles through ["systems", "ideas", "visions", "impact"] with transitions
- **AC-R8**: Contact section has CSS orange-to-red gradient background (not solid) and displays email + social icons
- **AC-R9**: `next build` completes with zero errors
- **AC-R10**: `next lint` passes (no new lint errors)

### Rubric ACs
- **AC-U1 Design Fidelity (0-4, threshold 3)**: How closely the warm theme, editorial serif aesthetic, and project/contact layouts match the reference screenshots when viewed at 1024px+ width.
  - 0: still looks like old dark theme
  - 1: colors changed but layout mismatches
  - 2: colors + navbar correct but projects/contact partial
  - 3: navbar, projects, contact all match reference layout direction with minor polish gaps
  - 4: pixel-faithful to reference layout proportions and color feeling
- **AC-U2 Responsive Robustness (0-3, threshold 2)**: Quality of mobile/tablet collapse.
  - 0: breaks at sm breakpoint
  - 1: usable but overflow/clipping in places
  - 2: stacks cleanly at all breakpoints; only minor alignment issues
  - 3: dedicated mobile UX optimized for touch
- **AC-U3 Animation Quality (0-3, threshold 2)**: Smoothness of rotating word transition and scroll entrance animations.
  - 0: jarring or no motion
  - 1: works but transition is abrupt
  - 2: smooth fade/wipe, timing feels natural
  - 3: GSAP/framer-level polish with easing
