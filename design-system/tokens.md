# Tokens: the closed value set

Source of truth for values: `src/app/globals.css` `:root` block. This file is
the usage guide. The audit script fails if the two drift apart, so keep both
updated in the same change.

Rule: AI styles ONLY with these tokens (via Tailwind theme classes like
`bg-surface`, `text-navy`, or `var(--...)` in CSS). Never a raw hex, rgba or
off-scale px value in TSX.

## Color: core

| Token | Value | Use |
|---|---|---|
| `--background` | #f8f7fc | Page background, the desk surface |
| `--foreground` | #12193a | Default body text |
| `--navy` | #12193a | Headings, primary text, hover text on nav links |
| `--navy-mid` | #1e2d5a | Secondary dark tone where navy is too heavy |
| `--accent` | #3b5bdb | The one blue: links, primary buttons, focus outline, checkmarks, diagram lines |
| `--accent-light` | #e8edff | Accent-tinted fills: pills, diagram node fills |
| `--gray` | #6b7280 | Secondary text, section labels, nav links at rest |
| `--gray-light` | #9ca3af | Tertiary text, timestamps, disabled feel |
| `--border` | #ddd9e8 | All rules and borders, one weight of separation |
| `--surface` | #ffffff | Cards, notes wall paper, nav bar, polaroid frames |
| `--tag-bg` | #eeedf5 | Neutral pill background (navy text) |
| `--lavender` | #f0eff5 | Soft tinted section background |

## Color: paper family (sticky notes, panels)

Pastels that sit with the 3D illustration family on /work. Use for note
backgrounds and card visual panels, never for text.

| Token | Value |
|---|---|
| `--note-cream` | #fbf3dd |
| `--note-mint` | #ddf0e6 |
| `--note-peach` | #fce4d8 |
| `--note-lavender` | #e7e3f6 |
| `--note-yellow` | #fdf0b8 |
| `--note-rose` | #fbdde9 |

## Color: pill inks

Dark text tones tuned for contrast on their pastel pill. Always pair ink with
its named paper; never put ink colors on white.

| Token | Value | Pairs with |
|---|---|---|
| `--ink-rose` | #9e4067 | `--note-rose` |
| `--ink-mustard` | #8a6a15 | `--note-cream` |

## Color: positive and diagram

Green is reserved for success states and diagram semantics (balancing loops,
positive outcomes). Never decorative.

| Token | Value | Use |
|---|---|---|
| `--success` | #0f7a56 | Success text, green diagram strokes and labels |
| `--success-light` | #edfcf5 | Success-tinted fills, green diagram node fills |

## Color: delight

| Token | Value | Use |
|---|---|---|
| `--delight-pink` | #f2a9c4 | Sparkle particles and hearts only |

## Motion

| Token | Value | Use |
|---|---|---|
| `--motion-duration-micro` | 180ms | Hovers, presses, small state changes |
| `--motion-duration-reveal` | 500ms | Scroll reveals, content entrances |
| `--motion-duration-delight` | 700ms | Lifetime of one sparkle particle |
| `--motion-ease-out` | cubic-bezier(0.22, 0.61, 0.36, 1) | The only easing curve, decelerate, no bounce |
| `--motion-rise` | 12px | Distance content travels while fading in |

## Shadow

| Token | Use |
|---|---|
| `--shadow-note` | Resting paper shadow: notes, polaroids, notebook page, method cards |
| `--shadow-lift` | Hovered card shadow, deeper |

## Typography

| Token | Value | Use |
|---|---|---|
| `--font-sans` (`--font-inter`) | Inter 300 400 500 600 | Body, UI, labels |
| `--font-serif` (`--font-playfair`) | Playfair Display 400 600 700 | h1, h2, h3 (applied globally) |

Type scale: use the Tailwind default scale only (text-xs to text-5xl). The
one exception in the codebase is the pill at 0.68rem, documented in
components/pills.md; do not add more off-scale sizes.

## Spacing and radius

- Spacing: Tailwind default 4px scale only. No arbitrary `[Npx]` values above
  4px (small border widths of 1 to 4px for tape rules and underlines pass audit).
- Radius: `rounded-lg` buttons, `rounded-xl` cards, `rounded-full` pills,
  4px sticky notes, 2px polaroids, 14px notebook page (set in globals.css).
- Page container: `max-w-5xl mx-auto px-6`.
