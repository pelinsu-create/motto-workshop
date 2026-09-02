"use client";

import { useState } from "react";

type Claim = {
  text: string;
  verdict: "verified" | "fabricated" | "distorted";
  explanation: string;
  redFlag?: string;
};

const claims: Claim[] = [
  {
    text: "According to McKinsey\u2019s 2023 State of AI report, 63% of executives say they don\u2019t fully trust AI-generated content in client deliverables.",
    verdict: "distorted",
    explanation:
      "McKinsey\u2019s report exists and discusses AI adoption concerns. But the exact 63% figure and the specific framing about \u201cclient deliverables\u201d is not in the original report. The stat has been repackaged to sound more specific than it is.",
    redFlag: "Convenience Tell",
  },
  {
    text: "A 2024 Stanford study found that teams using AI verification checklists caught 78.3% more errors than teams without any review process.",
    verdict: "fabricated",
    explanation:
      "This source does not exist. The oddly specific 78.3% is a classic Percentage Tell. real studies rarely report decimals like this without methodological reason.",
    redFlag: "Percentage Tell",
  },
  {
    text: "Bu\u00e7inca et al. (2021) at Harvard demonstrated that cognitive forcing functions reduced overreliance on incorrect AI recommendations.",
    verdict: "verified",
    explanation:
      "This is real. Published in Proceedings of the ACM on Human-Computer Interaction (CSCW). The study showed that making people think before seeing AI output reduced blind acceptance of wrong answers.",
  },
  {
    text: "The global AI hallucination detection market grew 318% between 2023 and 2025, reaching $4.2 billion by end of 2025.",
    verdict: "distorted",
    explanation:
      "The 318% growth figure appears in industry reports. But the $4.2 billion valuation is not attached to the same source. two separate stats have been merged into one sentence to look like a single finding.",
    redFlag: "Scope Tell",
  },
  {
    text: "RAG reduces AI hallucination rates by 71% when properly integrated, according to a 2024 peer-reviewed meta-analysis in Nature Machine Intelligence.",
    verdict: "distorted",
    explanation:
      "The 71% figure comes from a vendor study by Morphik AI, not a peer-reviewed meta-analysis. The number may be directionally correct, but the source attribution is fabricated to add authority.",
    redFlag: "Convenience Tell",
  },
];

export default function SpotHallucination() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);

  const verdictLabel = {
    verified: "Verified",
    fabricated: "Fabricated",
    distorted: "Distorted",
  };

  const verdictColor = {
    verified: "bg-emerald-100 text-emerald-800 border-emerald-300",
    fabricated: "bg-red-100 text-red-800 border-red-300",
    distorted: "bg-amber-100 text-amber-800 border-amber-300",
  };

  const buttonStyle = (idx: number, value: string) => {
    const isSelected = answers[idx] === value;
    if (!revealed) {
      return isSelected
        ? "bg-accent text-white border-accent"
        : "bg-surface text-navy border-border hover:bg-lavender";
    }
    const correct = claims[idx].verdict === value;
    const wasSelected = isSelected;
    if (correct && wasSelected) return "bg-emerald-100 text-emerald-800 border-emerald-400";
    if (correct && !wasSelected) return "bg-emerald-50 text-emerald-700 border-emerald-300";
    if (!correct && wasSelected) return "bg-red-100 text-red-800 border-red-300";
    return "bg-surface text-gray-light border-border opacity-50";
  };

  const score = revealed
    ? claims.filter((c, i) => answers[i] === c.verdict).length
    : 0;

  return (
    <section id="spot" className="py-20 border-t border-border">
      <div className="max-w-2xl">
        <p className="section-label mb-3">Try It</p>
        <h2 className={`text-2xl md:text-3xl text-navy mb-4`}>
          Spot the Hallucination
        </h2>
        <p className="text-gray leading-relaxed mb-8">
          5 claims. Some are real, some are fabricated, some are subtly
          distorted. Can you tell which is which?
        </p>

        <div className="space-y-6">
          {claims.map((claim, idx) => (
            <div
              key={idx}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <p className="text-sm text-navy leading-relaxed mb-4 italic">
                &ldquo;{claim.text}&rdquo;
              </p>

              <div className="flex gap-2 flex-wrap">
                {(["verified", "fabricated", "distorted"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      if (!revealed) {
                        setAnswers((prev) => ({ ...prev, [idx]: v }));
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${buttonStyle(idx, v)}`}
                  >
                    {verdictLabel[v]}
                  </button>
                ))}
              </div>

              {revealed && (
                <div className="mt-4 space-y-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold border ${verdictColor[claim.verdict]}`}
                  >
                    {verdictLabel[claim.verdict]}
                    {claim.redFlag && `: ${claim.redFlag}`}
                  </span>
                  <p className="text-xs text-gray leading-relaxed">
                    {claim.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {!revealed && Object.keys(answers).length === claims.length && (
          <button
            onClick={() => setRevealed(true)}
            className="mt-8 bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors cursor-pointer"
          >
            Show Answers
          </button>
        )}

        {revealed && (
          <div className="mt-8 bg-surface border border-border rounded-xl p-6">
            <p className="text-lg text-navy font-serif mb-2">
              You caught {score} out of {claims.length}.
            </p>
            <p className="text-sm text-gray leading-relaxed mb-4">
              {score === 5
                ? "Perfect. You verified like a professional."
                : score >= 3
                  ? "Good eye. The subtle ones are where most teams get caught."
                  : "Most people score 1 or 2. That\u2019s exactly why verification matters."}
            </p>
            <p className="text-sm text-navy font-medium mb-4">
              This is what we teach. 3-Layer Verification: Does the source
              exist? Does it say what\u2019s claimed? Is it used in context?
            </p>
            <a
              href="https://calendar.app.google/K83wsdYJEWv5mWh47"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
            >
              Want this for your team? Book a call
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
