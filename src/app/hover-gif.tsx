"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HoverGifProps = {
  staticSrc: string;
  animSrc: string;
  alt: string;
  sizes?: string;
  className?: string;
};

// Shows the static thumbnail until the surrounding card link is hovered or
// focused, then swaps in the animated GIF. The GIF only downloads on first
// hover, so the page stays light for people who never interact.
export default function HoverGif({
  staticSrc,
  animSrc,
  alt,
  sizes,
  className,
}: HoverGifProps) {
  const [active, setActive] = useState(false);
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = marker.current?.closest("a");
    if (!card) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => {
      if (!media.matches) setActive(true);
    };
    const off = () => setActive(false);
    card.addEventListener("mouseenter", on);
    card.addEventListener("mouseleave", off);
    card.addEventListener("focus", on);
    card.addEventListener("blur", off);
    return () => {
      card.removeEventListener("mouseenter", on);
      card.removeEventListener("mouseleave", off);
      card.removeEventListener("focus", on);
      card.removeEventListener("blur", off);
    };
  }, []);

  return (
    <>
      <span ref={marker} className="hidden" aria-hidden="true" />
      <Image
        src={active ? animSrc : staticSrc}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized={active}
        className={className}
      />
    </>
  );
}
