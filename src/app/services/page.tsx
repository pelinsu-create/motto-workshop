import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { TrackedCTA } from "../tracked-cta";
import CheckBox from "../checkbox";

export const metadata: Metadata = {
  title: "Context Audit | Pelinsu Pelit",
  description:
    "Your company already knows what it needs to know. It just cannot find it. Three weeks to get it out, check it, and put it in one place.",
};

const headingClass = "text-2xl md:text-3xl text-navy";

const AUDIENCE = [
  "You have a decision with a date, and the answers are scattered",
  "You already did the research. Nobody can find it",
  "Your team asks AI, gets a confident answer, and cannot check it",
];

const WEEKS = [
  {
    name: "Open the room",
    subtitle: "Week one",
    bullets: [
      "Two hours with your team on the decision",
      "Six to eight interviews with the people who hear from customers",
    ],
    tint: "bg-note-mint",
    tilt: "-1.2deg",
  },
  {
    name: "Read everything",
    subtitle: "Week two",
    bullets: [
      "Tickets, churn, old research, your analytics",
      "Competitors, from their docs, not their marketing",
    ],
    tint: "bg-note-peach",
    tilt: "0.9deg",
  },
  {
    name: "Make it usable",
    subtitle: "Week three",
    bullets: [
      "Every claim traced back to who said it",
      "A readout with the people who decide",
    ],
    tint: "bg-note-lavender",
    tilt: "-0.7deg",
  },
];

const DELIVERABLES = [
  {
    title: "One place to look",
    body: "Everything in one file your team and your AI tools can actually read. Sources on every line. Yours to keep.",
  },
  {
    title: "Where your teams disagree",
    body: "Sales says one thing. Support sees another. Product assumed a third. All three written down.",
  },
  {
    title: "What nobody knows",
    body: "The holes, ranked by which decision they put at risk. I say where the evidence runs out instead of filling it in.",
  },
  {
    title: "How competitors actually work",
    body: "Read from their product docs, not their marketing. A feature nobody uses is an adoption problem, not a missing feature.",
  },
  {
    title: "A readout and one page",
    body: "A session with the people who decide, and a page they can forward.",
  },
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
                Your company already knows what it needs to know. It just cannot find
                it.
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
            className="text-base text-gray max-w-2xl leading-relaxed mt-6 mb-8 fade-rise"
            style={{ animationDelay: "140ms" }}
          >
            It is in support tickets. In sales calls. In research nobody opened again.
            In four people&apos;s heads. In three weeks I get it out, check it, and give
            you one place to look.
          </p>
          <div className="space-y-2.5 max-w-2xl mb-8 fade-rise" style={{ animationDelay: "170ms" }}>
            {AUDIENCE.map((item) => (
              <div key={item} className="flex gap-2.5 items-start text-sm">
                <CheckBox />
                <span className="text-navy leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          <div className="fade-rise" style={{ animationDelay: "210ms" }}>
            <TrackedCTA
              event="cta-service-hero"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy btn-press"
            >
              Book a 20-minute call
            </TrackedCTA>
          </div>
        </section>

        {/* The three weeks */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-2`}>Three weeks</h2>
          <p className="text-sm text-gray mb-8 max-w-2xl">
            The kick off is the{" "}
            <Link href="/workshop" className="text-accent hover:text-navy transition-colors">
              Research Sprint
            </Link>{" "}
            session, run on your own decision.
          </p>
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
                <p className="text-xs font-semibold text-gray uppercase tracking-wider mb-3">
                  {week.subtitle}
                </p>
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
          <h2 className={`${headingClass} mb-8`}>What you get</h2>
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

        {/* Proof */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-4`}>Look before you hire me</h2>
          <p className="text-sm text-navy leading-relaxed max-w-2xl">
            For a renewable energy client, a sector report and three competitor
            libraries became{" "}
            <Link href="/work/stakeholder-map" className="text-accent hover:text-navy transition-colors font-medium">
              a map of 87 stakeholders
            </Link>
            . They used it to decide which roles to build for first. The{" "}
            <Link href="/research-sprint/analyze" className="text-accent hover:text-navy transition-colors font-medium">
              Transcript Analyzer
            </Link>{" "}
            shows how I turn interviews into themes: quotes, participant IDs,
            confidence levels. The{" "}
            <Link href="/bias-check" className="text-accent hover:text-navy transition-colors font-medium">
              Bias Checker
            </Link>{" "}
            is what I run on my own analysis. Both free, no account.
          </p>
        </section>

        {/* Details */}
        <section className="py-10 border-t border-border">
          <h2 className={`${headingClass} mb-8`}>Details</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Format</p>
              <p className="text-sm text-navy">Remote. Three weeks. Part time across them.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Price</p>
              <p className="text-sm text-navy">Fixed fee, quoted after the call. Never hourly.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">I need from you</p>
              <p className="text-sm text-navy">A sponsor, someone to book the interviews, and access to what you have.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Not included</p>
              <p className="text-sm text-navy">No new customer research. No strategy deck. No review of people.</p>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="pt-10 pb-14 border-t border-border">
          <div className="note bg-note-mint p-8 text-center" style={{ "--tilt": "-0.6deg" } as CSSProperties}>
            <h2 className={`${headingClass} mb-4`}>Is this your problem?</h2>
            <p className="text-gray leading-relaxed mb-6 max-w-lg mx-auto">
              Twenty minutes on your decision and what you already have. If an audit is
              the wrong answer, I will say so on the call.
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
