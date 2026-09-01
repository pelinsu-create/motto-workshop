import type { CSSProperties } from "react";
import { TrackedCTA } from "../tracked-cta";
import { caveat } from "../notebook-font";

const headingClass = `${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy`;

const PARTS = [
  {
    name: "Filter",
    line: "Process real sources with AI, extract claims with exact quotes, and check what is real with 3-Layer Verification and the 4 Hallucination Red Flags.",
    tint: "bg-note-mint",
    tilt: "-1.2deg",
  },
  {
    name: "Remix",
    line: "Structure the insights, classify fad versus trend versus megatrend, and run Bias Checker on your own analysis.",
    tint: "bg-note-peach",
    tilt: "0.9deg",
  },
  {
    name: "Prototype",
    line: "Turn the findings into a shareable trend report and a weekly routine you keep using after the session.",
    tint: "bg-note-lavender",
    tilt: "-0.7deg",
  },
];

const TAKEAWAYS = [
  "A trend report you built yourself",
  "Reusable AI prompt templates",
  "3-Layer Verification checklist",
  "4 Hallucination Red Flag cards",
  "A weekly research routine",
];

function CheckBox() {
  return (
    <span
      className="mt-0.5 shrink-0 w-4 h-4 rounded-[3px] border border-accent/60 bg-white/60 text-accent flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

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
            A two to three hour online session on AI-assisted research, on a topic you
            choose. We practice which parts of research you can hand to AI and which
            parts you should not, with verification checklists and games I built for it.
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

        {/* Three parts, each pasted in on its own post-it */}
        <section className="py-10 doodle-divider">
          <h2 className={`${headingClass} mb-8`}>Three Parts</h2>
          <div className="grid gap-6 md:grid-cols-3 md:gap-5">
            {PARTS.map((part, i) => (
              <div
                key={part.name}
                className={`note h-full p-6 ${part.tint}`}
                style={{ "--tilt": part.tilt } as CSSProperties}
              >
                <span
                  className={i % 2 === 0 ? "tape" : "tape tape-pink"}
                  aria-hidden="true"
                />
                <span className="w-7 h-7 rounded-full bg-white/70 text-accent text-xs font-semibold flex items-center justify-center mb-3">
                  {i + 1}
                </span>
                <h3 className="text-lg text-navy font-semibold mb-1">{part.name}</h3>
                <p className="text-sm text-navy-mid leading-relaxed">{part.line}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Games */}
        <section className="py-10 doodle-divider">
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
        <section className="py-10 doodle-divider">
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
        <section className="py-10 doodle-divider">
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
        <section className="py-10 doodle-divider">
          <h2 className={`${headingClass} mb-8`}>Details</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Format</p>
              <p className="text-sm text-navy">Online, 2 to 3 hours, max 12 people</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Topic</p>
              <p className="text-sm text-navy">Yours. A demo topic is ready if you have none.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Tools</p>
              <p className="text-sm text-navy">Claude, NotebookLM, the games</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">You need</p>
              <p className="text-sm text-navy">A Claude account. NotebookLM is free.</p>
            </div>
          </div>
        </section>

        {/* CTA on a pinned sticky note */}
        <section className="pt-10 pb-14 doodle-divider">
          <div className="note bg-note-mint p-8 text-center" style={{ "--tilt": "-0.6deg" } as CSSProperties}>
            <span className="pin" aria-hidden="true" />
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
