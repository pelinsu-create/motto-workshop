/* Design system audit for mottoworkshop.com.
   Deterministic checks only; no AI judgment. Run: npm run audit:design
   Exit 1 on failures so it can gate generated work.

   Checks:
   1. TSX/TS: raw hex colors, rgba(), arbitrary color values, arbitrary px
      values above 4px. Style must come from tokens.
   2. Contrast: declared text/background token pairs must meet WCAG AA 4.5:1.
   3. Token sync: every :root token in globals.css is documented in
      design-system/tokens.md, and every token row there exists in code.
   4. CSS: raw color values outside the :root block are reported as warnings
      (globals.css is the token home; decorative literals stay visible). */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const APP = join(ROOT, "src", "app");
const GLOBALS = join(APP, "globals.css");
const TOKENS_MD = join(ROOT, "design-system", "tokens.md");

/* Files allowed to keep raw values, each with a reason and an expiry rule. */
const ALLOW = {
  "src/app/api/capture-email/route.ts":
    "HTML email template; email clients cannot read CSS variables, keep values matched to tokens.md by hand",
};

/* Tailwind default palette classes are drift, except the documented
   feedback families (see tokens.md, Feedback palette). */
const PALETTE =
  /(?:bg|text|border|from|to|via|ring|fill|stroke|placeholder|decoration|outline)-((?:slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|gray)-\d{2,3})\b/g;
const FEEDBACK_OK = /^(?:red|amber|emerald)-(?:50|100|200|300|400|500|600|700|800)$/;

/* Tokens defined outside the :root block (next/font, @theme aliases). */
const EXTERNAL_TOKENS = new Set([
  "--font-sans",
  "--font-serif",
  "--font-inter",
  "--font-playfair",
  "--font-caveat",
]);

/* Text on background pairs that must pass WCAG AA 4.5:1. */
const CONTRAST_PAIRS = [
  ["--foreground", "--background"],
  ["--navy", "--surface"],
  ["--navy", "--note-cream"],
  ["--navy", "--note-mint"],
  ["--navy", "--note-peach"],
  ["--navy", "--note-lavender"],
  ["--navy", "--note-yellow"],
  ["--navy", "--note-rose"],
  ["--gray", "--surface"],
  ["--gray", "--background"],
  ["--accent", "--surface"],
  ["--accent", "--accent-light"],
  ["--ink-rose", "--note-rose"],
  ["--ink-mustard", "--note-cream"],
  ["--success", "--success-light"],
  ["#ffffff", "--accent"],
];

/* Pairs reported but not failed (documented limitations). */
const CONTRAST_WARN_PAIRS = [["--gray-light", "--surface"]];

const failures = [];
const warnings = [];
const allowed = [];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(name)) out.push(p);
  }
  return out;
}

function rel(p) {
  return relative(ROOT, p).replaceAll("\\", "/");
}

/* Check 1: raw values in TSX/TS */
const HEX = /(?<!&)#[0-9a-fA-F]{3,8}\b/g;
for (const file of walk(APP)) {
  const r = rel(file);
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    const spot = `${r}:${i + 1}`;
    const hits = [];
    for (const m of line.matchAll(HEX)) hits.push(`raw hex ${m[0]}`);
    if (/rgba?\(/.test(line)) hits.push("raw rgb/rgba value");
    if (/\[#|\[rgba?/.test(line)) hits.push("arbitrary color class");
    for (const m of line.matchAll(/\[(\d+)px\]/g)) {
      if (Number(m[1]) > 4) hits.push(`arbitrary size [${m[1]}px]`);
    }
    for (const m of line.matchAll(PALETTE)) {
      if (!FEEDBACK_OK.test(m[1])) hits.push(`default palette class ${m[0]}`);
    }
    for (const h of hits) {
      if (ALLOW[r]) allowed.push(`${spot} ${h} (allowed: ${ALLOW[r]})`);
      else failures.push(`${spot} ${h}`);
    }
  });
}

/* Parse :root tokens from globals.css */
const css = readFileSync(GLOBALS, "utf8");
const rootBlock = css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
const tokens = {};
for (const m of rootBlock.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
  tokens[m[1]] = m[2].trim();
}

/* Check 2: contrast */
function luminance(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function resolve(ref) {
  return ref.startsWith("#") ? ref : tokens[ref];
}
function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
for (const [fg, bg] of CONTRAST_PAIRS) {
  const f = resolve(fg);
  const g = resolve(bg);
  if (!f || !g) {
    failures.push(`contrast pair ${fg} on ${bg}: token missing from :root`);
    continue;
  }
  const rt = ratio(f, g);
  if (rt < 4.5) failures.push(`contrast ${fg} on ${bg} is ${rt.toFixed(2)}:1, needs 4.5:1`);
}
for (const [fg, bg] of CONTRAST_WARN_PAIRS) {
  const f = resolve(fg);
  const g = resolve(bg);
  if (f && g) {
    const rt = ratio(f, g);
    if (rt < 4.5)
      warnings.push(
        `contrast ${fg} on ${bg} is ${rt.toFixed(2)}:1; keep for large or decorative text only`,
      );
  }
}

/* Check 3: token sync with design-system/tokens.md */
const spec = readFileSync(TOKENS_MD, "utf8");
for (const name of Object.keys(tokens)) {
  if (!spec.includes(name))
    failures.push(`token ${name} exists in globals.css but is not documented in tokens.md`);
}
for (const m of spec.matchAll(/`(--[a-z0-9-]+)`/g)) {
  const name = m[1];
  if (!tokens[name] && !EXTERNAL_TOKENS.has(name))
    failures.push(`token ${name} is documented in tokens.md but missing from globals.css :root`);
}

/* Check 4: raw colors in CSS outside :root (warnings) */
const outsideRoot = css.replace(/:root\s*\{[\s\S]*?\n\}/, "");
outsideRoot.split("\n").forEach((line, i) => {
  if (/#[0-9a-fA-F]{3,8}\b|rgba?\(/.test(line) && !line.trim().startsWith("/*")) {
    warnings.push(`globals.css raw value outside :root near line ${i + 1}: ${line.trim().slice(0, 70)}`);
  }
});

/* Report */
const say = (label, list) => {
  if (!list.length) return;
  console.log(`\n${label} (${list.length})`);
  for (const item of list) console.log(`  ${item}`);
};
console.log(`Design audit: ${failures.length} failure(s), ${warnings.length} warning(s), ${allowed.length} allowed exception(s)`);
say("FAILURES", failures);
say("WARNINGS", warnings);
say("ALLOWED", allowed);
process.exit(failures.length ? 1 : 0);
