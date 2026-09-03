# Patterns: composition, motion, navigation

## Page skeleton

- Fixed nav (blurred `bg-surface/85`, border-b), `<main class="pt-20">`,
  footer with border-t at `mt-32`
- Content container: `max-w-5xl mx-auto px-6`
- Sections open with a `.section-label` (uppercase, tracked, gray) then a
  serif heading; h1 to h3 are serif automatically via globals.css
- One h1 per page; heading levels never skip

## Motion patterns (the only four)

1. **Load entrance**: `.fade-rise` on above-the-fold content, pure CSS
2. **Scroll reveal**: wrap in the `Reveal` component (src/app/reveal.tsx);
   stagger siblings with `--reveal-delay`; content stays visible without JS
3. **Hover/press**: `.card-lift`, `.btn-press`, `.arrow-nudge`, paper
   straighten; all at micro duration
4. **Delight**: `Sparkle` particles (src/app/sparkle.tsx), used sparingly on
   celebratory moments only

Reduced motion for all four is already handled in globals.css. Adding a new
keyframe means also adding its reduced-motion rule there.

## CTA and tracking

Every conversion link uses `TrackedCTA` with a named event string. Booking
links default to `BOOKING_URL`. Event names are lowercase with hyphens and
describe the surface plus intent, e.g. `workshop-book-call`.

## Diagrams (inline SVG)

Causal loops and maps follow the site palette: accent for reinforcing
elements, success green for balancing or positive elements, navy for node
titles, gray for node subtext, `accent-light` / `success-light` node fills,
12px node radius, Inter labels. Prefer `var(--accent)` style references over
literal hex in new SVGs.

## Forms (tool pages)

Tool forms live inside `CardSection` bands of a method card. Inputs use
border, surface background and the global focus outline. This area is thinly
specified; before building a new form read one existing tool page (e.g.
src/app/xyz/page.tsx) and mirror it, then extend this section.
