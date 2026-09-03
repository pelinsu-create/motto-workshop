"use client";

/* Live token readouts for the design system showcase. Values are read
   from the CSS custom properties at runtime so the page can never drift
   from globals.css, and no raw values ever appear in this file. */

import { useEffect, useState, type ReactNode } from "react";

function useTokenValue(name: string) {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(
      getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
    );
  }, [name]);
  return value;
}

export function ColorSwatch({ name, note }: { name: string; note?: string }) {
  const value = useTokenValue(name);
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-10 w-10 shrink-0 rounded-lg border border-border"
        style={{ background: `var(${name})` }}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="font-mono text-xs font-semibold text-navy">{name}</p>
        <p className="font-mono text-xs text-gray">{value}</p>
        {note && <p className="mt-0.5 text-xs text-gray">{note}</p>}
      </div>
    </div>
  );
}

export function InkPairSwatch({
  ink,
  paper,
  label,
}: {
  ink: string;
  paper: string;
  label: string;
}) {
  const inkValue = useTokenValue(ink);
  return (
    <div className="flex items-center gap-3">
      <span
        className="inline-block rounded-full px-3 py-1 text-[0.68rem] font-semibold leading-none"
        style={{ background: `var(${paper})`, color: `var(${ink})` }}
      >
        {label}
      </span>
      <p className="font-mono text-xs text-gray">
        {ink} {inkValue} on {paper}
      </p>
    </div>
  );
}

export function ValueRow({ name, note }: { name: string; note: string }) {
  const value = useTokenValue(name);
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border py-2 last:border-b-0">
      <p className="font-mono text-xs font-semibold text-navy">{name}</p>
      <p className="font-mono text-xs text-gray">{value}</p>
      <p className="w-full text-xs text-gray">{note}</p>
    </div>
  );
}

export function ShadowSwatch({ name, note }: { name: string; note: string }) {
  return (
    <div
      className="rounded-xl border border-border bg-surface p-5"
      style={{ boxShadow: `var(${name})` }}
    >
      <p className="font-mono text-xs font-semibold text-navy">{name}</p>
      <p className="mt-1 text-xs text-gray">{note}</p>
    </div>
  );
}

/* Small helper so tilt custom properties stay typed in one place */
export function Tilted({
  tilt,
  className = "",
  children,
}: {
  tilt: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={className}
      style={{ "--tilt": tilt } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
