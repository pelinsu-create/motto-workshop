"use client";

import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-navy p-2"
        aria-label="Menu"
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
            <a href="/workshop" onClick={() => setOpen(false)} className="hover:text-navy transition-colors">
              Insight Hub Workshop
            </a>
            <a href="/lab" onClick={() => setOpen(false)} className="hover:text-navy transition-colors">
              Workshop Planner
            </a>
            <a href="https://motto-games.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="hover:text-navy transition-colors">
              Games
            </a>
            <a href="#about" onClick={() => setOpen(false)} className="hover:text-navy transition-colors">
              About
            </a>
            <a
              href="https://calendar.app.google/K83wsdYJEWv5mWh47"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-navy transition-colors text-center"
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
