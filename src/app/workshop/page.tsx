import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { TrackedCTA } from "../tracked-cta";
import CheckBox from "../checkbox";

export const metadata: Metadata = {
  title: "Research Sprint Workshop | Pelinsu Pelit",
  description:
    "A three hour hands-on sprint for teams that do research. Practice what to hand to AI, what to keep, and how to check what comes back.",
};

const headingClass = "text-2xl md:text-3xl text-navy";

const PARTS = [
  {
    name: "Collect",
    subtitle: "Get everything into one place",
    line: "Scattered links, notes and documents become one working source of truth.",
    bullets: [
      "Bring your sources into one center",
      "Build a source list your team can maintain",
      "Map what you have with a mindmap",
      "Check what is real with the 3 Layer Verification checklist",
    ],
    tools: "NotebookLM + Gemini",
    tint: "bg-note-mint",
    tilt: "-1.2deg",
  },
  {
    name: "Analyze",
    subtitle: "Turn it into insights you can defend",
    line: "Move past generic summaries and make the thinking visible.",
    bullets: [
      "Produce insights with the 4 Question Context Frame",
      "Analyze with different lenses, beyond summary prompts",
      "Draw your team's line on synthetic users and AI shortcuts",
      "Run Bias Checker on your own analysis",
    ],
    tools: "ChatGPT + Claude + Bias Checker",
    tint: "bg-note-peach",
    tilt: "0.9deg",
  },
  {
    name: "Keep",
    subtitle: "Make it reusable and write the rules",
    line: "The session ends with rules and templates your team keeps using.",
    bullets: [
      "Write your team AI charter: what you hand over, what you never do, how you verify",
      "Reusable prompt templates for your own projects",
      "Pre-prototype your insight system with Claude",
    ],
    tools: "Claude + Notion",
    tint: "bg-note-lavender",
    tilt: "-0.7deg",
  },
];

const AUDIENCE = [
  "Your team uses AI for research or design work and everyone does it a little differently",
  "Product managers and designers run their own research and want guardrails they can trust",
  "You keep saving content you never return to, and want a system that produces insights instead of bookmarks",
];

const TAKEAWAYS = [
  "A one page team AI charter: what you hand to AI, what you never do, how you verify",
  "Your knowledge collected in one center",
  "A source list your team can maintain",
  "The 4 Question Context Frame",
  "Reusable AI prompt templates",
  "My verification checklists and the games, to keep practicing",
];

export default function WorkshopPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* The whole page reads as one dot-grid journal page, taped down at
          the top corners, with post-its and stickers pasted in. Copy is
          unchanged, this is a visual restyle. */}
      <div className="notebook-page relative px-5 sm:px-8 md:px-12">
        <span className="tape-corner tape-corner-tl" aria-hidden="true" />
        <span className="tape-corner tape-corner-tr" aria-hidden="true" />

        {/* Hero */}
        <section className="pt-14 pb-12 md:pt-20">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="section-label mb-4 fade-rise">Workshop</p>
              <h1
                className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-4 fade-rise"
                style={{ animationDelay: "70ms" }}
              >
                Research Sprint
              </h1>
              <p
                className="text-lg text-navy-mid leading-snug fade-rise"
                style={{ animationDelay: "100ms" }}
              >
                A three hour hands-on sprint for teams that do research.
              </p>
            </div>
            {/* A die-cut emoji sticker pasted next to the title */}
            <span
              className="sticker hidden sm:flex items-center justify-center w-16 h-16 mt-4 shrink-0 bg-white text-3xl fade-rise"
              style={{ "--stick": "-5deg", animationDelay: "140ms" } as CSSProperties}
              aria-hidden="true"
            >
              &#129513;
            </span>
          </div>
          <p
            className="text-base text-gray max-w-2xl leading-relaxed mb-8 fade-rise"
            style={{ animationDelay: "140ms" }}
          >
            Your team already uses AI somewhere in its research. This session makes
            that use deliberate. We practice what to hand to AI, what to keep doing
            yourselves, and how to check what comes back, on your own topic, with
            checklists and games I built for it.
          </p>
          <div className="fade-rise" style={{ animationDelay: "210ms" }}>
            <TrackedCTA
              event="cta-workshop-hero"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
            >
              Book a call
            </TrackedCTA>
          </div>
        </section>

        {/* Who the session is for, a checklist in the journal */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-4`}>Who Is It For?</h2>
          <div className="space-y-3 max-w-2xl">
            {AUDIENCE.map((item) => (
              <div key={item} className="flex gap-2.5 items-start text-sm">
                <CheckBox />
                <span className="text-navy leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* The three hour agenda, each part pasted in on its own post-it */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-8`}>The Three Hour Workshop</h2>
          <div className="grid gap-6 md:grid-cols-3 md:gap-5">
            {PARTS.map((part, i) => (
              <div
                key={part.name}
                className={`note h-full p-6 flex flex-col ${part.tint}`}
                style={{ "--tilt": part.tilt } as CSSProperties}
              >
                <span
                  className="tape"
                  aria-hidden="true"
                />
                <span className="w-7 h-7 rounded-full bg-white/70 text-accent text-xs font-semibold flex items-center justify-center mb-3">
                  {i + 1}
                </span>
                <h3 className="text-lg text-navy font-semibold mb-0.5">{part.name}</h3>
                <p className="text-xs font-semibold text-gray uppercase tracking-wider mb-2">
                  {part.subtitle}
                </p>
                <p className="text-sm text-navy-mid leading-relaxed mb-3">{part.line}</p>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {part.bullets.map((b) => (
                    <li key={b} className="flex gap-2 items-start text-sm text-navy-mid leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-medium text-gray border-t border-navy/10 pt-2.5">
                  {part.tools}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Games */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-4`}>Try the Games First</h2>
          <p className="text-gray leading-relaxed mb-6 max-w-2xl">
            Hallucination Hunter, Bad Idea Bingo and Hat Roulette are playable now, free,
            no account. In the session we play them against your own project.
          </p>
          <a
            href="/games"
            className="inline-block border border-border bg-surface text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-lavender transition-colors"
          >
            Play the games &rarr;
          </a>
        </section>

        {/* Transcript Analyzer */}
        <section className="py-10 border-t border-border">
          <p className="section-label mb-3">Tool</p>
          <h2 className={`${headingClass} mb-4`}>Transcript Analyzer</h2>
          <p className="text-gray leading-relaxed mb-6 max-w-2xl">
            Upload interview transcripts and get structured insights with confidence
            ratings, quotes, and bias flags. Sample interviews are included, no account
            needed.
          </p>
          <a
            href="/research-sprint/analyze"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
          >
            Try Transcript Analyzer &rarr;
          </a>
        </section>

        {/* What you leave with, a checklist on a taped post-it */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-8`}>What You Leave With</h2>
          <div className="note bg-note-cream p-6 sm:p-7" style={{ "--tilt": "0.8deg" } as CSSProperties}>
            <span className="tape" aria-hidden="true" />
            <div className="grid md:grid-cols-2 gap-4">
              {TAKEAWAYS.map((item) => (
                <div key={item} className="flex gap-2.5 items-start text-sm">
                  <CheckBox />
                  <span className="text-navy">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Details, compact */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-8`}>Details</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Format</p>
              <p className="text-sm text-navy">Online, 3 hours, max 12 people</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Topic</p>
              <p className="text-sm text-navy">Yours. A demo topic is ready if you have none.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Tools</p>
              <p className="text-sm text-navy">NotebookLM, Gemini, ChatGPT, Claude, Notion, the games</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">You need</p>
              <p className="text-sm text-navy">Claude and ChatGPT accounts. NotebookLM and Notion have free plans.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Who</p>
              <p className="text-sm text-navy">Mixed teams work best: researchers, designers, product managers.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Good to know</p>
              <p className="text-sm text-navy">A documented, hands-on step toward the AI literacy the EU AI Act expects from teams that use AI.</p>
            </div>
          </div>
        </section>

        {/* CTA on a pinned sticky note */}
        <section className="pt-10 pb-14 border-t border-border">
          <div className="note bg-note-mint p-8 text-center" style={{ "--tilt": "-0.6deg" } as CSSProperties}>
            <h2 className={`${headingClass} mb-4`}>Interested?</h2>
            <p className="text-gray leading-relaxed mb-6 max-w-lg mx-auto">
              Book a call and we&apos;ll find a date that works.
            </p>
            <TrackedCTA
              event="cta-workshop-bottom"
              className="inline-block bg-accent text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
            >
              Book a Call
            </TrackedCTA>
          </div>
        </section>
      </div>
    </div>
  );
}
