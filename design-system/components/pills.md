# Pills and tags

## Anatomy

`Pill` in src/app/method-card.tsx: `rounded-full px-3 py-1 text-[0.68rem] font-semibold leading-none`.
The 0.68rem size is the one sanctioned off-scale type size on the site.

## Tones (closed set)

| Tone | Classes | Meaning |
|---|---|---|
| `accent` | `bg-accent-light text-accent` | Default, AI-powered, feature tags |
| `navy` | `bg-tag-bg text-navy` | Neutral category tags |
| `rose` | `bg-note-rose text-ink-rose` | Warm or playful category |
| `mustard` | `bg-note-cream text-ink-mustard` | Customisable, craft category |

## Usage rules

- DO use the `Pill` component with a `tone` prop; extend `PILL_TONES` if a new
  tone is truly needed, and add the ink + paper tokens first
- DO keep pill text to one or two words
- DO NOT invent pill color pairs inline; every tone is a paper + ink token pair
  that has passed the contrast audit
- DO NOT use pills as buttons; they are labels
