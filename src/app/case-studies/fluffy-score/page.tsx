import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { caveat } from "../../notebook-font";

export const metadata: Metadata = {
  title: "Fluffy Score Case Study | Motto Workshop",
  description:
    "From field research to AI product: How 5 years of cat sitting became an evidence-based home assessment tool.",
};

const IMG = "/case-studies/fluffy-score";

export default function FluffyScoreCaseStudy() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <Link
          href="/work"
          className="text-sm text-accent hover:text-navy transition-colors mb-6 inline-block"
        >
          &larr; All work
        </Link>
        <p className="section-label mb-4">Case Study</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-4">
          Fluffy Score
        </h1>
        <p className="text-xl text-navy font-serif mb-6">
          From field research to AI-powered cat home assessment
        </p>
        <p className="text-base text-gray max-w-2xl leading-relaxed">
          How 5 years of cat sitting, veterinary behavior science, and the
          GROUND research system became a working product for cat owners.
        </p>

        <a
          href="https://fluffyhome.space/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors mt-6"
        >
          Try Fluffy Score &rarr;
        </a>

        <div className="flex flex-wrap gap-3 mt-6">
          {["UX Research", "Service Design", "AI Product", "Pretotyping", "Behavioral Science"].map((tag) => (
            <span key={tag} className="text-xs font-medium bg-accent/10 text-accent px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 border-t border-border">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Timeline</p>
            <p className="text-sm text-navy">2021 to 2026</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Methods</p>
            <p className="text-sm text-navy">Field observation, survey, literature review, competitive analysis, pretotyping</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Tools</p>
            <p className="text-sm text-navy">Claude Code, Next.js, Vercel, Supabase, Stripe</p>
          </div>
        </div>
      </section>

      {/* Step 1: The Problem */}
      <section className="py-16 border-t border-border">
        <StepLabel number={1} title="The Problem" />
        <h2 className={`${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-6`}>
          Your cat is stressed. Your home is probably why.
        </h2>
        <p className="text-gray leading-relaxed mb-8">
          After 5 years of cat sitting in 50+ homes across the Netherlands and
          Turkey, a pattern emerged. Most cats showed signs of stress:
          over-grooming, hiding, knocking things over. Their homes were simply
          not set up for how cats behave. The science exists (AAFP/ISFM Five
          Pillars) but it rarely reaches everyday cat owners.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <ImageCard src={`${IMG}/fluffy-field.jpg`} alt="Field research - cat colony observation" caption="Colony observation, Istanbul" />
          <ImageCard src={`${IMG}/fluffy-field-1.jpg`} alt="Field research - feeding station" caption="Improvised feeding station" />
          <ImageCard src={`${IMG}/fluffy-field-2.jpg`} alt="Field research - shelter design" caption="Unused shelter (80% vacancy)" />
        </div>
      </section>

      {/* Step 2: Research */}
      <section className="py-16 border-t border-border">
        <StepLabel number={2} title="Research & Evidence" />
        <h2 className={`${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-6`}>
          Grounding decisions in data
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <EvidenceCard
            title="Literature Review"
            items={[
              "AAFP/ISFM Five Pillars framework (peer-reviewed)",
              "3 books: Catify to Satisfy, Decoding Your Cat, What Cats Want",
              "Ellis (2009): environmental enrichment reduces stress without medication",
            ]}
          />
          <EvidenceCard
            title="Competitive Analysis"
            items={[
              "6 colony management tools, all fragmented",
              "ZERO home assessment tools based on Five Pillars",
              "Expert content exists but passive, no interactive tool",
            ]}
          />
        </div>

        <ImageCard
          src={`${IMG}/fluffy-behaviors.jpg`}
          alt="Cat behavior taxonomy"
          caption="12-behavior taxonomy from field observations and literature"
          full
        />
      </section>

      {/* Step 3: Synthesis */}
      <section className="py-16 border-t border-border">
        <StepLabel number={3} title="Synthesis" />
        <h2 className={`${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-6`}>
          Five Pillars &rarr; scoring model
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {[
            { pillar: "Safe Place", desc: "Hidden spots to feel invisible" },
            { pillar: "Resources", desc: "Separated food, water, litter" },
            { pillar: "Play & Hunt", desc: "Hunt-catch-kill-eat cycles" },
            { pillar: "Human Bond", desc: "Respecting cat preferences" },
            { pillar: "Scent & Territory", desc: "Vertical space, scratching" },
          ].map((p) => (
            <div key={p.pillar} className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-center">
              <p className="text-sm font-semibold text-navy mb-1">{p.pillar}</p>
              <p className="text-xs text-gray">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">Key Insights</p>
          <div className="space-y-3">
            {[
              "Escape routes and sight lines matter more than aesthetics. Shelters that ignore this have 80%+ vacancy.",
              "Bowl feeding takes less than 1% of a cat's day vs 33-50% in the wild. This mismatch drives most 'behavioral problems.'",
            ].map((insight, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-accent font-semibold text-sm mt-0.5">{i + 1}.</span>
                <p className="text-sm text-navy leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 4: Storyboard */}
      <section className="py-16 border-t border-border">
        <StepLabel number={4} title="Storyboard" />
        <h2 className={`${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-6`}>
          Visualizing the user journey
        </h2>
        <p className="text-gray leading-relaxed mb-8">
          A 6-panel storyboard mapping the experience from problem to transformed home. Meet Selin and her cat Miso.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { panel: 1, file: "panel-1-establishing-shot.png", title: "The Cozy But Boring Living Room", desc: "Miso looks disengaged, half-closed eyes, staring at the wall." },
            { panel: 2, file: "panel-2-the-problem.png", title: "Miso Knocks Things Over Again", desc: "Tipped plant, spilled soil. Bored, not bad." },
            { panel: 3, file: "panel-3-discovery.png", title: "Finding Fluffy Score", desc: "A card-based interface with a simple 'Start' button." },
            { panel: 4, file: "panel-4-interaction.png", title: "Taking the Assessment", desc: "Questions mapped to the Five Pillars." },
            { panel: 5, file: "panel-5-the-result.png", title: "The Score Reveals the Gaps", desc: "62/100. Radar chart shows which pillars need attention." },
            { panel: 6, file: "panel-6-conclusion.png", title: "A Better Home, One Week Later", desc: "Window perch, wall shelves, food puzzle. Miso is engaged." },
          ].map((p) => (
            <div key={p.panel} className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={`${IMG}/${p.file}`} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-accent mb-1">Panel {p.panel}</p>
                <p className="text-sm font-semibold text-navy mb-1">{p.title}</p>
                <p className="text-xs text-gray">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step 5: Prototype */}
      <section className="py-16 border-t border-border">
        <StepLabel number={5} title="Prototype & Build" />
        <h2 className={`${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-6`}>
          From storyboard to working product
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <ImageCard src={`${IMG}/fluffy-proto-sketch.jpg`} alt="Early sketches" caption="Early concept sketches" />
          <ImageCard src={`${IMG}/fluffy-proto-render.jpg`} alt="Product renders" caption="Product design renders" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">Free Tier</p>
            <ul className="space-y-2">
              {["Adaptive AI conversation about your home", "Score across 5 pillars", "Top 3 quick-win recommendations", "Shareable score card"].map((item) => (
                <li key={item} className="flex gap-2 items-start text-sm">
                  <span className="text-accent mt-0.5">&#10003;</span>
                  <span className="text-navy">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">Paid Report: &euro;4.99</p>
            <ul className="space-y-2">
              {["Room-by-room action plan", "Product recommendations with links", "Behavior explanation per pillar", "PDF export"].map((item) => (
                <li key={item} className="flex gap-2 items-start text-sm">
                  <span className="text-accent mt-0.5">&#10003;</span>
                  <span className="text-navy">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Step 6: Causal Loop */}
      <section className="py-16 border-t border-border">
        <StepLabel number={6} title="Systems Thinking" />
        <h2 className={`${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-6`}>
          Indoor cats &harr; Shelter cats
        </h2>
        <p className="text-gray leading-relaxed mb-8">
          When indoor cat owners learn enrichment principles, they become better adopters, foster parents, and shelter volunteers, creating a reinforcing loop.
        </p>

        <div className="bg-surface border border-border rounded-xl p-6 md:p-10 mb-8">
          <svg viewBox="0 0 800 500" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b5bdb" />
              </marker>
              <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#1a9e72" />
              </marker>
            </defs>

            <text x="400" y="250" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#3b5bdb">REINFORCING</text>
            <text x="400" y="268" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#3b5bdb">LOOP</text>
            <circle cx="400" cy="258" r="35" fill="none" stroke="#3b5bdb" strokeWidth="1.5" strokeDasharray="4 3" />

            <rect x="280" y="40" width="240" height="56" rx="12" fill="#e8edff" stroke="#3b5bdb" strokeWidth="1.5" />
            <text x="400" y="65" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Indoor Cat Owners</text>
            <text x="400" y="82" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Learn Five Pillars via Fluffy Score</text>

            <rect x="560" y="140" width="220" height="56" rx="12" fill="#edfcf5" stroke="#1a9e72" strokeWidth="1.5" />
            <text x="670" y="165" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Better Home Environments</text>
            <text x="670" y="182" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Enriched, stress-free spaces</text>

            <rect x="560" y="300" width="220" height="56" rx="12" fill="#e8edff" stroke="#3b5bdb" strokeWidth="1.5" />
            <text x="670" y="325" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Informed Adopters & Fosters</text>
            <text x="670" y="342" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Know what cats actually need</text>

            <rect x="280" y="400" width="240" height="56" rx="12" fill="#edfcf5" stroke="#1a9e72" strokeWidth="1.5" />
            <text x="400" y="425" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Shelter Cats Get Better Homes</text>
            <text x="400" y="442" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Lower return rates, less stress</text>

            <rect x="20" y="300" width="220" height="56" rx="12" fill="#e8edff" stroke="#3b5bdb" strokeWidth="1.5" />
            <text x="130" y="325" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Shelter Environments Improve</text>
            <text x="130" y="342" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Same framework, institutional scale</text>

            <rect x="20" y="140" width="220" height="56" rx="12" fill="#edfcf5" stroke="#1a9e72" strokeWidth="1.5" />
            <text x="130" y="165" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Community Awareness Grows</text>
            <text x="130" y="182" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Word of mouth, shared reports</text>

            <path d="M 520 75 Q 570 75 570 140" fill="none" stroke="#3b5bdb" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="558" y="105" fontFamily="Inter, sans-serif" fontSize="10" fill="#3b5bdb" fontWeight="500">+</text>
            <path d="M 670 196 L 670 298" fill="none" stroke="#1a9e72" strokeWidth="2" markerEnd="url(#arrow-green)" />
            <text x="680" y="250" fontFamily="Inter, sans-serif" fontSize="10" fill="#1a9e72" fontWeight="500">+</text>
            <path d="M 560 340 Q 520 380 520 400" fill="none" stroke="#3b5bdb" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="545" y="380" fontFamily="Inter, sans-serif" fontSize="10" fill="#3b5bdb" fontWeight="500">+</text>
            <path d="M 280 428 Q 230 428 230 356" fill="none" stroke="#1a9e72" strokeWidth="2" markerEnd="url(#arrow-green)" />
            <text x="242" y="395" fontFamily="Inter, sans-serif" fontSize="10" fill="#1a9e72" fontWeight="500">+</text>
            <path d="M 130 300 L 130 198" fill="none" stroke="#3b5bdb" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="140" y="250" fontFamily="Inter, sans-serif" fontSize="10" fill="#3b5bdb" fontWeight="500">+</text>
            <path d="M 240 155 Q 280 120 280 75" fill="none" stroke="#1a9e72" strokeWidth="2" markerEnd="url(#arrow-green)" />
            <text x="252" y="105" fontFamily="Inter, sans-serif" fontSize="10" fill="#1a9e72" fontWeight="500">+</text>
          </svg>
        </div>
      </section>

      {/* Step 7: Results */}
      <section className="py-16 border-t border-border">
        <StepLabel number={7} title="Validation & Results" />
        <h2 className={`${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-6`}>What happened</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { stat: "4,800+", label: "Reddit views on concept" },
            { stat: "0", label: "Competitors in Five Pillars assessment" },
            { stat: "62%", label: "Average home score in early tests" },
          ].map((s) => (
            <div key={s.label} className="bg-accent/5 border border-accent/20 rounded-xl p-6 text-center">
              <p className="text-3xl font-semibold text-navy mb-1">{s.stat}</p>
              <p className="text-xs text-gray">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">Key Learnings</p>
          <div className="space-y-3">
            {[
              "Reddit upvotes did not mean much on their own. The WhatsApp responses were the real signal, because people had to actually do something to reply.",
              "The biggest advantage was filling a gap nobody else did: an interactive tool based on peer-reviewed science.",
              "AI made this possible as a solo builder. Claude Code handled engineering, I focused on research and design.",
            ].map((learning, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-accent mt-0.5">&#10003;</span>
                <p className="text-sm text-navy leading-relaxed">{learning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 8: Trust patterns, Sep 2026 */}
      <section className="py-16 border-t border-border">
        <StepLabel number={8} title="Designing for Trust" />
        <h2 className={`${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-6`}>
          Making the certificate honest
        </h2>
        <p className="text-gray leading-relaxed mb-6 max-w-2xl">
          In September 2026 the focus shifted to host certification: property owners
          paying for a pet friendly certificate. A certificate is only worth what its
          honesty is worth, so I audited the flow against intelligent interface
          patterns and shipped five trust changes in one day.
        </p>
        <div className="bg-surface border border-border rounded-xl p-6 mb-6">
          <div className="space-y-3">
            {[
              "Confidence language on every pillar: the assessment can now say a pillar needs an in person check, or cannot be scored from a description at all. Declining to score is presented as honesty.",
              "Photo evidence caps: on safety critical pillars, claims without a photo cannot earn full confidence.",
              "A claim summary before the certificate: the host confirms the answers describe the property truthfully, and can go back to correct them.",
              "Improvement history on the certificate, clearly labeled as self reported.",
              "One removal: the flow claimed every certificate was personally reviewed before issuance. That was not true, so the line was rewritten to what actually happens.",
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-accent mt-0.5">&#10003;</span>
                <p className="text-sm text-navy leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 9: Evals */}
      <section className="py-16 border-t border-border">
        <StepLabel number={9} title="Measuring It" />
        <h2 className={`${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-6`}>
          The eval suite that caught a real bug
        </h2>
        <p className="text-gray leading-relaxed mb-6 max-w-2xl">
          The same day, I built an evaluation harness for the assessment: ten fixture
          conversations replayed against the production prompts, graded on six
          dimensions with deterministic checks first and an LLM judge only where
          judgment is needed. One command runs it before any prompt change ships.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { stat: "22", label: "Checks in the first run" },
            { stat: "18", label: "Passed, incl. all safety checks" },
            { stat: "1", label: "Real bug the evals caught" },
          ].map((s) => (
            <div key={s.label} className="bg-accent/5 border border-accent/20 rounded-xl p-6 text-center">
              <p className="text-3xl font-semibold text-navy mb-1">{s.stat}</p>
              <p className="text-xs text-gray">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">What the evals found</p>
          <p className="text-sm text-navy leading-relaxed mb-3">
            The build was green and the prompts read correctly, but the trust layer
            never actually appeared: in host mode the model batched all five pillars
            into one final message and skipped the per pillar confidence cards
            entirely. Vet safety, gaming resistance and prompt injection all passed.
            The feature I was proudest of simply did not happen.
          </p>
          <p className="text-sm text-navy leading-relaxed mb-3">
            Fixing the prompt cadence and rerunning took the failing dimensions from
            0 of 2 to 2 of 2 with no regressions. The suite now runs on every prompt
            change, and every incident becomes a new regression case.
          </p>
          <p className="text-sm text-navy-mid leading-relaxed italic">
            A green build says the code compiles. An eval says the behavior exists.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="bg-surface border border-border rounded-xl p-8 text-center">
          <h2 className={`${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-4`}>
            Want to build something like this?
          </h2>
          <p className="text-gray leading-relaxed mb-6 max-w-lg mx-auto">
            The workshop teaches the same research-to-product process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://fluffyhome.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-accent text-accent px-6 py-3 rounded-lg text-sm font-medium hover:bg-accent/5 transition-colors"
            >
              Try Fluffy Score
            </a>
            <a
              href="https://calendar.app.google/K83wsdYJEWv5mWh47"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>

      <div className="py-8 text-center">
        <a
          href="https://pelinsu-pelit.medium.com/your-cat-is-stressed-your-home-is-probably-why-a3d86a5fa72e"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent hover:text-navy transition-colors"
        >
          Read the full article on Medium &rarr;
        </a>
      </div>
    </div>
  );
}

function StepLabel({ number, title }: { number: number; title: string }) {
  return (
    <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">
      Step {number} &middot; {title}
    </p>
  );
}

function EvidenceCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <p className="text-sm font-semibold text-navy mb-3">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 items-start text-xs">
            <span className="text-accent mt-0.5">&#10003;</span>
            <span className="text-gray">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ImageCard({ src, alt, caption, full }: { src: string; alt: string; caption: string; full?: boolean }) {
  return (
    <div>
      <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-border">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      <p className="text-xs text-gray mt-2 text-center">{caption}</p>
    </div>
  );
}
