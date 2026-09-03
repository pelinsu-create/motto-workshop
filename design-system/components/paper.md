# Paper elements: notes, tape, pins, stickers, polaroids, notebook page

All defined in globals.css. These carry the site's identity; compose them,
never restyle them.

## Sticky note `.note`

- Pastel `bg-note-*` background, 4px radius, `--shadow-note`
- Small tilt via inline `--tilt` custom property (roughly -3deg to 3deg),
  straightens on hover (kept tilted under reduced motion)
- Pin a note with `.tape` (blue washi strip) or `.pin` / `.pin-pink` (domed
  push pin); both are decorative, `pointer-events: none`

## Sticker `.sticker`

Die-cut look: 1rem radius, 4px white ring + note shadow, small rotation via
`--stick`, straightens with a tiny pop when the wrapping link is hovered or
focused.

## Polaroid `.polaroid`

White frame with wider bottom padding, 2px radius, tilt via `--tilt`,
straightens on hover.

## Notebook page `.notebook-page`

The shared surface of /about and /workshop: paper white, light dot grid
(radial-gradient dots far below text contrast), 14px radius, border, note
shadow. No overflow clipping so `.tape-corner-tl` / `.tape-corner-tr` strips
can overhang. Keep tape overhang inside the page's outer gutter so it never
causes horizontal scroll on small screens.

## Usage rules

- DO give every decorative paper element `aria-hidden="true"` or keep it CSS-only
- DO vary tilts slightly across a wall of notes so it reads hand-placed
- DO NOT put body copy below AA contrast on pastel notes; navy text only
- DO NOT add new paper props (staples, clips, torn edges) without a spec
  update; the family is deliberately small
- DO NOT animate paper beyond the straighten-on-hover already defined
