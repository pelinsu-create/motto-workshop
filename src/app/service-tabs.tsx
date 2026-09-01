"use client";

import { useState } from "react";

interface Service {
  id: string;
  tab: string;
  desc: string;
  items: string[];
  deliverable?: string[];
  scenario: { title: string; steps: string[] };
  footer: string;
}

const services: Service[] = [
  {
    id: "clearing",
    tab: "Report Clearing",
    desc: "Your team uses AI for reports, research, or analysis. We verify every claim, stat, and citation using our 3-Layer Verification method. Turnaround: 24\u201348 hours.",
    items: [
      "Layer 1 \u2014 Existence Check: Does every cited source actually exist? We verify titles, authors, institutions, and URLs.",
      "Layer 2 \u2014 Content Check: Does each source actually say what the report claims? Real articles get fabricated findings \u2014 we catch them.",
      "Layer 3 \u2014 Context Check: Is each source used appropriately? We flag preliminary studies treated as definitive, correlation presented as causation, and cherry-picked evidence.",
      "Red Flag Scan: We check for the 4 hallucination patterns \u2014 suspiciously specific percentages, impossibly recent studies, unrealistic sample sizes, and too-convenient citations.",
    ],
    scenario: {
      title: "Example: A consultancy using AI for a market analysis report",
      steps: [
        "Client sends a 20-page AI-generated market report with 35 citations",
        "We run 3-Layer Verification: 8 citations don\u2019t exist, 4 misrepresent findings, 2 use outdated data",
        "Client gets the report back with confidence ratings per section and replacement sources",
        "Turnaround: 36 hours. Client presents to their board with confidence",
      ],
    },
    deliverable: [
      "Confidence rating per section (high / medium / low)",
      "Every hallucination flagged with explanation",
      "Replacement sources where available",
      "Delivered in 24\u201348 hours",
    ],
    footer: "For teams where a wrong stat, fake citation, or misrepresented finding = real risk",
  },
  {
    id: "critique",
    tab: "Design Critique",
    desc: "Your team brings a design, prototype, or concept. AI reviews it from multiple perspectives and plants one deliberate challenge for your team to find. 1\u20132 sessions, max 2 hours each.",
    items: [
      "AI generates 9 alternative solutions: 7 bad, 1 genuinely good, 1 dangerous but convincing. Your team finds which is which.",
      "AI personas review the design: a frustrated user, a first-timer, an accessibility advocate. Your team interprets and decides.",
      "Critical Eye: AI includes one deliberate flaw. Your team reads critically to spot it.",
    ],
    scenario: {
      title: "Example: A design team reviewing a checkout flow",
      steps: [
        "Team shares 3 key screens from the proposed redesign",
        "AI personas react: Sam (first-timer) gets lost at step 2, Robin (accessibility) flags missing keyboard navigation",
        "Team spots a pattern they missed in their own reviews",
        "Session ends with a prioritized list of changes",
      ],
    },
    footer: "For teams who want structured, multi-perspective feedback before building",
  },
  {
    id: "exploration",
    tab: "Exploration",
    desc: "Your team explores a new direction: a trend, a competitor move, a research finding. I can bring the research, or you bring your own topic. 2\u20133 sessions, max 2 hours each.",
    items: [
      "3 stakeholder hats on the same idea: AI roleplays each perspective, your team compares reactions.",
      "AI builds scenario storyboards from your research. Your team predicts the outcome before seeing AI\u2019s version.",
      "Trend filtering: AI generates opportunities from market data, your team votes on which to pursue.",
    ],
    scenario: {
      title: "Example: A fintech team exploring AI features for their product",
      steps: [
        "I deliver a landscape report on AI trends in fintech",
        "Team builds a user scenario, AI creates a 6-panel storyboard",
        "3 stakeholder hats react: the regulator, the power user, the newcomer",
        "Team prioritizes opportunities and defines next steps",
      ],
    },
    footer: "For teams exploring new spaces, trends, or ideas collaboratively",
  },
  {
    id: "mentoring",
    tab: "Workshop Mentoring",
    desc: "You want your team to run these sessions on their own. I help you set up the games, coach through facilitation, and hand over the tools. 3\u20134 sessions, max 2 hours each.",
    items: [
      "We pick the right games for your team\u2019s goals and customize the AI prompts together.",
      "I coach through the first live sessions with real-time feedback.",
      "Your team runs future sessions independently.",
    ],
    scenario: {
      title: "Example: A design lead wants weekly AI-powered critiques",
      steps: [
        "We design the session format: Bad Idea Bingo + Hat Roulette + structured reflection",
        "I coach through the first two sessions",
        "We set up the tools and AI prompts for independent use",
        "The lead runs future sessions with async support",
      ],
    },
    footer: "For teams that want to build internal AI collaboration capability",
  },
];

export default function ServiceTabs() {
  const [active, setActive] = useState("clearing");
  const current = services.find((s) => s.id === active)!;

  return (
    <div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              active === s.id
                ? "bg-accent text-white"
                : "bg-surface border border-border text-gray hover:text-navy hover:border-gray/30"
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-8 max-w-2xl">
        <p className="text-sm text-gray leading-relaxed mb-6">{current.desc}</p>
        <ul className="space-y-2.5 mb-6">
          {current.items.map((item) => (
            <li
              key={item}
              className="text-sm text-navy-mid flex items-start gap-2"
            >
              <span className="text-accent mt-0.5">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>

        {current.deliverable && (
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-5 mb-6">
            <p className="text-xs font-semibold text-accent mb-3">What you get back</p>
            <ul className="space-y-1.5">
              {current.deliverable.map((item) => (
                <li key={item} className="text-xs text-navy flex items-start gap-2">
                  <span className="text-accent mt-0.5">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {current.scenario && (
          <div className="bg-lavender/30 rounded-lg p-5 mb-6">
            <p className="text-xs font-semibold text-accent mb-3">{current.scenario.title}</p>
            <ol className="space-y-2">
              {current.scenario.steps.map((step, i) => (
                <li key={i} className="text-xs text-gray flex items-start gap-2">
                  <span className="text-accent font-mono font-semibold mt-0.5">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        <p className="text-xs text-gray-light pt-4 border-t border-border">
          {current.footer}
        </p>
      </div>
    </div>
  );
}
