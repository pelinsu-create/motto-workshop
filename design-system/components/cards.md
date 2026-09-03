# Cards and the method card family

## Plain card (clickable surfaces, project tiles)

- Shell: `rounded-xl border border-border bg-surface` with `[box-shadow:var(--shadow-note)]`
- Clickable cards add `.card-lift`: 2px rise + `--shadow-lift` on hover, inner
  image (`.card-img`) eases to scale 1.02
- The whole card is one link; no nested interactive elements inside a card link

## Method card (src/app/method-card.tsx)

The shared card language of the games and tool pages, styled like a printed
co-design methods handbook. Use these exports, do not rebuild the structure:

| Part | Component | Rule |
|---|---|---|
| Shell | `MethodCard` / `cardShell` | White paper, xl radius, note shadow |
| Visual panel | `CardVisual` | Pastel `bg-note-*` class + one big emoji glyph, `aria-hidden` |
| Title band | `CardTitle` | Serif title, optional `section-label` kicker, heading level via `as` |
| Tags row | `CardTags` / `Pill` | See components/pills.md |
| Body | `CardBody` | Calm reading text or the interactive content |
| Tip footer | `CardTip` | Tinted paper (default note-cream), bold TIP prefix |
| Form section | `CardSection` | Ruled section band with sans semibold heading |

## Usage rules

- DO pass panel backgrounds as named classes (`bg-note-mint`, `bg-note-rose`)
- DO keep one visual panel per card, one tip footer maximum
- DO NOT put raw hex classes into `CardVisual` or `CardTip` tints
- DO NOT mix method card parts with ad hoc borders; the parts already rule themselves
- DO NOT use `card-lift` on non-clickable cards; lift promises a link
