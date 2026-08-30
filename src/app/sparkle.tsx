"use client";

import { useEffect, useRef, useState } from "react";
import { heartGlyph, sparkleGlyph } from "./delight-icons";

type Variant = "hearts" | "sparkles" | "mixed";

interface Particle {
  id: number;
  left: number;
  top: number;
  driftX: number;
  floatY: number;
  spin: number;
  size: number;
  delay: number;
  color: string;
  glyphIndex: number;
}

/* One burst per this window, so cursor jitter does not spam particles */
const BURST_COOLDOWN = 600;
/* Matches --motion-duration-delight in globals.css, plus the longest stagger */
const BURST_CLEANUP = 850;

const PINK = "var(--delight-pink)";
const BLUE = "var(--accent)";

/** Spawns a short burst of small particles around its child on hover.
 *  Defaults to hearts and four point sparkles in the site palette, or
 *  renders the glyphs handed in via icons, picked randomly per particle.
 *  Particles are decorative only: aria-hidden, no pointer events, no
 *  layout shift. Nothing spawns under prefers-reduced-motion or on
 *  pointers that cannot hover, so touch taps never leave a stuck burst. */
export default function Sparkle({
  children,
  variant = "mixed",
  density,
  icons,
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  /** Particles per burst. Defaults to a random 5 to 8. */
  density?: number;
  /** Custom glyphs, e.g. from delight-icons. Each should fill its box
   *  and use currentColor so the particle can color it. */
  icons?: React.ReactNode[];
  className?: string;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastBurst = useRef(0);
  const nextId = useRef(0);
  const cleanup = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (cleanup.current) clearTimeout(cleanup.current);
    },
    []
  );

  const glyphs =
    icons && icons.length > 0
      ? icons
      : variant === "hearts"
        ? [heartGlyph]
        : variant === "sparkles"
          ? [sparkleGlyph]
          : [heartGlyph, sparkleGlyph];

  function pickColor(glyphIndex: number) {
    if (icons && icons.length > 0) {
      return Math.random() < 0.5 ? BLUE : PINK;
    }
    /* Default glyphs: hearts are pink, sparkles are accent blue */
    return glyphs[glyphIndex] === heartGlyph ? PINK : BLUE;
  }

  function burst() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const now = Date.now();
    if (now - lastBurst.current < BURST_COOLDOWN) return;
    lastBurst.current = now;

    const count = density ?? 5 + Math.floor(Math.random() * 4);
    const next: Particle[] = Array.from({ length: count }, () => {
      /* Start near a random point on the element edges */
      const side = Math.floor(Math.random() * 4);
      const along = 10 + Math.random() * 80;
      const pos =
        side === 0
          ? { left: along, top: 0 }
          : side === 1
            ? { left: along, top: 100 }
            : side === 2
              ? { left: 0, top: along }
              : { left: 100, top: along };
      const glyphIndex = Math.floor(Math.random() * glyphs.length);
      return {
        id: nextId.current++,
        ...pos,
        driftX: Math.round(Math.random() * 12 - 6),
        floatY: Math.round(12 + Math.random() * 8),
        spin: Math.round(Math.random() * 40 - 20),
        size: Math.round(10 + Math.random() * 4),
        delay: Math.round(Math.random() * 120),
        color: pickColor(glyphIndex),
        glyphIndex,
      };
    });
    setParticles(next);
    if (cleanup.current) clearTimeout(cleanup.current);
    cleanup.current = setTimeout(() => setParticles([]), BURST_CLEANUP);
  }

  return (
    <span
      className={["sparkle-wrap", className].filter(Boolean).join(" ")}
      onMouseEnter={burst}
    >
      {children}
      {particles.map((p) => (
        <span
          key={p.id}
          aria-hidden="true"
          className="sparkle-particle"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              color: p.color,
              animationDelay: `${p.delay}ms`,
              "--drift-x": `${p.driftX}px`,
              "--float-y": `-${p.floatY}px`,
              "--spin": `${p.spin}deg`,
            } as React.CSSProperties
          }
        >
          {glyphs[p.glyphIndex]}
        </span>
      ))}
    </span>
  );
}
