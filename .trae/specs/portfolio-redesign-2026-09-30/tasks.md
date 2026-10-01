# Implementation Tasks — Portfolio Redesign

## Task 1: Color Theme & Font Setup (Tailwind + Layout)
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R1, AC-R2
**Depends on**: —

### Description
Update the theme foundation: new warm color tokens in tailwind config, add serif italic Google Font link in layout.tsx, update globals.css body background + scrollbar + selection colors.

### Changes
- `tailwind.config.ts`: Add new colors:
  - `bg-warm: "#2d1810"` (dark warm brown page bg)
  - `bg-warm-2: "#3d1e14"` (slightly lighter panels)
  - `panel-warm: "#4a2517"`
  - `line-warm: "#6b3a2a"`
  - `cream: "#f5e6d3"` (primary text)
  - `cream-muted: "#c9a88a"` (muted text)
  - `burnt: "#e07020"` (accent)
  - `orange-bright: "#f97316"`
  - `red-deep: "#7f1d1d"`
  - Update fontFamily: add `serif` stack with "Playfair Display" italic variant
- `app/layout.tsx`: Add Google Fonts link for Playfair Display (italics wght@400;600;700) + Inter; update themeColor meta; update body classes to use new bg/cream colors
- `app/globals.css`: Update body background, text color, scrollbar, selection, chip, hero-grid-bg, scroll-drip colors to warm palette

### Test Requirements
- **TR-R1**: Run `npx tailwindcss -c ./tailwind.config.ts --input ./app/globals.css --output /dev/null` (or equivalent lint) and it returns 0 exit — tailwind config parses without errors
- **TR-R1b (rule)**: `app/layout.tsx` <head> contains "Playfair+Display" in a fonts.googleapis.com link
- **TR-U1 (rubric, 0-3 threshold 2)**: Body background on initial load reads as warm dark brown, not cold black; text color is warm cream when inspecting body class

---

## Task 2: Navbar Redesign — 3-Column Layout
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R3
**Depends on**: Task 1 (color tokens)

### Description
Rewrite Nav.tsx to use 3-column flex layout: left menu button, center serif name, right CTA. Remove the old pill/link-list structure.

### Changes
- `components/Nav.tsx`:
  - Replace inner `<nav>` pill style with a full-width transparent bar that becomes semi-opaque when scrolled
  - Left column: `<button>` or `<span>` showing "≡ Menu" (≡ is U+2261) in cream color, font-mono uppercase
  - Center column: "Rakesh" rendered in `font-serif italic` with large size (~clamp(20px, 2.5vw, 28px)), cream color, tracking tight
  - Right column: `<a href="#contact">` with "Let's chat →" text, cream color, underline on hover or subtle border
  - Preserve scrolled state (backdrop blur + bg tint when window.scrollY > 24)
  - Remove the active-section tracking (no links to highlight)

### Test Requirements
- **TR-R2 (rule)**: Nav.tsx renders exactly 3 top-level flex children; first contains "Menu", center contains name string, right contains "Let's chat"
- **TR-R2b (rule)**: Center name element has `font-serif` class or `fontStyle: italic` inline
- **TR-U2 (rubric, 0-3 threshold 2)**: At 1024px+ width, navbar visually matches reference image layout proportions (menu left, name centered, CTA right)

---

## Task 3: Remove Section Eyebrows — About / Stack / Projects / Contact
**Status**: pending
**Priority**: medium
**Maps to AC**: AC-R4
**Depends on**: —

### Description
Remove all small eyebrow headings. Adjust section heading styles to fit the warm theme.

### Changes
- `components/About.tsx`: Remove `eyebrow="About"` prop from `<SectionHead>` call; change title or keep "A bit about me" without eyebrow
- `components/Stack.tsx`: Remove `eyebrow="Tech Stack"` prop from `<SectionHead>`
- `components/Projects.tsx`: Remove `eyebrow="Selected Work"` prop; change SectionHead title to `"FEATURED WORKS"` (uppercase, all caps)
- `components/Contact.tsx`: Remove `<div className="font-mono text-muted ...">05 — Contact</div>` block entirely
- `components/SectionHead.tsx`: Optional — adjust padding/margins since eyebrows are gone (tighten top spacing slightly)
- `components/Hero.tsx`: Remove the eyebrow `<span>` with `profile.focus` if user wants "small headings like About" removed — keep name h1 but remove focus eyebrow line

### Test Requirements
- **TR-R3 (rule)**: Grep for `eyebrow=` across components/ returns 0 matches
- **TR-R3b (rule)**: Contact.tsx does NOT contain the string "05 — Contact"
- **TR-R3c (rule)**: Projects.tsx SectionHead title prop equals "FEATURED WORKS"
- **TR-U3 (rubric, 0-2 threshold 1)**: No tiny eyebrow labels visible above any section heading in a rendered page

---

## Task 4: Tech Stack Section Redesign
**Status**: pending
**Priority**: medium
**Maps to AC**: AC-R5
**Depends on**: Task 1 (color tokens)

### Description
Replace the TechLogo grid-of-cards with a minimalist editorial pill/tag layout grouped by layer. Keep data from Stack.tsx `stackGroups`.

### Changes
- `components/Stack.tsx`:
  - Keep section wrapper `<section id="stack">` (nav anchor preserved)
  - Keep SectionHead with title e.g. "Tech Stack" (or similar — no eyebrow per Task 3)
  - Remove `<TechLogo>` component usage entirely
  - For each `g.layer` group: render group label (uppercase serif or mono) followed by a horizontal flex-wrap row of pill/chip tags
  - Each pill: tech name text only, rounded pill, warm bg-warm-2 + border-line-warm + cream text, hover to burnt accent
  - Optionally add dividers between groups (h-px line-warm)
- Remove/keep `Image` import in Stack.tsx: remove if no longer used
- globals.css `.chip` class: update colors to warm palette (this may already happen in Task 1)

### Test Requirements
- **TR-R4 (rule)**: Stack.tsx contains no `<TechLogo` or `<Image` JSX elements
- **TR-R4b (rule)**: All 4 stackGroups (Frontend, Backend, Data, Cloud & DevOps) are rendered in output
- **TR-U4 (rubric, 0-3 threshold 2)**: Tech chips feel visually integrated with warm theme; layout cleanly wraps; no broken icons or failed image loads

---

## Task 5: Projects Section Redesign — Featured Works Cards
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R6
**Depends on**: Task 1 (color tokens), Task 3 (FEATURED WORKS heading)

### Description
Remove numbered (01/02/03) project layout. Replace with:
- 1 large featured (wide) card for first project
- 2 side-by-side cards below for remaining projects
- Each card has a colored preview area (top) + project info (bottom)
- No numbering anywhere

### Changes
- `components/Projects.tsx`:
  - Keep section + SectionHead ("FEATURED WORKS" — set in Task 3)
  - Remove the left-side "Project 0{i+1}" numbered block entirely
  - Restructure project loop:
    - If `i === 0`: full width card (`md:col-span-2` or `w-full`) with taller preview area (~240px height)
    - If `i > 0`: half-width cards on md+ (`md:w-[calc(50%-0.5rem)]`) with standard preview area
    - Use a grid layout (grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5) OR flex with wrap
  - Preview area (top of card): colored placeholder block — use burnt-orange gradient or abstract warm shape with project initial letters (e.g. "MP" for Medicinal Plant) centered large in serif font
  - Info area (bottom of card):
    - Tag badge (top-left, e.g. "Computer Vision")
    - Title (large serif/display, cream)
    - Description paragraph (cream-muted, compact)
    - Stack split by " · " as pill chips below
    - "View Source →" external link (top right of card or bottom right)
  - Card container: `bg-bg-warm-2 border border-line-warm rounded-sm or rounded-lg overflow-hidden`
  - Hover: subtle border color change to burnt + slight lift

### Test Requirements
- **TR-R5 (rule)**: Grep for `0{i` or `0{` pattern in Projects.tsx returns 0 matches (no numbering template)
- **TR-R5b (rule)**: First project card DOM occupies full 2-col width on md+ (uses col-span-2 OR equivalent w-full class in a 2-col grid)
- **TR-R5c (rule)**: Section heading JSX contains the literal string "FEATURED WORKS"
- **TR-U5 (rubric, 0-4 threshold 3)**: At md+ width, visual layout approximates reference: 1 wide top card + 2 narrower cards below; each has colored preview area

---

## Task 6: Rotating Word Animation Component ("Let's build ___ together")
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R7
**Depends on**: Task 1 (font loaded)

### Description
Build a reusable client component RotatingWords that cycles: systems → ideas → visions → impact, each word in italic serif. Implement in Hero (prominent) AND mirror in Contact section.

### Changes
- **New file `components/RotatingWords.tsx`**:
  - `"use client"`
  - Props: optional `words?: string[]` (default `["systems", "ideas", "visions", "impact"]`), optional `interval?: number` (default 2500ms)
  - Use framer-motion `<AnimatePresence>` or CSS keyframes + React state to cycle
  - Transition: fade + slight vertical slide up/down between words
  - Wrap each word: `font-serif italic` cream color, large tracking
  - Export default
- **Update `components/Hero.tsx`**:
  - Replace or supplement the existing h1 name area with a secondary block below name:
    - "Let's build" (cream, font-display bold)
    - `<RotatingWords />` (large italic serif, burnt-orange or cream)
    - "together" (cream, font-display bold)
  - Adjust layout to match warm theme (remove cool radial gradient; replace with warm brown/orange soft radial)
- **Update `components/Contact.tsx`**:
  - Use the same "Let's build" + `<RotatingWords />` + "together" pattern for the left-side big headline
  - OR keep contact's rotating word static to "ideas" if the user wants rotating only in hero — default: rotating in both places

### Test Requirements
- **TR-R6 (rule)**: `components/RotatingWords.tsx` file exists and default-exports a React component
- **TR-R6b (rule)**: Default words array includes all of: "systems", "ideas", "visions", "impact" (order doesn't matter, but all 4 present)
- **TR-R6c (rule)**: Hero.tsx imports and renders `<RotatingWords />` (or equivalent rotating pattern)
- **TR-U6 (rubric, 0-3 threshold 2)**: Observing the rendered page for ≥12s shows all 4 words displayed with smooth non-jarring transitions between them

---

## Task 7: Contact Section Redesign — Orange Gradient Background
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R8
**Depends on**: Task 1 (color tokens), Task 6 (RotatingWords component available)

### Description
Redesign Contact section to match reference: warm orange-to-deep-red gradient, headline on left, email + social icon row on right.

### Changes
- `components/Contact.tsx`:
  - Section wrapper `<section id="contact">`: apply gradient via inline style or tailwind arbitrary:
    - `background: radial-gradient(ellipse at 20% 30%, #f97316 0%, #ea580c 25%, #c2410c 50%, #7f1d1d 85%, #450a0a 100%)`
    - Alternative linear-gradient from orange (#fb923c) to deep red (#991b1b) at 160deg
  - Min height: full viewport height or ~90vh at least
  - Layout container: `flex flex-col md:flex-row items-center justify-between` with large padding
  - Left headline column (~md:w-2/3):
    - "Let's build" (cream, font-display uppercase, huge ~clamp(48px,10vw,120px))
    - `<RotatingWords />` word (italic serif, cream, same huge size — or burnt-orange accent)
    - "together" (cream, font-display uppercase, same huge size)
  - Right info column (~md:w-1/3, md:text-right):
    - Email address (large cream `text-2xl md:text-3xl`), mailto: link
    - Social icon row below email: LinkedIn, GitHub, Instagram, X (Twitter) — use lucide-react icons (if available; else inline SVG). Icons: `w-7 h-7` cream, spaced apart, rounded pill bg on hover
    - Note: Instagram + X URLs may not exist in profile data; link to profile pages as placeholders, or use only LinkedIn + GitHub + Instagram (X optional)
  - Footer below section: keep copyright but use warm brown bg matching new theme, cream-muted text
  - Remove old "LET'S BUILD SOMETHING." h2 and old contactItems mapping

### Test Requirements
- **TR-R7 (rule)**: `<section id="contact">` computed style contains a gradient (not `backgroundColor: #0a0a0a`) when rendered — verified by presence of `gradient` keyword or `linear-gradient`/`radial-gradient` in style prop or Tailwind class
- **TR-R7b (rule)**: Contact section renders email `profile.email` as a clickable mailto: link
- **TR-R7c (rule)**: At least 2 social icons (LinkedIn + GitHub) rendered with hrefs to profile URLs
- **TR-U7 (rubric, 0-4 threshold 3)**: Visual warmth matches reference image: orange→red gradient fills viewport; text is light cream on warm bg; left/right split at desktop feels editorial and balanced

---

## Task 8: Final Build & Lint Verification
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R9, AC-R10
**Depends on**: Tasks 1–7 all completed

### Description
Run production build and lint, fix any errors.

### Changes
- Fix any TS/import errors surfaced by build
- Optional: minor CSS tweaks from visual review

### Test Requirements
- **TR-R8 (rule)**: `npm run build` exits with code 0
- **TR-R8b (rule)**: `npm run lint` exits with code 0
- **TR-U8 (rubric, 0-2 threshold 1)**: No visual regressions — all sections present in correct order on a full-page render (Nav → Hero → About → Stack → Projects → Contact → Footer)
