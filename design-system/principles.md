# Principles: how design decisions get made on mottoworkshop.com

Sources: ux.md (Aug-Sep 2026 positioning), globals.css comments, layout.tsx.
These are the reasons behind the rules. When a spec is silent, decide the way
these principles would decide, then write the decision down.

## 1. The site is calm paper

The visual world is a desk: paper white surfaces, a dot grid notebook page,
sticky notes in four pastels, washi tape, push pins, polaroids, one blue accent.
Serif headings (Playfair Display), sans body (Inter). Anything that would not
sit naturally on this desk does not ship. No gradients as decoration, no glass,
no neon, no dark mode (single deliberate light look).

## 2. Quiet, decelerating motion

Motion only where it communicates: reveals settle content, hovers acknowledge
pointing, presses acknowledge clicking. Everything uses the shared motion
tokens (180ms micro, 500ms reveal, one decelerate curve, 12px rise). Nothing
bounces. `prefers-reduced-motion` is always respected and already handled
globally in globals.css: never add motion outside its patterns.

## 3. The hiring path is sacred

Primary audience is recruiters scanning for 2 to 3 minutes. Hero, five
projects, contact stay unobstructed. Workshop and tools sit below. Any layout
decision that pushes hiring evidence down the page loses.

## 4. Evidence over claims, verification as the differentiator

Live tools beat case studies beat claims. The quiet message on every surface:
AI is used heavily AND checked. Design supports this by being restrained;
hype styling would contradict the message.

## 5. Progressive enhancement, always

Content is never hostage to JavaScript. Load animations are pure CSS. Scroll
reveals only hide content after the `js` class lands on `<html>`. Any new
interactive pattern must degrade to visible, readable content.

## 6. Accessibility floor

- Keyboard focus visible everywhere (global `:focus-visible` outline)
- Text and background pairs meet WCAG AA 4.5:1 (audited for token pairs)
- Decorative paper elements (tape, pins, stickers, emoji panels) carry
  `aria-hidden` or empty alt; they never carry meaning alone
- Reduced motion handled centrally, see principle 2

## 7. Tokens are the vocabulary

A value used twice is a token. Tokens have semantic names that state intent
(`--ink-rose`, not `--pink-dark`) plus a comment describing usage. Raw values
live only in the `:root` block of globals.css.

## 8. Voice in the pixels

Plain, concrete, calm. No em or en dashes anywhere, in copy or in code
comments. No fake testimonials, no unverified statistics, no hype words.
See ../ux.md for the full voice rules.
