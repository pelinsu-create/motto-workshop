/* Method-card language shared by the workshop games and tool pages.
   The structure comes from a printed co-design methods handbook: a card
   stacked in clearly ruled sections, with a solid visual panel on top,
   a title band, a row of pill tags, calm body text, and a TIP footer.
   The skin is the site's own paper language: white cards with the soft
   note shadow, site border rules, pastel panels with big emoji glyphs,
   and pastel pills with dark text. Tailwind utility classes only, so
   globals.css stays untouched. */

import type { ReactNode } from "react";

/* Outer shell: a white paper card with the site radius and the same
   soft shadow the sticky notes use. Exported as a class string so
   buttons and links can be cards too. */
export const cardShell =
  "overflow-hidden rounded-xl border border-border bg-surface [box-shadow:var(--shadow-note)]";

export function MethodCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${cardShell} ${className}`}>{children}</div>;
}

/* Section 1: the top visual panel. A soft pastel tint from the site
   palette with a simple centered glyph, like the tool notes on /work.
   Pass the background as a literal class, e.g. "bg-note-mint". */
export function CardVisual({
  children,
  bg,
  className = "",
}: {
  children: ReactNode;
  bg: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center border-b border-border ${bg} ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

/* Section 2: the title band. The site serif, normal casing. */
export function CardTitle({
  children,
  kicker,
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode;
  kicker?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={`border-b border-border px-5 py-3.5 ${className}`}>
      {kicker && <p className="section-label mb-1">{kicker}</p>}
      <Tag className="text-xl leading-snug text-navy">{children}</Tag>
    </div>
  );
}

/* Section 3: pill tags. Fully rounded, soft pastel, dark text. */
export type PillTone = "accent" | "navy" | "rose" | "mustard";

const PILL_TONES: Record<PillTone, string> = {
  accent: "bg-accent-light text-accent",
  navy: "bg-tag-bg text-navy",
  rose: "bg-[#fbdde9] text-[#a94a72]",
  mustard: "bg-note-cream text-[#8a6a15]",
};

export function Pill({
  tone = "accent",
  children,
}: {
  tone?: PillTone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[0.68rem] font-semibold leading-none ${PILL_TONES[tone]}`}
    >
      {children}
    </span>
  );
}

export function CardTags({
  tags,
  className = "",
}: {
  tags: { label: string; tone?: PillTone }[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-1.5 border-b border-border px-5 py-3 ${className}`}>
      {tags.map((t) => (
        <Pill key={t.label} tone={t.tone}>
          {t.label}
        </Pill>
      ))}
    </div>
  );
}

/* Section 4: the body. Calm reading text or interactive content. */
export function CardBody({
  children,
  className = "",
  ruled = false,
}: {
  children: ReactNode;
  className?: string;
  ruled?: boolean;
}) {
  return (
    <div className={`px-5 py-4 ${ruled ? "border-b border-border" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* Section 5: the TIP footer. Tinted paper, bold TIP, italic label. */
export function CardTip({
  label,
  children,
  tint = "bg-note-cream",
  className = "",
}: {
  label?: string;
  children: ReactNode;
  tint?: string;
  className?: string;
}) {
  return (
    <div
      className={`border-t border-border ${tint} px-5 py-3.5 text-sm leading-relaxed text-navy ${className}`}
    >
      <span className="font-bold">TIP: </span>
      {label && <span className="font-medium italic">{label} </span>}
      <span className="text-navy/80">{children}</span>
    </div>
  );
}

/* A ruled form section inside a method card: a small heading band, a
   light inner rule, then the section content. Used by the tool shells
   so forms read as pages from the same handbook. */
export function CardSection({
  title,
  hint,
  action,
  children,
  last = false,
  className = "",
}: {
  title: ReactNode;
  hint?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  last?: boolean;
  className?: string;
}) {
  return (
    <div className={`${last ? "" : "border-b border-border"} ${className}`}>
      <div className="flex items-baseline justify-between gap-3 border-b border-border px-5 py-3">
        <div>
          <h2 className="font-sans text-sm font-semibold text-navy">{title}</h2>
          {hint && <p className="mt-0.5 text-xs text-gray">{hint}</p>}
        </div>
        {action}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}
