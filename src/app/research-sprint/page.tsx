import Link from "next/link";

const METHODS = [
  { icon: "🔬", name: "Thematic Analysis", desc: "Braun & Clarke 6-phase coding. Identify themes across all transcripts with supporting quotes.", source: "Braun & Clarke, 2006" },
  { icon: "🗂️", name: "Affinity Mapping", desc: "Cluster related insights into groups. See how ideas connect across participants.", source: "Beyer & Holtzblatt" },
  { icon: "⚡", name: "Jobs to Be Done", desc: "Extract job stories, four forces (push/pull/anxiety/habit), and hiring criteria.", source: "Christensen / Moesta" },
  { icon: "💬", name: "Quote Mining", desc: "Key quotes tagged by participant ID, theme, and sentiment. Ready for your report.", source: "Direct evidence" },
  { icon: "⚔️", name: "Contradiction Flagging", desc: "Where participants disagree. Surface tensions and conflicting mental models.", source: "Divergent analysis" },
  { icon: "🔗", name: "Cross-Interview Patterns", desc: "Recurring behaviors, pain points, and workarounds that appear across 3+ participants.", source: "Pattern recognition" },
  { icon: "🕳️", name: "Gap Analysis", desc: "What questions remain unanswered? Where do you need more data?", source: "Research planning" },
];

const STEPS = [
  { num: "01", title: "Upload transcripts", desc: "Paste or upload up to 20 interview transcripts. Plain text, markdown, or .txt files." },
  { num: "02", title: "Choose methods", desc: "Pick which analysis methods to run. All 7 by default, or select specific ones." },
  { num: "03", title: "Get structured insights", desc: "Themed findings with participant quotes, confidence levels, and bias flags. Export as JSON." },
];

const PRICING = [
  {
    name: "Single Analysis", price: "€29", period: "one-time",
    desc: "Analyze one batch of transcripts",
    features: ["Up to 10 transcripts", "All 7 analysis methods", "JSON export", "Quote database with participant IDs", "Bias check included"],
    cta: "Start Analysis", href: "/research-sprint/analyze", highlight: false,
  },
  {
    name: "Deep Sprint", price: "€79", period: "one-time",
    desc: "Full research sprint with strategic maps",
    features: ["Up to 20 transcripts", "All 7 analysis methods", "Journey map generation", "Persona extraction", "Strategic recommendations", "Structured JSON export", "Contradiction deep-dive"],
    cta: "Start Deep Sprint", href: "/research-sprint/analyze?plan=deep", highlight: true,
  },
  {
    name: "Done-for-You", price: "€299", period: "per project",
    desc: "We run the analysis and deliver a report",
    features: ["Unlimited transcripts", "Expert-reviewed findings", "Service blueprint", "Presentation-ready deliverables", "1 revision round", "48-hour delivery"],
    cta: "Book a Sprint", href: "https://calendar.app.google/K83wsdYJEWv5mWh47", highlight: false,
  },
];

export default function ResearchSprintPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-4">Research Analysis Tool</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">
            Interview transcripts to insights
            <br />
            <span className="text-accent">in minutes, not weeks</span>
          </h1>
          <p className="text-gray text-lg mb-4 max-w-xl mx-auto leading-relaxed">
            Upload your interview transcripts. Get thematic analysis, JTBD
            extraction, contradiction maps, and gap analysis, built on named research methods with the quotes to prove each finding.
          </p>
          <p className="text-gray-light text-sm mb-8">
            Built by a UX researcher. Grounded in Braun &amp; Clarke, Christensen, and
            Beyer &amp; Holtzblatt.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/research-sprint/analyze" className="bg-accent text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-navy transition-colors">
              Start Free Analysis →
            </Link>
            <a href="#how" className="border border-border text-navy px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-lavender transition-colors">
              See How It Works
            </a>
          </div>
          <p className="text-gray-light text-xs mt-4">First analysis free, no account needed</p>
        </div>
      </section>

      {/* Methods */}
      <section className="border-t border-border py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">7 Research Methods</p>
          <h2 className="text-3xl font-bold text-navy mb-4">Named methods, cited sources</h2>
          <p className="text-gray mb-12 max-w-2xl">
            Each analysis method is grounded in established research practice. Every finding includes participant quotes, confidence levels, and bias flags.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {METHODS.map((m) => (
              <div key={m.name} className="bg-surface border border-border rounded-xl p-5 hover:border-accent/30 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-navy font-sans mb-1">{m.name}</h3>
                    <p className="text-sm text-gray leading-relaxed">{m.desc}</p>
                    <p className="text-xs text-gray-light mt-2">{m.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="border-t border-border py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-3">How It Works</p>
          <h2 className="text-3xl font-bold text-navy mb-12">Three steps to structured insights</h2>
          <div className="space-y-8">
            {STEPS.map((s) => (
              <div key={s.num} className="flex gap-6 items-start">
                <span className="text-3xl font-bold text-accent/20 font-serif shrink-0">{s.num}</span>
                <div>
                  <h3 className="text-lg font-semibold text-navy font-sans mb-1">{s.title}</h3>
                  <p className="text-sm text-gray leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="border-t border-border py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-label mb-3">Output Quality</p>
          <h2 className="text-3xl font-bold text-navy mb-4">Every finding is grounded</h2>
          <p className="text-gray mb-10 max-w-2xl">Unlike generic AI summaries, every insight includes the evidence trail.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "✓", title: "Participant IDs", desc: "Every quote tagged with who said it. P01, P02... traceable back to source." },
              { icon: "✓", title: "Confidence Levels", desc: "High / Medium / Low for each finding. Know what's solid vs. what needs more data." },
              { icon: "✓", title: "Bias Flags", desc: "20 UX research biases checked. Confirmation, recency, self-reporting, all flagged." },
              { icon: "✓", title: "Direct Quotes", desc: "Not paraphrased summaries. Actual participant language with context." },
              { icon: "✓", title: "Contradictions", desc: "Where participants disagree. The tensions are often where the insight lives." },
              { icon: "✓", title: "Research Gaps", desc: "What you still don't know. Next questions to ask. Areas needing more data." },
            ].map((item) => (
              <div key={item.title} className="bg-surface border border-border rounded-xl p-5">
                <span className="text-accent font-bold text-sm">{item.icon}</span>
                <h3 className="text-sm font-semibold text-navy mt-2 mb-1 font-sans">{item.title}</h3>
                <p className="text-sm text-gray leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">Pricing</p>
          <h2 className="text-3xl font-bold text-navy mb-4">Pay per analysis, not per month</h2>
          <p className="text-gray mb-12">No subscriptions. No accounts. Pay when you need it.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((p) => (
              <div key={p.name} className={`bg-surface rounded-xl p-6 flex flex-col ${p.highlight ? "border-2 border-accent/30 ring-1 ring-accent/10" : "border border-border"}`}>
                {p.highlight && <span className="text-xs font-semibold text-accent bg-accent-light px-3 py-1 rounded-full self-start mb-3">Most Popular</span>}
                <h3 className="text-lg font-semibold text-navy font-sans">{p.name}</h3>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-3xl font-bold text-navy">{p.price}</span>
                  <span className="text-sm text-gray-light">{p.period}</span>
                </div>
                <p className="text-sm text-gray mb-5">{p.desc}</p>
                <div className="space-y-2.5 mb-6 flex-1">
                  {p.features.map((f) => (
                    <div key={f} className="flex gap-2 items-start text-sm">
                      <span className="text-accent mt-0.5">✓</span>
                      <span className="text-navy">{f}</span>
                    </div>
                  ))}
                </div>
                <Link href={p.href} className={`text-center py-3 rounded-lg text-sm font-medium transition-colors block ${p.highlight ? "bg-accent text-white hover:bg-navy" : "border border-border text-navy hover:bg-lavender"}`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-border py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-light text-sm mb-3">Built with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Braun & Clarke Thematic Analysis", "Christensen JTBD", "Beyer & Holtzblatt Affinity", "20 UX Bias Checks", "Calabro Bias Framework"].map((t) => (
              <span key={t} className="text-xs text-gray bg-tag-bg px-3 py-1.5 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">Your first analysis is free. See what your transcripts actually say.</h2>
          <p className="text-gray mb-8">Your first analysis is free. Upload transcripts and see structured research output in minutes.</p>
          <Link href="/research-sprint/analyze" className="bg-accent text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-navy transition-colors inline-block">
            Try Free Analysis →
          </Link>
        </div>
      </section>
    </div>
  );
}
