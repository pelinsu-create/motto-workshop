import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
          href="/case-studies"
          className="text-sm text-accent hover:text-navy transition-colors mb-6 inline-block"
        >
          &larr; All Case Studies
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
          GROUND research system became a product that helps cat owners create
          healthier homes &mdash; without guessing.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          {[
            "UX Research",
            "Service Design",
            "AI Product",
            "Pretotyping",
            "Behavioral Science",
          ].map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium bg-accent/10 text-accent px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 border-t border-border">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">
              Timeline
            </p>
            <p className="text-sm text-navy">2021&ndash;2026 (research to product)</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">
              Methods
            </p>
            <p className="text-sm text-navy">
              Field observation, survey, literature review, competitive analysis,
              pretotyping
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">
              Tools
            </p>
            <p className="text-sm text-navy">
              Claude Code, Next.js, Vercel, NotebookLM, GROUND System
            </p>
          </div>
        </div>
      </section>

      {/* Step 1: The Problem */}
      <section className="py-16 border-t border-border">
        <StepLabel number={1} title="The Problem" />
        <h2 className="text-2xl md:text-3xl text-navy mb-6">
          Your cat is stressed. Your home is probably why.
        </h2>
        <p className="text-gray leading-relaxed mb-6">
          After 5 years of cat sitting in 50+ homes across the Netherlands and
          Turkey, a pattern emerged: most cats showed signs of stress &mdash;
          over-grooming, hiding, knocking things over &mdash; not because their
          owners didn&apos;t care, but because homes weren&apos;t designed for
          how cats actually behave.
        </p>
        <p className="text-gray leading-relaxed mb-8">
          The knowledge exists in veterinary science. The AAFP/ISFM Five Pillars
          of a Healthy Feline Environment is peer-reviewed and well-established.
          But it never reaches the people who need it most: everyday cat owners.
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
        <h2 className="text-2xl md:text-3xl text-navy mb-6">
          Grounding decisions in data, not assumptions
        </h2>
        <p className="text-gray leading-relaxed mb-6">
          Using the GROUND research system, I combined multiple evidence sources
          to understand the problem space before designing anything.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <EvidenceCard
            title="Field Observations"
            items={[
              "50+ home visits across NL and Turkey",
              "80%+ of built shelters went unused — cats slept on roofs",
              "Caregivers used Tupperware and tape — zero designed support",
              "Design knowledge existed but never reached caregivers",
            ]}
          />
          <EvidenceCard
            title="Literature Review"
            items={[
              "AAFP/ISFM Five Pillars framework (peer-reviewed)",
              "3 core books: Catify to Satisfy, Decoding Your Cat, What Cats Want",
              "Ellis (2009) on environmental enrichment",
              "Vitale (2017): cats prefer human interaction over toys",
            ]}
          />
          <EvidenceCard
            title="Survey & Competitive Analysis"
            items={[
              "Cat owner survey on home enrichment needs",
              "6 colony management tools analyzed — all fragmented",
              "ZERO cat-friendly home assessment tools based on Five Pillars",
              "Expert content strong but passive — no interactive tool",
            ]}
          />
          <EvidenceCard
            title="Behavioral Validation"
            items={[
              "4,800+ Reddit views on framework concept",
              "800+ reached via WhatsApp pet groups",
              "10 people expressed direct interest",
              "Smoke test before building",
            ]}
          />
        </div>

        <ImageCard
          src={`${IMG}/fluffy-behaviors.jpg`}
          alt="Cat behavior taxonomy"
          caption="12-behavior taxonomy developed from field observations and literature"
          full
        />
      </section>

      {/* Step 3: Synthesis */}
      <section className="py-16 border-t border-border">
        <StepLabel number={3} title="Synthesis & Framework" />
        <h2 className="text-2xl md:text-3xl text-navy mb-6">
          Five Pillars &rarr; actionable assessment
        </h2>
        <p className="text-gray leading-relaxed mb-8">
          The research converged on a clear framework. The AAFP/ISFM Five
          Pillars provided the scientific backbone. Field observations revealed
          the gap between knowledge and practice. The synthesis became the
          product&apos;s scoring model.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {[
            { pillar: "Safe Place", desc: "Hidden spots where cats feel invisible" },
            { pillar: "Resources", desc: "Separated food, water, litter stations" },
            { pillar: "Play & Hunt", desc: "Complete hunt-catch-kill-eat cycles" },
            { pillar: "Human Bond", desc: "Respecting individual cat preferences" },
            { pillar: "Scent & Territory", desc: "Vertical space, scratching, window access" },
          ].map((p) => (
            <div
              key={p.pillar}
              className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-center"
            >
              <p className="text-sm font-semibold text-navy mb-1">{p.pillar}</p>
              <p className="text-xs text-gray">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 mb-8">
          <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">
            Key Insights
          </p>
          <div className="space-y-4">
            {[
              "The knowledge gap is a distribution problem, not a creation problem. Veterinary science has the answers — they just don't reach cat owners.",
              "Designing for cats requires inverting normal design priorities: escape routes and sight lines matter more than aesthetics or materials.",
              "Bowl feeding takes <1% of a cat's day vs 33-50% in the wild. This mismatch drives most 'behavioral problems.'",
              "If people won't use it when friction is low and quality is high, automation won't fix it — so we validated demand before building.",
            ].map((insight, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-accent font-semibold text-sm mt-0.5">
                  {i + 1}.
                </span>
                <p className="text-sm text-navy leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 4: Storyboard */}
      <section className="py-16 border-t border-border">
        <StepLabel number={4} title="Storyboard" />
        <h2 className="text-2xl md:text-3xl text-navy mb-6">
          Visualizing the user journey
        </h2>
        <p className="text-gray leading-relaxed mb-8">
          Before building, I created a 6-panel storyboard to map the experience
          from problem discovery to transformed home. Meet Selin and her cat
          Miso.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { panel: 1, file: "panel-1-establishing-shot.png", title: "The Cozy But Boring Living Room", desc: "Selin notices Miso looks disengaged — half-closed eyes, staring at the wall." },
            { panel: 2, file: "panel-2-the-problem.png", title: "Miso Knocks Things Over Again", desc: "A tipped plant, spilled soil. Miso is bored, not bad — but Selin doesn't know that yet." },
            { panel: 3, file: "panel-3-discovery.png", title: "Finding Fluffy Score", desc: "Selin discovers the assessment tool. A card-based interface with a simple 'Start' button." },
            { panel: 4, file: "panel-4-interaction.png", title: "Taking the Assessment", desc: "Answering questions about safe spaces, play, resources — each mapped to the Five Pillars." },
            { panel: 5, file: "panel-5-the-result.png", title: "The Score Reveals the Gaps", desc: "62/100. The radar chart shows exactly which pillars need attention. An action plan is one click away." },
            { panel: 6, file: "panel-6-conclusion.png", title: "A Better Home, One Week Later", desc: "Window perch, wall shelves, food puzzle, hiding box. Miso is engaged. Selin has coffee and calm." },
          ].map((p) => (
            <div key={p.panel} className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={`${IMG}/${p.file}`}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-accent mb-1">
                  Panel {p.panel}
                </p>
                <p className="text-sm font-semibold text-navy mb-1">
                  {p.title}
                </p>
                <p className="text-xs text-gray">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Step 5: Prototype */}
      <section className="py-16 border-t border-border">
        <StepLabel number={5} title="Prototype & Build" />
        <h2 className="text-2xl md:text-3xl text-navy mb-6">
          From storyboard to working product
        </h2>
        <p className="text-gray leading-relaxed mb-8">
          The assessment was built with Claude Code as an AI-powered
          conversational tool. It adapts questions based on your answers,
          scores your home across the Five Pillars, and generates personalized
          room-by-room recommendations.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <ImageCard src={`${IMG}/fluffy-proto-sketch.jpg`} alt="Early sketches" caption="Early concept sketches" />
          <ImageCard src={`${IMG}/fluffy-proto-render.jpg`} alt="Product renders" caption="Product design renders" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">
              Free Tier
            </p>
            <ul className="space-y-2">
              {[
                "Adaptive AI conversation about your home",
                "Score across 5 pillars",
                "Top 3 quick-win recommendations",
                "Shareable score card",
              ].map((item) => (
                <li key={item} className="flex gap-2 items-start text-sm">
                  <span className="text-accent mt-0.5">&#10003;</span>
                  <span className="text-navy">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">
              Paid Report &mdash; &euro;4.99
            </p>
            <ul className="space-y-2">
              {[
                "Room-by-room action plan",
                "Product recommendations with links",
                "Behavior explanation per pillar",
                "PDF export for reference",
              ].map((item) => (
                <li key={item} className="flex gap-2 items-start text-sm">
                  <span className="text-accent mt-0.5">&#10003;</span>
                  <span className="text-navy">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Next.js",
              "Claude Code",
              "Vercel",
              "Supabase",
              "Stripe",
              "AAFP Five Pillars",
            ].map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium bg-gray-100 text-navy px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Causal Loop Diagram */}
      <section className="py-16 border-t border-border">
        <StepLabel number={6} title="Systems Thinking" />
        <h2 className="text-2xl md:text-3xl text-navy mb-6">
          Indoor cats &harr; Shelter cats: A reinforcing loop
        </h2>
        <p className="text-gray leading-relaxed mb-8">
          Fluffy Score doesn&apos;t just help indoor cats. The same Five Pillars
          framework applies to shelter environments. When indoor cat owners learn
          enrichment principles, they become better adopters, foster parents, and
          shelter volunteers &mdash; creating a reinforcing loop.
        </p>

        {/* SVG Causal Loop Diagram */}
        <div className="bg-surface border border-border rounded-xl p-6 md:p-10 mb-8">
          <svg viewBox="0 0 800 500" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Definitions */}
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b5bdb" />
              </marker>
              <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#1a9e72" />
              </marker>
            </defs>

            {/* Center label */}
            <text x="400" y="250" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#3b5bdb">REINFORCING</text>
            <text x="400" y="268" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#3b5bdb">LOOP</text>
            <circle cx="400" cy="258" r="35" fill="none" stroke="#3b5bdb" strokeWidth="1.5" strokeDasharray="4 3" />

            {/* Node 1: Indoor Cat Owners */}
            <rect x="280" y="40" width="240" height="56" rx="12" fill="#e8edff" stroke="#3b5bdb" strokeWidth="1.5" />
            <text x="400" y="65" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Indoor Cat Owners</text>
            <text x="400" y="82" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Learn Five Pillars via Fluffy Score</text>

            {/* Node 2: Better Home Environments */}
            <rect x="560" y="140" width="220" height="56" rx="12" fill="#edfcf5" stroke="#1a9e72" strokeWidth="1.5" />
            <text x="670" y="165" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Better Home Environments</text>
            <text x="670" y="182" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Enriched, stress-free spaces</text>

            {/* Node 3: Informed Adopters & Fosters */}
            <rect x="560" y="300" width="220" height="56" rx="12" fill="#e8edff" stroke="#3b5bdb" strokeWidth="1.5" />
            <text x="670" y="325" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Informed Adopters & Fosters</text>
            <text x="670" y="342" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Know what cats actually need</text>

            {/* Node 4: Shelter Cats Get Better Homes */}
            <rect x="280" y="400" width="240" height="56" rx="12" fill="#edfcf5" stroke="#1a9e72" strokeWidth="1.5" />
            <text x="400" y="425" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Shelter Cats Get Better Homes</text>
            <text x="400" y="442" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Lower return rates, less stress</text>

            {/* Node 5: Shelter Knowledge Improves */}
            <rect x="20" y="300" width="220" height="56" rx="12" fill="#e8edff" stroke="#3b5bdb" strokeWidth="1.5" />
            <text x="130" y="325" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Shelter Environments Improve</text>
            <text x="130" y="342" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Same framework, institutional scale</text>

            {/* Node 6: Community Awareness */}
            <rect x="20" y="140" width="220" height="56" rx="12" fill="#edfcf5" stroke="#1a9e72" strokeWidth="1.5" />
            <text x="130" y="165" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#12193a">Community Awareness Grows</text>
            <text x="130" y="182" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#6b7280">Word of mouth, shared reports</text>

            {/* Arrows - clockwise */}
            {/* 1 → 2 */}
            <path d="M 520 75 Q 570 75 570 140" fill="none" stroke="#3b5bdb" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="558" y="105" fontFamily="Inter, sans-serif" fontSize="10" fill="#3b5bdb" fontWeight="500">+</text>

            {/* 2 → 3 */}
            <path d="M 670 196 L 670 298" fill="none" stroke="#1a9e72" strokeWidth="2" markerEnd="url(#arrow-green)" />
            <text x="680" y="250" fontFamily="Inter, sans-serif" fontSize="10" fill="#1a9e72" fontWeight="500">+</text>

            {/* 3 → 4 */}
            <path d="M 560 340 Q 520 380 520 400" fill="none" stroke="#3b5bdb" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="545" y="380" fontFamily="Inter, sans-serif" fontSize="10" fill="#3b5bdb" fontWeight="500">+</text>

            {/* 4 → 5 */}
            <path d="M 280 428 Q 230 428 230 356" fill="none" stroke="#1a9e72" strokeWidth="2" markerEnd="url(#arrow-green)" />
            <text x="242" y="395" fontFamily="Inter, sans-serif" fontSize="10" fill="#1a9e72" fontWeight="500">+</text>

            {/* 5 → 6 */}
            <path d="M 130 300 L 130 198" fill="none" stroke="#3b5bdb" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="140" y="250" fontFamily="Inter, sans-serif" fontSize="10" fill="#3b5bdb" fontWeight="500">+</text>

            {/* 6 → 1 */}
            <path d="M 240 155 Q 280 120 280 75" fill="none" stroke="#1a9e72" strokeWidth="2" markerEnd="url(#arrow-green)" />
            <text x="252" y="105" fontFamily="Inter, sans-serif" fontSize="10" fill="#1a9e72" fontWeight="500">+</text>
          </svg>

          <div className="mt-6 text-center">
            <p className="text-sm text-navy font-medium mb-2">
              Every indoor cat helped creates a ripple effect
            </p>
            <p className="text-xs text-gray max-w-lg mx-auto leading-relaxed">
              When cat owners understand the Five Pillars, they don&apos;t just improve their own home &mdash;
              they become better adopters, share knowledge with their community, and raise awareness
              that improves shelter environments too. The same evidence-based framework works at every scale.
            </p>
          </div>
        </div>
      </section>

      {/* Step 7: Process */}
      <section className="py-16 border-t border-border">
        <StepLabel number={7} title="The GROUND Process" />
        <h2 className="text-2xl md:text-3xl text-navy mb-6">
          Research &rarr; Evidence &rarr; Structure &rarr; Test &rarr; Make
        </h2>
        <p className="text-gray leading-relaxed mb-8">
          This project followed the GROUND research-to-revenue methodology used
          in all Motto Workshop engagements. Every decision was grounded in
          evidence.
        </p>

        <div className="space-y-4">
          {[
            {
              layer: "Context",
              desc: "5 years of cat sitting observations + identified knowledge gap between veterinary science and cat owners",
            },
            {
              layer: "Evidence",
              desc: "Field observations (50+ homes), literature review (3 books + peer-reviewed papers), survey, competitive analysis of 6+ tools",
            },
            {
              layer: "Structure",
              desc: "JTBD mapping, multi-lens analysis, Five Pillars framework adapted into scoring model, personas from vector knowledge base",
            },
            {
              layer: "Test",
              desc: "XYZ hypothesis validated: Reddit (4,800 views), WhatsApp groups (800 reached, 10 interested), smoke test before building",
            },
            {
              layer: "Make",
              desc: "AI-powered assessment tool built with Claude Code, deployed on Vercel, monetized via Stripe",
            },
          ].map((step, i) => (
            <div
              key={step.layer}
              className="flex gap-4 items-start bg-surface border border-border rounded-lg p-4"
            >
              <span className="text-accent font-semibold text-lg mt-0.5 w-6 shrink-0">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-navy mb-1">
                  {step.layer}
                </p>
                <p className="text-xs text-gray leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="py-16 border-t border-border">
        <StepLabel number={8} title="Results & Learnings" />
        <h2 className="text-2xl md:text-3xl text-navy mb-6">What happened</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { stat: "4,800+", label: "Reddit views on concept" },
            { stat: "0", label: "Competitors in Five Pillars assessment" },
            { stat: "62%", label: "Average home score in early tests" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-accent/5 border border-accent/20 rounded-xl p-6 text-center"
            >
              <p className="text-3xl font-semibold text-navy mb-1">{s.stat}</p>
              <p className="text-xs text-gray">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-xs font-semibold text-accent mb-3 uppercase tracking-wider">
            Key Learnings
          </p>
          <div className="space-y-3">
            {[
              "Validate with behavior, not opinions. Reddit upvotes showed interest; WhatsApp responses showed intent.",
              "The biggest competitive advantage was the gap nobody filled: an interactive tool based on peer-reviewed science.",
              "AI made the product possible as a solo builder — Claude Code handled the engineering, letting me focus on research and design.",
              "The GROUND system prevented building the wrong thing. Without structured evidence, I would have built a colony management tool instead.",
            ].map((learning, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-accent mt-0.5">&#10003;</span>
                <p className="text-sm text-navy leading-relaxed">{learning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="bg-surface border border-border rounded-xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl text-navy mb-4">
            Want to build something like this?
          </h2>
          <p className="text-gray leading-relaxed mb-6 max-w-lg mx-auto">
            The Insight Hub Workshop teaches the same research-to-product process
            used in this case study. From scattered sources to validated product
            &mdash; in a structured, evidence-based way.
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

/* ---- Helper Components ---- */

function StepLabel({ number, title }: { number: number; title: string }) {
  return (
    <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">
      Step {number} &middot; {title}
    </p>
  );
}

function EvidenceCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
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

function ImageCard({
  src,
  alt,
  caption,
  full,
}: {
  src: string;
  alt: string;
  caption: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "" : ""}>
      <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-border">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      <p className="text-xs text-gray mt-2 text-center">{caption}</p>
    </div>
  );
}
