# motto-workshop

Portfolio and tools site for mottoworkshop.com. Next.js 16, Tailwind v4, deployed on Vercel.

## Design system (read before any UI work)

This repo has an AI-ready design system spec layer. Before creating or editing any page, component, style, or copy:

1. Read `design-system/README.md` and follow its reading order (principles, tokens, components, patterns, priorities).
2. Style only with the tokens and utility classes defined in `src/app/globals.css`. Never invent hex colors, rgba values, arbitrary px values, or Tailwind default palette classes (the red/amber/emerald feedback families are the documented exception).
3. Extend existing components (MethodCard family, Pill, TrackedCTA) before creating new ones. A new component needs a new spec file in `design-system/components/` in the same change.
4. After generating or changing UI code, run `npm run audit:design` and fix every failure before presenting the work.

## Voice and content

- Read `ux.md` before any customer facing copy.
- Plain, concrete, calm. No hype words. No em or en dashes anywhere, in copy or code comments.
- Never publish fake testimonials, unverified statistics, or promises that are not implemented.

## Conventions

- Conventional commits: feat:, fix:, docs:, refactor:
- NEVER commit .env
