"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-navy p-2"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-border shadow-lg">
          <div className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-gray">
            <Link href="/work" onClick={close} className="hover:text-navy transition-colors">
              Work
            </Link>
            <Link href="/about" onClick={close} className="hover:text-navy transition-colors">
              About
            </Link>
            <Link href="/services" onClick={close} className="hover:text-navy transition-colors">
              Services
            </Link>
            <Link href="/games" onClick={close} className="hover:text-navy transition-colors">
              Games
            </Link>
            <a
              href="mailto:pelinsu@mottoworkshop.com"
              onClick={close}
              className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-navy transition-colors text-center"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
