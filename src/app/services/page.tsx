import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { TrackedCTA } from "../tracked-cta";
import CheckBox from "../checkbox";

export const metadata: Metadata = {
  title: "Context Audit | Pelinsu Pelit",
  description:
    "Three weeks to turn what your company already knows into evidence you can decide with. Internal interviews, existing material, and one evidence base your team and your AI tools can read.",
};

const headingClass = "text-2xl md:text-3xl text-navy";

const AUDIENCE = [
  "You have a decision with a date, and the evidence for it is scattered across teams",
  "Your company already ran research, and nobody can find it, trust it, or reopen it",
  "Your team feeds AI tools a mess and gets confident answers back that nobody can trace to a source",
];

const WEEKS = [
  {
    name: "Open the room",
    subtitle: "Week one",
    line: "We agree what the decision is, then I talk to the people who already hear from your customers.",
    bullets: [
      "Two hour kick off on the decision at hand",
      "What the team assumes, written down before anything is tested",
      "Six to eight internal interviews: support, onboarding, sales, product",
    ],
    tint: "bg-note-mint",
    tilt: "-1.2deg",
  },
  {
    name: "Read everything",
    subtitle: "Week two",
    line: "Everything the company already holds gets read, including the material nobody has opened in a year.",
    bullets: [
      "Support tickets, churn analysis, past research",
      "Product analytics you already collect",
      "Competitor and category material",
    ],
    tint: "bg-note-peach",
    tilt: "0.9deg",
  },
  {
    name: "Make it usable",
    subtitle: "Week three",
    line: "Coding, clustering, and a verification pass on every claim before anything reaches you.",
    bullets: [
      "Themes clustered, each carrying its sources",
      "A bias check run on my own analysis",
      "Readout with the people who have to decide",
    ],
    tint: "bg-note-lavender",
    tilt: "-0.7deg",
  },
];

const DELIVERABLES = [
  {
    title: "An evidence base your AI tools can read",
    body: "Everything collected, structured and source cited, in a format your team can load into its own tools instead of pasting fragments and hoping. Yours to keep.",
  },
  {
    title: "A contradiction log",
    body: "Where your teams disagree about the same customer. Sales says one thing, support sees another, product assumed a third. Both positions written down, with what it would cost to be wrong.",
  },
  {
    title: "A gap list, ranked by decision risk",
    body: "What nobody in the company actually knows, ordered by which decision it threatens. This is the part that says where the evidence runs out instead of covering the hole with a plausible summary.",
  },
  {
    title: "A theme map with confidence levels",
    body: "Themes marked high, medium or low confidence, each traceable to a named source. If a finding cannot be traced, it does not ship as a finding.",
  },
  {
    title: "A readout and a one page brief",
    body: "A working session with the people who decide, and a single page they can forward without rewriting it.",
  },
];

const NOT = [
  "Not new customer research. This audits what already exists inside your company. Talking to your customers is the next step, not this one.",
  "Not a strategy deck. You get evidence and named gaps, not a recommendation dressed up as certainty.",
  "Not an analytics project. What you already collect gets read, not rebuilt.",
  "Not a review of people. Findings attach to sources and processes, never to individuals.",
];

export default function ServicesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="notebook-page relative px-5 sm:px-8 md:px-12">
        <span className="tape-corner tape-corner-tl" aria-hidden="true" />
        <span className="tape-corner tape-corner-tr" aria-hidden="true" />

        {/* Hero */}
        <section className="pt-14 pb-12 md:pt-20">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="section-label mb-4 fade-rise">Service</p>
              <h1
                className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-4 fade-rise"
                style={{ animationDelay: "70ms" }}
              >
                Context Audit
              </h1>
              <p
                className="text-lg text-navy-mid leading-snug fade-rise"
                style={{ animationDelay: "100ms" }}
              >
                Three weeks to turn what your company already knows into evidence you
                can decide with.
              </p>
            </div>
            <span
              className="sticker hidden sm:flex items-center justify-center w-16 h-16 mt-4 shrink-0 bg-white text-3xl fade-rise"
              style={{ "--stick": "-5deg", animationDelay: "140ms" } as CSSProperties}
              aria-hidden="true"
            >
              &#128269;
            </span>
          </div>
          <p
            className="text-base text-gray max-w-2xl leading-relaxed mb-8 fade-rise"
            style={{ animationDelay: "140ms" }}
          >
            Your team already knows more about your customers than any document shows.
            It sits in support tickets, sales calls, research nobody reopened, and a few
            people&apos;s heads. I collect it, check every claim against its source, and
            hand it back as one evidence base your team and your AI tools can actually
            read.
          </p>
          <div className="fade-rise" style={{ animationDelay: "210ms" }}>
            <TrackedCTA
              event="cta-service-hero"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy btn-press"
            >
              Book a 20-minute call
            </TrackedCTA>
          </div>
        </section>

        {/* Who it is for */}
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

        {/* The three weeks */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-8`}>The Three Weeks</h2>
          <div className="grid gap-6 md:grid-cols-3 md:gap-5">
            {WEEKS.map((week, i) => (
              <div
                key={week.name}
                className={`note h-full p-6 flex flex-col ${week.tint}`}
                style={{ "--tilt": week.tilt } as CSSProperties}
              >
                <span className="tape" aria-hidden="true" />
                <span className="w-7 h-7 rounded-full bg-white/70 text-accent text-xs font-semibold flex items-center justify-center mb-3">
                  {i + 1}
                </span>
                <h3 className="text-lg text-navy font-semibold mb-0.5">{week.name}</h3>
                <p className="text-xs font-semibold text-gray uppercase tracking-wider mb-2">
                  {week.subtitle}
                </p>
                <p className="text-sm text-navy-mid leading-relaxed mb-3">{week.line}</p>
                <ul className="space-y-1.5 flex-1">
                  {week.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 items-start text-sm text-navy-mid leading-relaxed"
                    >
                      <span
                        className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0"
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* What you get */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-8`}>What You Get</h2>
          <div className="space-y-5 max-w-2xl">
            {DELIVERABLES.map((item) => (
              <div key={item.title} className="flex gap-2.5 items-start">
                <CheckBox />
                <div>
                  <h3 className="text-base text-navy font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scope guard */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-4`}>What It Is Not</h2>
          <p className="text-gray leading-relaxed mb-6 max-w-2xl">
            Written here so it is clear before we start, not argued about in week three.
          </p>
          <div className="note bg-note-cream p-6 sm:p-7" style={{ "--tilt": "0.8deg" } as CSSProperties}>
            <span className="tape" aria-hidden="true" />
            <ul className="space-y-3">
              {NOT.map((item) => (
                <li key={item} className="flex gap-2 items-start text-sm text-navy leading-relaxed">
                  <span
                    className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Proof */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-4`}>How I Work, In Public</h2>
          <p className="text-gray leading-relaxed mb-6 max-w-2xl">
            Every part of this audit is something you can look at before you hire me.
            The methods are on this site, running, free, no account.
          </p>
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm text-navy leading-relaxed">
              <Link href="/work/stakeholder-map" className="text-accent hover:text-navy transition-colors font-medium">
                A delivered research engagement
              </Link>
              {" "}
              for a renewable energy client: desk research turned into a map of 87
              stakeholders, used to decide which roles the product should support first.
            </p>
            <p className="text-sm text-navy leading-relaxed">
              <Link href="/research-sprint/analyze" className="text-accent hover:text-navy transition-colors font-medium">
                The Transcript Analyzer
              </Link>
              {" "}
              shows how interviews become themes here: quotes, participant IDs,
              confidence ratings and bias flags. Sample transcripts included.
            </p>
            <p className="text-sm text-navy leading-relaxed">
              <Link href="/bias-check" className="text-accent hover:text-navy transition-colors font-medium">
                The Bias Checker
              </Link>
              {" "}
              is the check I run on my own analysis before anything reaches you, against
              twenty research biases.
            </p>
          </div>
        </section>

        {/* Details */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-8`}>Details</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Format</p>
              <p className="text-sm text-navy">Remote, three weeks, part time across them</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Contact moments</p>
              <p className="text-sm text-navy">Kick off, interviews, one progress note, readout. I do the rest out of your way.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Price</p>
              <p className="text-sm text-navy">A fixed fee, quoted after the call. Not an hourly rate.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">I need from you</p>
              <p className="text-sm text-navy">One sponsor, one person to schedule interviews, and access to what you already have.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Availability</p>
              <p className="text-sm text-navy">One engagement at a time.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Your team joins</p>
              <p className="text-sm text-navy">
                The kick off is the{" "}
                <Link href="/workshop" className="text-accent hover:text-navy transition-colors">
                  Research Sprint
                </Link>
                {" "}
                session, run on your own decision.
              </p>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="pt-10 pb-14 border-t border-border">
          <div className="note bg-note-mint p-8 text-center" style={{ "--tilt": "-0.6deg" } as CSSProperties}>
            <h2 className={`${headingClass} mb-4`}>Is this your problem?</h2>
            <p className="text-gray leading-relaxed mb-6 max-w-lg mx-auto">
              Twenty minutes on your decision and what you already hold. If an audit is
              not the right thing, I will say so on the call.
            </p>
            <TrackedCTA
              event="cta-service-bottom"
              className="inline-block bg-accent text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-navy btn-press"
            >
              Book a 20-minute call
            </TrackedCTA>
          </div>
        </section>
      </div>
    </div>
  );
}
