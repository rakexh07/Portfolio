# Implementation Tasks — Round 2: Cream, Menu, Loader, Card-Scroll

## Task 1: Palette Overhaul (cream everywhere) + Tailwind/Layout/globals retheme
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R1
**Depends on**: —

### Description
Flip all warm tokens: body bg → light cream, text fg → dark warm brown, accent remains burnt orange. Re-color every section wrapper bg class.

### Changes
- `tailwind.config.ts`: Swap `bg-warm`/`bg-warm-2`/`bg-warm-3` meanings OR add new tokens:
  - `bg-cream: "#f0e1c8"` (main page bg)
  - `bg-cream-2: "#e9d8ba"` (section-card bg)
  - `bg-cream-3: "#f5ecd7"` (lighter panel)
  - Keep `panel-warm`, `line-warm`
  - `fg-warm: "#2d1810"` (dark text)
  - `fg-warm-muted: "#6b3a2a"`
  - Keep `cream: "#f5e6d3"` for light-text on dark (e.g. loader white/cream text) but not used for body
  - Keep `burnt`, `orange-bright`, `red-deep`
  - Add `gold: "#e0a050"` for loader name color
- `app/layout.tsx`: body → `bg-bg-cream text-fg-warm`, themeColor="#f0e1c8"
- `app/globals.css`: Rewrite body bg `#f0e1c8`, color `#2d1810`; update `::selection` (cream bg, burnt text? or reverse); scrollbar (cream track, burnt/warm thumb); chip classes; hero-grid-bg colors to warm brown lines on cream bg; scroll-drip color burnt; img svg filter (soft warm instead of sepia heavy)

### Test Requirements
- **TR-R1 (rule)**: tailwind config parses OK — `npx tsc --noEmit` after edit
- **TR-R1b (rule)**: layout body class includes `bg-bg-cream` and `text-fg-warm`
- **TR-U1 (rubric 0-3, threshold 2)**: Visual check that body is light cream not dark brown and paragraphs are dark warm brown

---

## Task 2: Contact headline — single-line layout + only LinkedIn/GitHub icons
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R2, AC-R3, AC-U2
**Depends on**: Task 1 (palette for icon bg colors)

### Description
Rewrite Contact headline to use `flex flex-nowrap items-baseline` so words stay on one line at md+. Remove Instagram and Twitter icons.

### Changes
- `components/Contact.tsx`:
  - Left headline wrap container: change from 3 stacked `<span class="block font-display">` to a single `flex flex-wrap md:flex-nowrap items-baseline gap-x-2 sm:gap-x-3 md:gap-x-5` parent.
  - "Let's build": `inline-block shrink-0` display uppercase clamp font
  - `<RotatingWords />`: wordClassName `inline-block align-baseline` so it stays between them; keep `text-cream` for the gradient bg of contact section
  - "together": `inline-block shrink-0` display uppercase clamp font same as "Let's build"
  - Socials array: Remove Instagram + X/Twitter entries, keep ONLY LinkedIn and GitHub (2 entries)
  - Re-check palette: contact section already has orange gradient bg → text colors are correct cream, but make sure social pill borders are `cream/25` still
- Ensure clamp() font sizes for "Let's build" and "together" are sized so they don't exceed viewport at md+
- Adjust RotatingWords container class if needed to keep consistent inline baseline

### Test Requirements
- **TR-R2 (rule)**: Contact.tsx `socials` array length === 2 and has labels "LinkedIn" and "GitHub" (order preserved per reference order or preferred)
- **TR-R2b (rule)**: Contact headline wrapper uses `md:flex-nowrap` class and children are inline/inline-block in the rendered DOM (not `<span class="block">` stacked)
- **TR-U2 (rubric 0-3 threshold 2)**: visual line integrity check

---

## Task 3: MenuOverlay component + wiring from Nav.tsx
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R4, AC-R5, AC-R6, AC-U3
**Depends on**: Task 1 (cream palette for overlay bg)

### Description
Build MenuOverlay.tsx and connect toggle state from Nav Menu button.

### Changes
- New `components/MenuOverlay.tsx`:
  - "use client"
  - Props: `open: boolean`, `onClose: () => void`
  - Use framer-motion `motion.div` `animate={{ opacity, y }}` or `AnimatePresence` for fade. On open: `body.style.overflow = "hidden"`; on close reset. Use `useEffect` depending on `open`.
  - JSX:
    - fixed inset-0 bg-bg-cream z-[200]
    - Top-right absolute: `<button onClick={onClose}>` burnt mono uppercase: "CLOSE ✕"
    - Center column mx-auto max-w-max flex flex-col items-center gap-4 sm:gap-6 md:gap-8 py-24 sm:py-32 md:py-40 justify-center
    - 5 links: Home (#hero), About (#about), Stack (#stack), Projects (#projects), Contact (#contact). Each link: onClick={() => { onClose(); }} then anchor href. Text huge burnt `font-display uppercase text-burnt tracking-tight` with `style={{ fontSize: "clamp(56px, 14vw, 160px)" }}` or similar and maybe italic serif variant (match reference "Home/Roles/Projects" large burnt feel)
    - Reach out block near bottom: center column, mt-auto py-16. Eyebrow mono uppercase: "REACH OUT TO ME" burnt. Below: `mailto:${profile.email}` serif italic burnt large font, centered.
- Edit `components/Nav.tsx`:
  - Add state `const [menuOpen, setMenuOpen] = useState(false)`
  - Left "≡ Menu" button: onClick `setMenuOpen(true)`
  - At end of Nav return (or higher in page.tsx tree), render `<MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />`

### Test Requirements
- **TR-R3 (rule)**: MenuOverlay.tsx file exists with open/onClose props
- **TR-R3b (rule)**: Nav.tsx renders `<MenuOverlay ...>` and the Menu button onClick toggles state to true
- **TR-R3c (rule)**: Menu contains 5 anchor tags #hero, #about, #stack, #projects, #contact, plus close button, plus "REACH OUT TO ME" eyebrow + mailto email
- **TR-R3d (rule)**: MenuOverlay useEffect toggles `document.body.style.overflow` depending on open
- **TR-U3 (rubric 0-3 threshold 2)**: visual match to reference menu

---

## Task 4: Initial Loader component with typewriter typing animation of "Rakesh"
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R7, AC-R8, AC-U4
**Depends on**: Task 1 (gold/burnt color tokens)

### Description
New Loader.tsx component; mount in layout/page top; run once; type char-by-char, caret blink, fade out; scroll lock during loader.

### Changes
- New `components/Loader.tsx`:
  - "use client"
  - Props: `onComplete: () => void`
  - State chars typed: `const [typed, setTyped] = useState(""); target = "Rakesh"`
  - useEffect on mount: setInterval ~110ms/char, increment index, after typed === target + 600ms pause → call onComplete and cleanup interval
  - Caret: vertical bar `|` span with CSS blink keyframes opacity 0→1→0 or `blink` animation
  - Wrapper: `fixed inset-0 z-[300] bg-black flex items-center justify-center` (or very dark #0f0805)
  - Content: centered `<div>` holding span for typed name in `font-serif italic` with gold/burnt color, large clamp `text-[clamp(40px, 10vw, 96px)]`. Name color `text-gold` or `text-burnt` (lighter gold matches reference better, so `#e0a050` → add tailwind token `gold`)
  - Transition: onComplete → animate out (framer-motion exit fade to opacity:0 over 500ms). Use AnimatePresence in parent if needed.
- Mount in `app/layout.tsx` or `app/page.tsx` top level with state:
  - Add state `const [loading, setLoading] = useState(true)` only on client via useEffect mount check (SSR safe)
  - If loading, render `<Loader onComplete={() => setLoading(false)} />`
  - Use a persisted flag in sessionStorage (`hasSeenLoader`) so that within a session SPA anchor nav reloads do not re-trigger. Only on first page load/hard refresh.
  - While loading: children are hidden (`opacity-0 pointer-events-none` or visually hidden)
  - Scroll lock while loading via body overflow (like menu)

### Test Requirements
- **TR-R4 (rule)**: Loader.tsx exists; on mount it progressively builds the string "Rakesh" over time (verified by code: useState("") + interval that adds chars from name constant)
- **TR-R4b (rule)**: Blinking caret rendered in JSX
- **TR-R4c (rule)**: Uses sessionStorage or equivalent persistence so loader not shown again on same-tab internal nav.
- **TR-U4 (rubric 0-3 threshold 2)**: subjective timing, appearance, fade-out smoothness.

---

## Task 5: Card-style scroll animations for each section + responsive validation
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R9, AC-R11, AC-U5
**Depends on**: Task 1 (palette for card bg/shadow colors)

### Description
Wrap each section in a shared card-style wrapper or apply per-section motion props with rounded corners + subtle shadow + scroll entrance. Also fix any responsive issues.

### Changes
- Option approach: implement `SectionCard` wrapper OR inline each section.
  - Per section wrapper classes: `max-w-[1400px] mx-auto w-full rounded-2xl md:rounded-3xl shadow-[0_10px_50px_-20px_rgba(45,24,16,0.35)] bg-bg-cream-2/60 backdrop-blur-sm border border-line-warm/20 px-0 overflow-hidden`
  - Section entrance via framer-motion:
    ```
    initial={{ opacity: 0, y: 50, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.08 }}
    transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
    ```
- Apply to each section in `Hero`, `About`, `Stack`, `Projects` (Contact already has gradient, give it card wrapper but preserve its full-bleed gradient feel — OR keep Contact full-bleed as section climax. Per spec: "like a card" → keep it card-wrapped but gradient fills the wrapper)
- Add section vertical spacing: `py-8 sm:py-10 md:py-12` around each card (so cards stack visually with gap between them)
- Responsive verification (checks added inline via classes; also review at 320w):
  - Nav: flex-row name in center; Menu/Let's chat labels may truncate to icons only at xs if needed but keep labels where possible. Add `hidden sm:inline` for Menu/CTA text on very small screens
  - Projects grid: col-span-2 featured card's preview clamp height
  - Stack: `flex-wrap gap-2` always on chips
  - About: grid cols always 1 on < lg, cols 1fr_300px on lg+
  - Contact headline: flex-wrap on < md, flex-nowrap on md+
  - Menu overlay: clamp() on big link text so it fits vertically on tall mobile
  - Add rule: body `{ overflow-x: hidden; }` already present; if anything breaks revisit specific sections

### Test Requirements
- **TR-R5 (rule)**: All 5 section files (Hero, About, Stack, Projects, Contact) contain the card wrapper classes OR motion card initial/whileInView scroll entrance pattern (rounded corners + shadow for container, animation)
- **TR-R5b (rule AC-R11)**: No section has CSS classes that would force a fixed width > 320px without wrapping; every grid/flex using cols-1 on mobile, max-w-full on containers
- **TR-U5 (rubric 0-3 threshold 2)**: subjective feel: scrolling sections down shows them pop up as cards consistently

---

## Task 6: Final build, lint, typecheck
**Status**: pending
**Priority**: high
**Maps to AC**: AC-R10
**Depends on**: Tasks 1–5 all completed

### Description
Run checks, fix any breakages.

### Test Requirements
- **TR-R6 (rule)**: `npm run build` exits code 0
- **TR-R6b (rule)**: `npm run lint` exits code 0
- **TR-R6c (rule)**: `npx tsc --noEmit` exits code 0
- **TR-U6 (rubric 0-2 threshold 1)**: no major regressions; sections Nav → Loader → Hero → About → Stack → Projects → Contact → Footer all render in order on a fresh page load after loader.
