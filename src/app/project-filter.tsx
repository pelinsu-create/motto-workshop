"use client";

import { useState, type ReactNode } from "react";

export type FilterItem = {
  /** Stable key, the project href */
  id: string;
  /** Topics this project belongs to. A project can carry several. */
  tags: string[];
  /** The card, rendered on the server and handed over as a prop */
  node: ReactNode;
};

const ALL = "All";

/** Topic filter above a project list. The list renders in full on the
 *  server, so every project is in the HTML and reachable without
 *  JavaScript; the control row itself carries js-only, so nobody is
 *  offered a button that cannot work. */
export default function ProjectFilter({
  items,
  label = "Filter projects by topic",
}: {
  items: FilterItem[];
  label?: string;
}) {
  const [active, setActive] = useState(ALL);

  // Tag order follows first appearance in the list, so the row reads in
  // the same order as the work underneath it.
  const tags = [
    ALL,
    ...items
      .flatMap((i) => i.tags)
      .filter((tag, i, all) => all.indexOf(tag) === i),
  ];

  const countOf = (tag: string) =>
    tag === ALL ? items.length : items.filter((i) => i.tags.includes(tag)).length;

  const shown = active === ALL ? items : items.filter((i) => i.tags.includes(active));

  return (
    <>
      <div className="js-only flex-wrap gap-2 mb-8" role="group" aria-label={label}>
        {tags.map((tag) => {
          const on = tag === active;
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(tag)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium btn-press transition-colors ${
                on
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-surface text-navy hover:bg-lavender"
              }`}
            >
              {tag}
              <span className="opacity-70">{countOf(tag)}</span>
            </button>
          );
        })}
      </div>
      <div className="space-y-6">
        {shown.map((i) => (
          <div key={i.id}>{i.node}</div>
        ))}
      </div>
    </>
  );
}
