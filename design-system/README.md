# mottoworkshop design system, AI-ready spec layer

This folder is the source of truth for design decisions on mottoworkshop.com.
It exists so AI tools (Claude Code, generation agents) compose against written
rules instead of guessing from mockups or existing pages. Humans read it too,
but the primary consumer is a model.

## The three layers

1. **Spec files** (this folder): what was decided and how decisions get made.
2. **Token layer** (`src/app/globals.css` `:root` block): the closed set of
   named values. AI picks from this set, it never invents plausible values.
3. **Audit script** (`scripts/audit-design.mjs`, run with `npm run audit:design`):
   deterministic checks on the code. AI waits for audit feedback; the audit
   never relies on AI judgment.

## Reading order for a generation task

1. `principles.md`, how we decide
2. `tokens.md`, the closed value set
3. `components/*.md`, the component you are touching
4. `patterns.md`, page composition and motion
5. `priorities.md`, what wins when rules conflict
6. `../ux.md`, audience and voice (read before any customer-facing copy)

## Rules for AI consumers

- Style only with tokens or the utility classes defined in `globals.css`.
  No hex colors, no rgba, no arbitrary px values in TSX.
- Extend existing components before creating new ones. New component means
  a new spec file in `components/` in the same change.
- If a decision you need is not written here, that is a bug in the spec,
  not permission to improvise. Stop and ask, then the answer gets written down.
- Run `npm run audit:design` after generating. Fix failures before showing work.

## Sync routine

The audit script cross-checks `globals.css` against `tokens.md`: a token that
exists in code but not in the spec (or the reverse) fails the audit. When you
add, rename or remove a token, update both in the same change. When a component
changes visually, update its spec file in the same change.
