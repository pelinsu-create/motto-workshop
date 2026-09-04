# Filter chips

## Anatomy

`ProjectFilter` in `src/app/project-filter.tsx`. A row of toggle buttons above a
list, plus the filtered list itself. Each chip is
`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium btn-press`,
the same shape and size as the availability badge in the homepage hero, so the
two read as one family.

| State | Classes |
|---|---|
| Off | `border-border bg-surface text-navy hover:bg-lavender` |
| On | `border-accent bg-accent text-white` |

Both states carry a border, so a chip does not change size when it is selected.
Each chip holds its label and a count in a `span` at `opacity-70`.

## Why this is not a Pill

`Pill` is a label and `pills.md` forbids using it as a button. A filter chip is a
control: it is a real `<button>`, it carries `aria-pressed`, and it takes the
site's `btn-press` feedback. Different job, different component.

## Progressive enhancement

The list renders in full on the server, so every item is in the HTML and
reachable with JavaScript off. The control row carries `js-only`, which
`globals.css` keeps hidden until the `js` class lands on `<html>`. Nobody is
offered a button that cannot work. This is the same contract as `.reveal`.

## Usage rules

- DO render the whole list server side and pass each card in as a `node`, so
  filtering is the only thing the client component does
- DO derive the chip row from the items themselves, so a tag cannot exist in the
  row without a project behind it
- DO show the count on each chip; a filter that leads to an empty list is a
  dead end the visitor should be able to see coming
- DO keep the tag set short enough to sit on one or two lines on a phone
- DO NOT use `Pill` for a control, and do not build a second filter row with
  its own styling
- DO NOT make the filter the only route to a project; the list is complete
  before anyone touches a chip
