import { TrackedCTA } from "./tracked-cta";
import SpotHallucination from "./spot-hallucination";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <p className="section-label mb-4">AI Collaboration Workshop</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-4">
          Filter. Remix. Prototype.<br className="hidden md:block" /> AI as a thinking partner.
        </h1>
        <p className="text-base text-gray max-w-2xl leading-relaxed mb-8">
          A 6-hour workshop where you turn scattered bookmarks into a publishable trend report &mdash;
          and learn to verify, structure, challenge, and think critically with AI along the way.
        </p>
        <TrackedCTA
          event="cta-hero-start"
          className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
        >
          Interested? Book a Call
        </TrackedCTA>
      </section>

      {/* The Problem */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-6">The Problem</h2>
        <p className="text-gray leading-relaxed mb-4">
          You save LinkedIn posts. Bookmark articles. Add videos to watch later.
          You have ideas but don&apos;t know where to start. The knowledge is there &mdash;
          the system to use it isn&apos;t.
        </p>
        <p className="text-gray leading-relaxed">
          In this workshop, we turn that scattered pile into a structured, verifiable,
          publishable trend report &mdash; and build a system you can keep using.
        </p>
      </section>

      {/* Three Parts */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-10">How It Works</h2>

        <div className="space-y-10">
          {/* Filter */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">Part 1 &middot; 2 hours</p>
            <h3 className="text-xl text-navy mb-3 font-serif">Filter</h3>
            <p className="text-sm text-gray leading-relaxed mb-4">
              Collect and process sources. Compare how NotebookLM and Claude handle the same material.
              Extract claims with exact quotes. Learn 3-Layer Verification to check what&apos;s real.
            </p>
            <div className="space-y-2">
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Upload sources to NotebookLM &mdash; get summaries and mindmaps</span>
              </div>
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Run the same sources through Insight Extractor &mdash; exact quotes, not paraphrases</span>
              </div>
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Practice 3-Layer Verification: Does the source exist? Does it say this? Is it in context?</span>
              </div>
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Learn 4 Hallucination Red Flags: Percentage Tell, Timeline Tell, Scope Tell, Convenience Tell</span>
              </div>
            </div>
          </div>

          {/* Remix */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">Part 2 &middot; 2 hours</p>
            <h3 className="text-xl text-navy mb-3 font-serif">Remix</h3>
            <p className="text-sm text-gray leading-relaxed mb-4">
              Analyze, question, and recontextualize your findings. Classify trends.
              Check your biases. Play games that build critical thinking.
            </p>
            <div className="space-y-2">
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Structure insights with Discovery Insight: what you saw, what it means, why it matters</span>
              </div>
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Classify findings: Fad vs Trend vs Megatrend using Three Horizons and STEEP</span>
              </div>
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Run Bias Checker on your own analysis &mdash; what are you missing?</span>
              </div>
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Play Hallucination Hunter &mdash; spot fake claims before they spot you</span>
              </div>
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Play Bad Idea Bingo + 4 Whats &mdash; from wild ideas to testable concepts</span>
              </div>
            </div>
          </div>

          {/* Prototype */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">Part 3 &middot; 2 hours</p>
            <h3 className="text-xl text-navy mb-3 font-serif">Prototype</h3>
            <p className="text-sm text-gray leading-relaxed mb-4">
              Turn your findings into a shareable trend report and build a system
              to keep doing this on your own.
            </p>
            <div className="space-y-2">
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Build report structure with Data Storyteller: tension, resolution, transformation</span>
              </div>
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Generate a shareable HTML trend report with confidence ratings</span>
              </div>
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Design your weekly research routine: new sources &rarr; extract &rarr; analyze</span>
              </div>
              <div className="flex gap-2 items-start text-sm">
                <span className="text-accent mt-0.5">&#10003;</span>
                <span className="text-navy">Share your most surprising finding with the group</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spot the Hallucination */}
      <SpotHallucination />

      {/* What You Leave With */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">What You Leave With</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "A publishable trend report you built yourself",
            "6 reusable AI prompt templates for any topic",
            "3-Layer Verification checklist",
            "4 Hallucination Red Flag cards",
            "A weekly research routine template",
            "A tagging system for your knowledge base",
          ].map((item) => (
            <div key={item} className="flex gap-2 items-start text-sm">
              <span className="text-accent mt-0.5">&#10003;</span>
              <span className="text-navy">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Topic</p>
              <p className="text-sm text-navy">Remote &amp; Hybrid Work Trends 2025-2026</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Duration</p>
              <p className="text-sm text-navy">6 hours (3 parts &times; 2 hours)</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Format</p>
              <p className="text-sm text-navy">Online, max 12 participants</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Tools</p>
              <p className="text-sm text-navy">Claude, NotebookLM, Motto Workshop Games</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Requirements</p>
              <p className="text-sm text-navy">Claude Pro or Claude Code account, NotebookLM (free)</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">Price</p>
              <p className="text-sm text-navy">Coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Try the Games */}
      <section id="demo" className="py-16 border-t border-border">
        <div>
          <h2 className="text-2xl md:text-3xl text-navy mb-4">
            Try the Games
          </h2>
          <p className="text-gray leading-relaxed mb-6">
            These are the games you&apos;ll play in the workshop. Try them now &mdash; no account needed.
          </p>
          <a
            href="https://motto-games.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-border text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-lavender transition-colors"
          >
            Play the Games &rarr;
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 border-t border-border">
        <div>
          <p className="section-label mb-3">Your Facilitator</p>
          <h2 className="text-2xl md:text-3xl text-navy mb-6">
            Pelinsu Pelit
          </h2>
          <p className="text-gray leading-relaxed mb-4">
            11 years of checking whether research findings are real, whether the sources exist,
            and whether the conclusions actually hold. That&apos;s UX research &mdash; and it&apos;s
            exactly what AI-generated content needs.
          </p>
          <p className="text-gray leading-relaxed mb-4">
            I apply verification methods from library science and fact-checking journalism
            to catch what AI gets wrong, and I build workshop games that teach people
            to think critically instead of trusting blindly.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border">
        <div className="bg-surface border border-border rounded-xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl text-navy mb-4">
            Interested?
          </h2>
          <p className="text-gray leading-relaxed mb-6 max-w-lg mx-auto">
            Book a call and I&apos;ll walk you through the workshop, answer questions,
            and we&apos;ll find a date that works.
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

{/* ============================================================
    ORIGINAL HOMEPAGE CONTENT — HIDDEN FOR NOW
    Restore this when expanding back to multi-service site
    ============================================================

import ServiceTabs from "./service-tabs";

--- Hero (old) ---
<p className="section-label mb-4">AI Collaboration Workshops</p>
<h1>You use AI. But can you tell when it's wrong?</h1>
<p>Workshops, games, and verification practice that help you think critically with AI — not just use it.</p>

--- Two service cards: Report Clearing + Workshop Games ---
--- Services section with ServiceTabs ---
--- How It Works: Two Tracks (Clearing + Workshop) ---
--- Workshop Teaser banner ---
--- Who It's For: Consultancies, Product Design, Product Teams ---
--- Demo section ---
--- About + CTA ---
--- FAQ: pricing, self-checking, hallucination models, confidentiality ---

============================================================ */}
