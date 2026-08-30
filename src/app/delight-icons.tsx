/** Small single color glyphs for the Sparkle component. Each one fills its
 *  particle box and inherits the particle color through currentColor, so a
 *  page can hand any of these sets to Sparkle via the icons prop. */

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const heartGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const sparkleGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" />
  </svg>
);

const planeGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

const boxGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" {...line}>
    <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
    <path d="M3 8l9 5 9-5" />
    <line x1="12" y1="13" x2="12" y2="21" />
  </svg>
);

const calendarGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" {...line}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const deskGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" {...line}>
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="5" y1="9" x2="5" y2="20" />
    <line x1="19" y1="9" x2="19" y2="20" />
    <path d="M8 13h8v4H8z" />
  </svg>
);

const pawGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <circle cx="6.5" cy="9.5" r="2" />
    <circle cx="12" cy="7" r="2" />
    <circle cx="17.5" cy="9.5" r="2" />
    <path d="M12 11.5c-3.1 0-5.7 2.3-5.7 4.8 0 1.7 1.3 2.7 2.9 2.7 1 0 1.9-.5 2.8-.5s1.8.5 2.8.5c1.6 0 2.9-1 2.9-2.7 0-2.5-2.6-4.8-5.7-4.8z" />
  </svg>
);

const turbineGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" {...line}>
    <line x1="12" y1="11" x2="12" y2="22" />
    <line x1="12" y1="11" x2="12" y2="2" />
    <line x1="12" y1="11" x2="19.8" y2="15.5" />
    <line x1="12" y1="11" x2="4.2" y2="15.5" />
  </svg>
);

const nodesGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" {...line}>
    <circle cx="5" cy="6" r="2.5" />
    <circle cx="19" cy="6" r="2.5" />
    <circle cx="12" cy="18" r="2.5" />
    <line x1="7" y1="7.5" x2="10.5" y2="16" />
    <line x1="17" y1="7.5" x2="13.5" y2="16" />
    <line x1="7.5" y1="6" x2="16.5" y2="6" />
  </svg>
);

const stickyGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" {...line}>
    <path d="M4 4h16v10l-6 6H4z" />
    <path d="M14 20v-6h6" />
  </svg>
);

const magnifierGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" {...line}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const checkGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" {...line}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const cardGlyph = (
  <svg viewBox="0 0 24 24" width="100%" height="100%" {...line}>
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <path d="M12 9l2.4 3-2.4 3-2.4-3z" fill="currentColor" stroke="none" />
  </svg>
);

/* Project themed sets for the work and tool cards */
export const cargoGlyphs = [planeGlyph, boxGlyph];
export const officeGlyphs = [calendarGlyph, deskGlyph];
export const fluffyGlyphs = [pawGlyph, heartGlyph];
export const stakeholderGlyphs = [turbineGlyph, nodesGlyph];
export const workshopGlyphs = [stickyGlyph, sparkleGlyph];
export const biasCheckerGlyphs = [magnifierGlyph, checkGlyph];
export const activityLabGlyphs = [cardGlyph, sparkleGlyph];
