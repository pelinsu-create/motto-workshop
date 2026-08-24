import { TrackedCTA } from "../tracked-cta";

const PARTS = [
  {
    name: "Filter",
    line: "Process real sources with AI, extract claims with exact quotes, and check what is real with 3-Layer Verification and the 4 Hallucination Red Flags.",
  },
  {
    name: "Remix",
    line: "Structure the insights, classify fad versus trend versus megatrend, and run Bias Checker on your own analysis.",
  },
  {
    name: "Prototype",
    line: "Turn the findings into a shareable trend report and a weekly routine you keep using after the session.",
  },
];

const TAKEAWAYS = [
  "A trend report you built yourself",
  "Reusable AI prompt templates",
  "3-Layer Verification checklist",
  "4 Hallucination Red Flag cards",
  "A weekly research routine",
];

export default function WorkshopPage() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <p className="section-label mb-4">Workshop</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-4">
          Research Sprint
        </h1>
        <p className="text-base text-gray max-w-2xl leading-relaxed mb-8">
          A two to three hour online session on AI-assisted research, on a topic you
          choose. Where does AI help, and where do you still need to think for yourself?
        </p>
        <TrackedCTA
          event="cta-workshop-hero"
          className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
        >
          Book a call
        </TrackedCTA>
      </section>

      {/* Three parts, one line each */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">Three Parts</h2>
        <div className="space-y-6">
          {PARTS.map((part, i) => (
            <div key={part.name} className="flex gap-4">
              <span className="shrink-0 w-7 h-7 rounded-full bg-accent-light text-accent text-xs font-semibold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg text-navy font-semibold mb-1">{part.name}</h3>
                <p className="text-sm text-gray leading-relaxed">{part.line}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Games */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-4">Try the Games First</h2>
        <p className="text-gray leading-relaxed mb-6 max-w-2xl">
          Hallucination Hunter, Bad Idea Bingo and Hat Roulette are playable now, free,
          no account. In the session we play them against your own project.
        </p>
        <a
          href="/games"
          className="inline-block border border-border text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-lavender transition-colors"
        >
          Play the games &rarr;
        </a>
      </section>

      {/* Transcript Analyzer */}
      <section className="py-16 border-t border-border">
        <p className="section-label mb-3">Tool</p>
        <h2 className="text-2xl md:text-3xl text-navy mb-4">Transcript Analyzer</h2>
        <p className="text-gray leading-relaxed mb-6 max-w-2xl">
          The tool side of the same practice. Upload interview transcripts and get
          structured insights with confidence ratings, quotes, and bias flags. Sample
          interviews are included, no account needed.
        </p>
        <a
          href="/research-sprint/analyze"
          className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
        >
          Try Transcript Analyzer &rarr;
        </a>
      </section>

      {/* What you leave with */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">What You Leave With</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {TAKEAWAYS.map((item) => (
            <div key={item} className="flex gap-2 items-start text-sm">
              <span className="text-accent mt-0.5">&#10003;</span>
              <span className="text-navy">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Details, compact */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">Details</h2>
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

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="bg-surface border border-border rounded-xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl text-navy mb-4">Interested?</h2>
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
  );
}
