# Priorities: what wins when rules conflict

Ordered. A higher rule beats every rule below it.

1. **Accessibility beats aesthetics.** Contrast, focus visibility, reduced
   motion and semantic HTML are never traded for a prettier variant.
2. **The hiring path beats every other goal.** Nothing pushes hero, projects
   or contact down or adds noise around them.
3. **Progressive enhancement beats motion.** If a reveal could hide content
   when JS fails, ship it static.
4. **Tokens beat pixel-perfection.** If a mockup shows a value outside the
   token set, snap to the nearest token and note the deviation; do not add a
   raw value to match a picture.
5. **Extending beats generating.** Prefer editing an existing component or
   recipe over creating a parallel one. A second way to do the same thing is
   a bug.
6. **Calm beats clever.** When a delight idea competes with quietness,
   quietness wins everywhere except the games pages, where delight may lead
   (still within tokens and reduced-motion rules).
7. **Spec beats memory.** If code and spec disagree, stop; fix whichever is
   wrong in the same change. Silent divergence is the failure mode this whole
   folder exists to prevent.

## Accepted exceptions (documented drift)

- `src/app/case-studies/fluffy-score/page.tsx`: inline SVG causal loop uses
  literal hex mirroring accent/success/navy/gray tokens. Allowed until next
  edit of that file; then migrate fills and strokes to `var(--...)`. Its green
  #1a9e72 predates the `--success` token (#0f7a56); swap during migration.
- `src/app/api/capture-email/route.ts`: HTML email template. Email clients
  cannot read CSS variables, so literal values are allowed there; keep them
  matched to tokens.md by hand when tokens change.
- Decorative literal values inside globals.css (pin gradients, tape tints,
  dot grid rgba): allowed because globals.css is the token home; the audit
  reports them as warnings so they stay visible.
