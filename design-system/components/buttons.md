# Buttons and links

## Anatomy

There is no Button component; buttons are class recipes on `<a>`, `<button>`
or `TrackedCTA`. Three levels:

1. **Primary**: `bg-accent text-white px-4 py-2 rounded-lg hover:bg-navy transition-colors btn-press`
   One per view region. The nav "Get in touch" is the canonical example.
2. **Secondary**: bordered, paper feel: `border border-border bg-surface text-navy rounded-lg px-4 py-2 hover:border-accent btn-press`
3. **Text link**: `text-accent hover:text-navy transition-colors`, or gray to
   navy for nav links: `text-gray hover:text-navy`.

## States (all required)

- Rest, hover (color shift via `transition-colors` at micro duration)
- Press: add `.btn-press` (1px translate down; disabled under reduced motion)
- Focus: global `:focus-visible` outline handles it, never suppress outlines
- Disabled: `opacity-50 pointer-events-none` plus `aria-disabled`

## Usage rules

- DO route every conversion link through `TrackedCTA` with a named event
  (see src/app/tracked-cta.tsx); external hrefs get `_blank` + `noopener` there
- DO keep labels verb-first and plain: "Book a call", "Get in touch", "Try it"
- DO NOT invent new button colors; primary is accent, hover is navy, done
- DO NOT use green or rose buttons; those colors have reserved meanings
- DO NOT put two primary buttons side by side

## Accessibility

- Real `<a>` for navigation, real `<button>` for actions, never a div
- An inline arrow uses `.arrow-nudge` inside the link so it moves with hover
