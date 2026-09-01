"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  MethodCard,
  CardVisual,
  CardTitle,
  CardTags,
  CardBody,
  CardTip,
} from "../method-card";

type YesNo = "yes" | "no" | null;
type PretotypeId = "smoke" | "fakedoor" | "wizard" | "concierge";

interface Verdict {
  part: "Y" | "Z" | "X" | "kill";
  ok: boolean;
  note: string;
}

interface SharpenResults {
  verdicts: Verdict[];
  sharpened: string;
  summary: string;
}

const PRETOTYPES: { id: PretotypeId; name: string; description: string }[] = [
  {
    id: "smoke",
    name: "Smoke test",
    description:
      "A landing page with a real signup button, before the product exists. Counts who commits, not who compliments.",
  },
  {
    id: "fakedoor",
    name: "Fake door",
    description:
      "A button or menu entry for a feature that is not built yet. Counts who actually tries to use it.",
  },
  {
    id: "wizard",
    name: "Wizard of Oz",
    description:
      "Looks automated to the user, but you do the work behind the curtain. Shows real usage before you build the machine.",
  },
  {
    id: "concierge",
    name: "Concierge",
    description:
      "You deliver the service by hand, openly, for a few customers. Shows whether anyone wants the outcome at all.",
  },
];

const OPINION_PATTERNS = [
  "would say",
  "interested",
  "like it",
  "likes",
  "love",
  "feel",
  "think",
  "opinion",
  "want to use",
  "would use",
  "would enjoy",
  "prefer",
];

const PART_LABELS: Record<Verdict["part"], string> = {
  Y: "Y, the audience",
  Z: "Z, the action",
  X: "X, the threshold",
  kill: "The kill line",
};

function isOpinion(z: string): boolean {
  const lower = z.toLowerCase();
  return OPINION_PATTERNS.some((pattern) => lower.includes(pattern));
}

function recommendPretotype(clickable: YesNo, manual: YesNo): PretotypeId | null {
  if (!clickable || !manual) return null;
  if (clickable === "no" && manual === "no") return "smoke";
  if (clickable === "yes" && manual === "no") return "fakedoor";
  if (clickable === "yes" && manual === "yes") return "wizard";
  return "concierge";
}

/* A ruled step card: a heading band over the form controls. */
function StepCard({
  title,
  hint,
  children,
  className = "",
}: {
  title: string;
  hint: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-surface overflow-hidden ${className}`}>
      <div className="border-b border-border px-5 py-3">
        <h2 className="font-sans text-sm font-semibold text-navy">{title}</h2>
        <p className="mt-0.5 text-xs text-gray">{hint}</p>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

export default function XyzBuilder() {
  const [idea, setIdea] = useState("");
  const [y, setY] = useState("");
  const [z, setZ] = useState("");
  const [x, setX] = useState("");
  const [clickable, setClickable] = useState<YesNo>(null);
  const [manual, setManual] = useState<YesNo>(null);
  const [threshold, setThreshold] = useState("");
  const [killDate, setKillDate] = useState("");
  const [copied, setCopied] = useState(false);
  const [sharpening, setSharpening] = useState(false);
  const [sharpenResults, setSharpenResults] = useState<SharpenResults | null>(null);
  const [sharpenError, setSharpenError] = useState(false);

  const showStep2 = idea.trim().length > 0;
  const showStep3 = showStep2 && y.trim().length > 0;
  const showStep4 = showStep3 && z.trim().length > 0;
  const showStep5 = showStep4 && x.trim().length > 0;
  const showStep6 = showStep5 && clickable !== null && manual !== null;

  const recommended = recommendPretotype(clickable, manual);
  const recommendedMeta = PRETOTYPES.find((p) => p.id === recommended) || null;
  const opinionCaught = z.trim().length > 0 && isOpinion(z);

  const hasHypothesis = x.trim().length > 0 && y.trim().length > 0 && z.trim().length > 0;
  const hasKillLine = threshold.trim().length > 0 && killDate.trim().length > 0;
  const cardComplete = hasHypothesis && recommendedMeta !== null && hasKillLine;

  const hypothesisSentence = `At least ${x.trim() || "[X]"}% of ${y.trim() || "[Y]"} will ${
    z.trim() || "[Z]"
  }.`;
  const killSentence = `If fewer than ${threshold.trim() || "[threshold]"} by ${
    killDate.trim() || "[date]"
  }, I will stop.`;
  const cardStarted = idea.trim().length > 0 || hasHypothesis;

  async function copyCard() {
    const lines = [
      "MY TEST CARD",
      "",
      `Idea: ${idea.trim()}`,
      "",
      `Hypothesis: ${hypothesisSentence}`,
      "",
      recommendedMeta
        ? `Pretotype: ${recommendedMeta.name}. ${recommendedMeta.description}`
        : "Pretotype: not chosen yet",
      "",
      `Kill criteria: ${killSentence}`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable, e.g. denied permission. The button simply stays quiet.
    }
  }

  async function sharpen() {
    if (!cardComplete || sharpening) return;
    setSharpening(true);
    setSharpenError(false);
    setSharpenResults(null);
    try {
      const res = await fetch("/api/xyz-sharpen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: idea.trim(),
          x: x.trim(),
          y: y.trim(),
          z: z.trim(),
          killLine: killSentence,
        }),
      });
      if (!res.ok) throw new Error("Sharpen failed");
      const data = await res.json();
      if (!data || !Array.isArray(data.verdicts) || typeof data.sharpened !== "string") {
        throw new Error("Malformed results");
      }
      setSharpenResults(data as SharpenResults);
    } catch {
      setSharpenError(true);
    } finally {
      setSharpening(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* The tool sits on the same dot-grid journal spread as /work */}
      <div className="notebook-page relative px-5 sm:px-8 md:px-12 pt-14 pb-12">
        <span className="tape-corner tape-corner-tl" aria-hidden="true" />
        <span className="tape-corner tape-corner-tr" aria-hidden="true" />

        {/* The tool introduces itself as a card from the methods handbook */}
        <MethodCard className="mb-8 max-w-3xl fade-rise">
          <CardVisual bg="bg-note-lavender" className="h-28">
            <img
              src="/work/icon-xyz.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </CardVisual>
          <CardTitle as="h1" kicker="XYZ Hypothesis Builder">
            Put a number on your idea before you build it
          </CardTitle>
          <CardTags
            tags={[
              { label: "Savoia method", tone: "accent" },
              { label: "Behavior over opinion", tone: "navy" },
              { label: "Kill criteria", tone: "rose" },
            ]}
          />
          <CardBody className="text-sm text-gray leading-relaxed">
            A guided form based on Alberto Savoia&apos;s pretotyping method. You leave with
            one sentence, at least X% of Y will Z, a matching test, and a kill line you
            wrote before the data came in.
          </CardBody>
          <CardTip label="The threshold comes first.">
            decide what would convince a skeptic before the data comes in.
          </CardTip>
        </MethodCard>

        <div className="grid lg:grid-cols-[1fr_22rem] gap-6 items-start">
          {/* Steps column */}
          <div className="space-y-6 min-w-0">
            {/* Step 1: idea */}
            <StepCard
              title="Step 1: The idea"
              hint="Describe it in one or two sentences. Plain words, no pitch. You are the only audience here."
            >
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={3}
                className="w-full border border-border rounded-lg px-4 py-3 text-sm text-navy bg-surface placeholder:text-gray-light outline-none focus:border-accent/40 transition-colors resize-y"
                placeholder="A tool that..."
              />
            </StepCard>

            {/* Step 2: Y */}
            {showStep2 && (
              <StepCard
                className="fade-rise"
                title="Step 2: Y, the audience"
                hint={
                  <>
                    Who exactly? Y must be specific, measurable, and reachable by you this
                    month. &ldquo;Cat owners in Amsterdam who travel at least monthly&rdquo;
                    works. &ldquo;Everyone who likes food&rdquo; does not.
                  </>
                }
              >
                <input
                  type="text"
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm text-navy bg-surface placeholder:text-gray-light outline-none focus:border-accent/40 transition-colors"
                  placeholder="Cat owners in Amsterdam who travel at least monthly"
                />
              </StepCard>
            )}

            {/* Step 3: Z */}
            {showStep3 && (
              <StepCard
                className="fade-rise"
                title="Step 3: Z, the action"
                hint="What will they do that you can observe and count? A click, a signup, a payment, a booking. Never what they would say or feel about it."
              >
                <input
                  type="text"
                  value={z}
                  onChange={(e) => setZ(e.target.value)}
                  className="w-full border border-border rounded-lg px-4 py-3 text-sm text-navy bg-surface placeholder:text-gray-light outline-none focus:border-accent/40 transition-colors"
                  placeholder="join the waitlist with their email"
                />
                {opinionCaught && (
                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 fade-rise">
                    <p className="text-xs text-amber-700">
                      That is an opinion, not a behavior. People say they are interested
                      to be kind, then never come back. Replace it with something you can
                      count: clicks the link, joins the waitlist, pays a deposit, shows
                      up.
                    </p>
                  </div>
                )}
              </StepCard>
            )}

            {/* Step 4: X */}
            {showStep4 && (
              <StepCard
                className="fade-rise"
                title="Step 4: X, the threshold"
                hint="The minimum result that would convince a skeptic, not the result you hope for. Ask: if only this many did it, would I still build? If the honest answer is no, raise the number."
              >
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                    className="w-28 border border-border rounded-lg px-4 py-3 text-sm text-navy bg-surface placeholder:text-gray-light outline-none focus:border-accent/40 transition-colors"
                    placeholder="10"
                  />
                  <span className="text-sm text-gray">%</span>
                </div>
              </StepCard>
            )}

            {/* Step 5: pretotype */}
            {showStep5 && (
              <StepCard
                className="fade-rise"
                title="Step 5: Pick your test"
                hint="Two questions decide which pretotype fits your situation."
              >
                <div className="space-y-4 mb-5">
                  <YesNoQuestion
                    label="Do you have anything clickable yet?"
                    value={clickable}
                    onChange={setClickable}
                  />
                  <YesNoQuestion
                    label="Could you deliver the service by hand, for a few customers?"
                    value={manual}
                    onChange={setManual}
                  />
                </div>

                {recommended && (
                  <div className="grid sm:grid-cols-2 gap-3 fade-rise">
                    {PRETOTYPES.map((p) => {
                      const isRecommended = p.id === recommended;
                      return (
                        <div
                          key={p.id}
                          className={`rounded-xl border p-4 ${
                            isRecommended
                              ? "border-accent bg-accent-light/50"
                              : "border-border bg-surface"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <p
                              className={`text-sm font-semibold ${
                                isRecommended ? "text-accent" : "text-navy"
                              }`}
                            >
                              {p.name}
                            </p>
                            {isRecommended && (
                              <span className="text-[0.68rem] font-semibold text-accent bg-accent-light px-2.5 py-0.5 rounded-full">
                                Your test
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray leading-relaxed">
                            {p.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </StepCard>
            )}

            {/* Step 6: kill criteria */}
            {showStep6 && (
              <StepCard
                className="fade-rise"
                title="Step 6: Kill criteria"
                hint="Decide now what result makes you stop. Once the test is running, sunk cost will argue for one more week. Write the line while you can still be honest about it."
              >
                <div className="flex flex-wrap items-center gap-2 text-sm text-navy">
                  <span>If fewer than</span>
                  <input
                    type="text"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="w-36 border border-border rounded-lg px-3 py-2 text-sm text-navy bg-surface placeholder:text-gray-light outline-none focus:border-accent/40 transition-colors"
                    placeholder="20 signups"
                  />
                  <span>by</span>
                  <input
                    type="date"
                    value={killDate}
                    onChange={(e) => setKillDate(e.target.value)}
                    className="border border-border rounded-lg px-3 py-2 text-sm text-navy bg-surface outline-none focus:border-accent/40 transition-colors"
                  />
                  <span className="-ml-1">, I will stop.</span>
                </div>
              </StepCard>
            )}
          </div>

          {/* Test card column: the deliverable itself is a method card */}
          <div className="lg:sticky lg:top-6 space-y-4">
            <MethodCard>
              <CardVisual bg="bg-note-peach" className="h-16">
                <span className="text-3xl" role="img" aria-label="Test tube">
                  &#129514;
                </span>
              </CardVisual>
              <CardTitle className="py-2.5">Your test card</CardTitle>
              <CardBody>
                {!cardStarted ? (
                  <p className="text-sm text-gray">
                    Your test card appears here as you fill in the steps.
                  </p>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-gray uppercase tracking-wider mb-1">
                        Hypothesis
                      </p>
                      <p className="text-base text-navy font-medium leading-relaxed">
                        {hypothesisSentence}
                      </p>
                    </div>
                    {recommendedMeta && (
                      <div className="fade-rise">
                        <p className="text-xs font-semibold text-gray uppercase tracking-wider mb-1">
                          Pretotype
                        </p>
                        <p className="text-sm text-navy font-medium">{recommendedMeta.name}</p>
                        <p className="text-xs text-gray leading-relaxed mt-0.5">
                          {recommendedMeta.description}
                        </p>
                      </div>
                    )}
                    {hasKillLine && (
                      <div className="fade-rise">
                        <p className="text-xs font-semibold text-gray uppercase tracking-wider mb-1">
                          Kill criteria
                        </p>
                        <p className="text-sm text-navy leading-relaxed">{killSentence}</p>
                      </div>
                    )}
                    <button
                      onClick={copyCard}
                      className="w-full border border-border text-navy py-2.5 rounded-lg text-sm font-medium hover:bg-lavender btn-press"
                    >
                      {copied ? "Copied" : "Copy as text"}
                    </button>
                  </div>
                )}
              </CardBody>
              <CardTip label="The kill line stays.">
                once the test runs, sunk cost will argue for one more week.
              </CardTip>
            </MethodCard>

            {cardComplete && (
              <div className="fade-rise space-y-4">
                <button
                  onClick={sharpen}
                  disabled={sharpening}
                  className="w-full bg-accent text-white py-3 rounded-xl text-sm font-semibold hover:bg-navy btn-press disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Sharpen this hypothesis
                </button>

                {sharpening && (
                  <div className="bg-accent-light/30 border border-accent/10 rounded-xl p-4 text-center">
                    <div className="flex justify-center gap-1.5 mb-2">
                      {[0, 0.15, 0.3].map((delay, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-accent"
                          style={{ animation: `bounce 0.5s ease ${delay}s infinite alternate` }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-accent font-medium">
                      Checking whether Y is reachable, Z is a behavior, and X is
                      defensible...
                    </p>
                  </div>
                )}

                {sharpenError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-sm text-red-700">
                      The critique did not complete. Your hypothesis is safe, everything
                      you typed is still here. Try again, or email me if it keeps
                      failing.
                    </p>
                  </div>
                )}

                {sharpenResults && (
                  <div className="rounded-xl border border-border bg-surface overflow-hidden fade-rise">
                    <div className="border-b border-border px-5 py-3">
                      <h3 className="font-sans text-sm font-semibold text-navy">
                        The critique
                      </h3>
                    </div>
                    <div className="p-5">
                      <div className="space-y-2 mb-4">
                        {sharpenResults.verdicts.map((v, i) => (
                          <div
                            key={i}
                            className="flex gap-2 text-sm fade-rise"
                            style={{ animationDelay: `${i * 60}ms` }}
                          >
                            <span
                              className={`shrink-0 mt-0.5 ${
                                v.ok ? "text-emerald-600" : "text-red-600"
                              }`}
                              aria-hidden="true"
                            >
                              {v.ok ? "✓" : "✗"}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-navy">
                                {PART_LABELS[v.part] || v.part}
                              </p>
                              <p className="text-xs text-gray leading-relaxed">{v.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {sharpenResults.sharpened && (
                        <div className="bg-accent-light/50 border border-accent/20 rounded-lg p-4 mb-3">
                          <p className="text-xs font-semibold text-accent mb-1">
                            Sharpened hypothesis
                          </p>
                          <p className="text-sm text-navy font-medium leading-relaxed">
                            {sharpenResults.sharpened}
                          </p>
                        </div>
                      )}
                      {sharpenResults.summary && (
                        <p className="text-xs text-gray leading-relaxed">
                          {sharpenResults.summary}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-light text-center mt-12">
          The form runs in your browser and nothing is stored. Only the sharpen step
          sends your text to the AI, and that text is discarded after the critique comes
          back.
        </p>
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

function YesNoQuestion({
  label,
  value,
  onChange,
}: {
  label: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
}) {
  return (
    <div>
      <p className="text-sm text-navy mb-2">{label}</p>
      <div className="flex gap-2">
        {(["yes", "no"] as const).map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`px-5 py-2 rounded-lg border text-sm font-medium btn-press ${
                selected
                  ? "border-accent bg-accent-light/50 text-accent"
                  : "border-border bg-surface text-gray hover:border-gray/30 hover:bg-lavender/40"
              }`}
            >
              {option === "yes" ? "Yes" : "No"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
