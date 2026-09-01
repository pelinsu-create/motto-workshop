"use client";

import { useState } from "react";
import {
  MethodCard,
  CardVisual,
  CardTitle,
  CardTags,
  CardBody,
  CardTip,
  CardSection,
} from "../method-card";

type InstrumentType = "interview" | "survey" | "screener" | "usability";
type Severity = "blocker" | "warning" | "info";
type Verdict = "ready" | "ready_after_fixes" | "needs_rework";

interface Finding {
  ruleId: string;
  severity: Severity;
  section: string;
  quote: string;
  bias: string;
  issue: string;
  rewrite: string;
  confidence: "high" | "medium" | "low";
}

interface Results {
  verdict: Verdict;
  findings: Finding[];
  goodPractices: string[];
  pileUps: string[];
}

const INSTRUMENT_TYPES: { id: InstrumentType; label: string }[] = [
  { id: "interview", label: "Interview guide" },
  { id: "survey", label: "Survey" },
  { id: "screener", label: "Screener" },
  { id: "usability", label: "Usability test tasks" },
];

const VERDICT_META: Record<Verdict, { label: string; classes: string }> = {
  ready: { label: "Ready for fieldwork", classes: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  ready_after_fixes: { label: "Ready after fixes", classes: "bg-amber-50 border-amber-200 text-amber-700" },
  needs_rework: { label: "Needs rework", classes: "bg-red-50 border-red-200 text-red-700" },
};

const SEVERITY_GROUPS: { severity: Severity; heading: string; explainer: string }[] = [
  {
    severity: "blocker",
    heading: "Blockers",
    explainer: "Fix these before fieldwork. They push participants toward an answer you chose for them.",
  },
  {
    severity: "warning",
    heading: "Warnings",
    explainer: "Worth fixing if you have time. These can skew answers with some participants, in some sessions.",
  },
  {
    severity: "info",
    heading: "Info",
    explainer: "Judgment calls. Fine to leave as they are once you have seen them.",
  },
];

const SEVERITY_BADGE: Record<Severity, string> = {
  blocker: "bg-red-100 text-red-700",
  warning: "bg-amber-100 text-amber-700",
  info: "bg-gray-100 text-gray",
};

const CONFIDENCE_BADGE: Record<string, string> = {
  high: "bg-emerald-50 text-emerald-600",
  medium: "bg-amber-50 text-amber-600",
  low: "bg-gray-100 text-gray",
};

export default function BiasCheck() {
  const [instrumentType, setInstrumentType] = useState<InstrumentType>("interview");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runCheck() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch("/api/bias-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, instrumentType }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Check failed");
      }
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* The tool sits on the same dot-grid journal spread as /work */}
      <div className="notebook-page relative px-5 sm:px-8 md:px-12 pt-14 pb-12">
        <span className="tape-corner tape-corner-tl" aria-hidden="true" />
        <span className="tape-corner tape-corner-tr" aria-hidden="true" />

        {/* The tool introduces itself as a card from the methods handbook */}
        <MethodCard className="mb-8 fade-rise">
          <CardVisual bg="bg-note-mint" className="h-28">
            <img
              src="/work/icon-bias.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </CardVisual>
          <CardTitle as="h1" kicker="Bias Checker">
            Check your questions before you ask them
          </CardTitle>
          <CardTags
            tags={[
              { label: "Pre-fieldwork", tone: "accent" },
              { label: "20 biases", tone: "navy" },
              { label: "Minimal rewrites", tone: "mustard" },
            ]}
          />
          <CardBody className="text-sm text-gray leading-relaxed">
            Paste a discussion guide, survey, screener or usability test tasks. Every
            question gets checked against 20 UX research biases: leading wording, double
            questions, opinion traps, recall problems. You get findings by severity and a
            minimal rewrite for each.
          </CardBody>
          <CardTip label="Paste the whole thing.">
            intro and probes included. The checker reads around them and focuses on the
            questions.
          </CardTip>
        </MethodCard>

        {/* The form sits in ruled sections of one card */}
        <MethodCard className="mb-6">
          <CardSection title="What are you checking?">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {INSTRUMENT_TYPES.map((t) => {
                const selected = instrumentType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setInstrumentType(t.id)}
                    className={`p-3 rounded-xl border text-sm font-medium btn-press ${
                      selected
                        ? "border-accent bg-accent-light/50 text-accent"
                        : "border-border bg-surface text-gray hover:border-gray/30 hover:bg-lavender/40"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </CardSection>
          <CardSection title="Your questions" last>
            <textarea
              placeholder="Paste the whole thing, intro and probes included. The checker reads around them and focuses on the questions."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              className="w-full border border-border rounded-lg px-4 py-3 text-sm text-navy bg-surface placeholder:text-gray-light outline-none focus:border-accent/40 transition-colors resize-y font-mono"
            />
          </CardSection>
        </MethodCard>

        <button
          onClick={runCheck}
          disabled={!text.trim() || loading}
          className="w-full bg-accent text-white py-4 rounded-xl text-sm font-semibold hover:bg-navy btn-press disabled:opacity-40 disabled:cursor-not-allowed mb-6"
        >
          Check my questions
        </button>

        {loading && (
          <div className="bg-accent-light/30 border border-accent/10 rounded-xl p-6 text-center mb-6">
            <div className="flex justify-center gap-1.5 mb-3">
              {[0, 0.15, 0.3].map((delay, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-accent"
                  style={{ animation: `bounce 0.5s ease ${delay}s infinite alternate` }}
                />
              ))}
            </div>
            <p className="text-sm text-accent font-medium">
              Reading your questions against 20 biases...
            </p>
            <p className="text-xs text-gray-light mt-1">This usually takes under a minute</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-red-700">
              The check did not complete. Try again, or email me if it keeps failing.
            </p>
          </div>
        )}

        {!loading && !error && !results && (
          <div className="border-2 border-dashed border-border rounded-xl p-10 text-center mb-6">
            <p className="text-sm text-gray">
              Your report appears here. Paste your questions above and run the check.
            </p>
          </div>
        )}

        {results && <ResultsView results={results} />}

        <p className="text-xs text-gray-light text-center mt-8 mb-12">
          Nothing is stored. Your text is analyzed, the report is generated, and the text
          is discarded.
        </p>

        {/* How it works */}
        <MethodCard>
          <CardSection title="How it works" last>
            <ol className="space-y-3">
              {[
                "Paste your guide, survey, screener or test tasks before fieldwork.",
                "Each question is checked against 20 UX research biases and common question mistakes: leading wording, double questions, asking people to predict their own behavior, screeners that give away the right answer.",
                "You get a verdict, findings grouped by severity, and a minimal rewrite for each problem that keeps your voice.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray">
                  <span className="text-xs font-semibold text-accent bg-accent-light px-2 py-0.5 rounded-full shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </CardSection>
          <CardTip label="Run it twice." tint="bg-note-lavender">
            fix the blockers, then check the fixed guide once more before fieldwork.
          </CardTip>
        </MethodCard>
      </div>

      <style jsx>{`
        @keyframes bounce {
          to {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
}

function ResultsView({ results }: { results: Results }) {
  const verdict = VERDICT_META[results.verdict] || VERDICT_META.ready_after_fixes;
  const groups = SEVERITY_GROUPS.map((group) => ({
    ...group,
    findings: results.findings.filter((f) => f.severity === group.severity),
  })).filter((group) => group.findings.length > 0);
  const tailDelay = 120 + groups.length * 90;

  return (
    <div className="space-y-6">
      {/* Verdict banner lands first, then the finding groups stagger in */}
      <div className={`border rounded-xl p-5 fade-rise ${verdict.classes}`}>
        <p className="text-lg font-semibold">{verdict.label}</p>
        <p className="text-xs mt-1 opacity-80">
          {results.findings.filter((f) => f.severity === "blocker").length} blockers,{" "}
          {results.findings.filter((f) => f.severity === "warning").length} warnings,{" "}
          {results.findings.filter((f) => f.severity === "info").length} info
        </p>
      </div>

      {groups.map((group, gi) => (
        <div
          key={group.severity}
          className="fade-rise"
          style={{ animationDelay: `${120 + gi * 90}ms` }}
        >
          <MethodCard>
            <CardSection title={group.heading} hint={group.explainer} last>
              <div className="space-y-4">
                {group.findings.map((f, i) => (
                  <FindingCard
                    key={i}
                    finding={f}
                    delay={120 + gi * 90 + Math.min(i, 5) * 60}
                  />
                ))}
              </div>
            </CardSection>
          </MethodCard>
        </div>
      ))}

      {results.pileUps && results.pileUps.length > 0 && (
        <div
          className="bg-amber-50 border border-amber-200 rounded-xl p-4 fade-rise"
          style={{ animationDelay: `${tailDelay}ms` }}
        >
          <p className="text-xs font-semibold text-amber-700 mb-1">Bias pile-ups</p>
          {results.pileUps.map((p, i) => (
            <p key={i} className="text-xs text-amber-600">
              {p}
            </p>
          ))}
        </div>
      )}

      {results.goodPractices && results.goodPractices.length > 0 && (
        <div className="fade-rise" style={{ animationDelay: `${tailDelay + 60}ms` }}>
          <MethodCard>
            <CardSection
              title="What your guide already does well"
              hint="Kept so you do not accidentally rewrite the good parts."
              last
            >
              <ul className="space-y-2">
                {results.goodPractices.map((practice, i) => (
                  <li key={i} className="text-sm text-gray flex gap-2">
                    <span className="text-emerald-600 shrink-0">✓</span>
                    {practice}
                  </li>
                ))}
              </ul>
            </CardSection>
          </MethodCard>
        </div>
      )}
    </div>
  );
}

function FindingCard({ finding, delay = 0 }: { finding: Finding; delay?: number }) {
  return (
    <div
      className="bg-lavender/30 rounded-lg p-4 fade-rise"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${SEVERITY_BADGE[finding.severity]}`}>
          {finding.ruleId}
        </span>
        <span className="text-xs font-medium text-accent">{finding.bias}</span>
        {finding.section && (
          <span className="text-xs text-gray-light">{finding.section}</span>
        )}
        <span
          className={`text-xs px-2.5 py-0.5 rounded-full ml-auto ${
            CONFIDENCE_BADGE[finding.confidence] || CONFIDENCE_BADGE.low
          }`}
        >
          {finding.confidence} confidence
        </span>
      </div>
      <div className="border-l-2 border-accent/30 pl-3 mb-2">
        <p className="text-sm text-navy italic">&ldquo;{finding.quote}&rdquo;</p>
      </div>
      <p className="text-sm text-gray mb-2">{finding.issue}</p>
      {finding.rewrite && (
        <div className="bg-surface rounded-lg p-3">
          <p className="text-xs font-semibold text-emerald-600 mb-1">Suggested rewrite</p>
          <p className="text-sm text-navy">{finding.rewrite}</p>
        </div>
      )}
    </div>
  );
}
