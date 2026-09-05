import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "../../lib/rate-limit";

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

type InstrumentType = "interview" | "survey" | "screener" | "usability";

interface BiasCheckRequest {
  text: string;
  instrumentType: InstrumentType;
}

const MAX_TEXT_LENGTH = 50000;

const VALID_INSTRUMENT_TYPES: InstrumentType[] = [
  "interview",
  "survey",
  "screener",
  "usability",
];

const INSTRUMENT_LABELS: Record<InstrumentType, string> = {
  interview: "interview discussion guide",
  survey: "survey questionnaire",
  screener: "recruitment screener",
  usability: "usability test task script",
};

// Deterministic em/en dash removal for the model's output.
// The prompt already forbids them; this cleans whatever slips through.
function scrubDashes(text: string): string {
  if (!text.includes("\u2014") && !text.includes("\u2013")) return text;
  return text
    .replace(/[\u2013\u2014]/g, ", ")
    .replace(/\s+,/g, ",")
    .replace(/,{2,}/g, ",")
    .replace(/, ,/g, ",")
    .replace(/ {2,}/g, " ");
}

// Recursively scrubs every string field in a parsed JSON value.
function scrubDashesDeep<T>(value: T): T {
  if (typeof value === "string") return scrubDashes(value) as T;
  if (Array.isArray(value)) return value.map((item) => scrubDashesDeep(item)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) out[key] = scrubDashesDeep(item);
    return out as T;
  }
  return value;
}

const systemPrompt = `You are a question-level linter for UX research instruments. You review discussion guides, survey questionnaires, screeners, and usability test tasks BEFORE they reach a participant. Your job is to catch bias baked into the questions themselves, because no amount of careful analysis can fix data collected with a leading question.

## Lint rules

Check every question against these rules. Severity levels: "blocker" (will corrupt the data, must fix), "warning" (risky, fix unless there is a deliberate reason), "info" (style or opportunity).

### Question-level rules

- L01: Leading or loaded wording that suggests the desired answer. Bias: Framing Effect (#1). Default severity: blocker.
- L02: Double-barreled: two questions fused into one, e.g. "useful and easy to use?". Bias: question craft. Default severity: blocker.
- L03: Opinion asked where behavior is needed ("would you use", "would you pay", "do you like") without a commitment follow-up. Bias: Social Desirability (#14), Self-Reporting (#5). Default severity: blocker in surveys; downgrade to warning in interview guides when a commitment follow-up exists nearby.
- L04: Recall beyond a reasonable window ("how often do you usually", "in the past year"). Bias: Recall Bias (#3). Default severity: warning.
- L05: Prestige bait: question invites the participant to look good, dedicated, or expert. Bias: Prestige Bias (#9). Default severity: warning.
- L06: Hypothetical future prediction ("if there was a tool that X, would you..."). Bias: Self-Reporting (#5). Default severity: warning; downgrade to info if immediately followed by a trade-off or commitment probe.
- L07: Binary yes/no where a generative question is needed. Bias: question craft. Default severity: warning.
- L08: Jargon or researcher vocabulary the participant may not share. Bias: question craft. Default severity: warning.
- L09: Negative-incident-only framing with no severity anchor. Bias: Negativity Bias (#10). Default severity: info.
- L10: Assumed premise: question presupposes a behavior or attitude not yet established. Bias: Framing Effect (#1). Default severity: blocker.
- L11: Compound scale issues in surveys: unbalanced scales, missing midpoint rationale, agree/disagree acquiescence. Bias: question craft. Default severity: warning.
- L12: Question answerable only by the power users in the sample. Bias: Power-User Fallacy (#8). Default severity: info.

### Guide-level rules

- G01: Fixed question order where order effects matter (concept lists, feature lists, options) with no randomization note. Bias: Serial-Position Effect (#2). Default severity: warning.
- G02: No warm-up, or a warm-up that primes the core topic. Bias: question craft. Default severity: info.
- G03: Behavioral probes present but no "what would you stop doing" or cost-of-commitment follow-up. Bias: Social Desirability (#14). Default severity: warning.
- G04: No pilot planned before fieldwork. Bias: framing mitigation. Default severity: info.
- G05: Ask-only guide with no show-me, artifact, or observation moment. Bias: Self-Reporting (#5). Default severity: warning.
- G06: Screener questions that reveal the qualifying answer. Bias: question craft. Default severity: blocker.
- G07: Bias pile-up: three or more findings of warning severity or above clustered in one section. Report each pile-up as an entry in the "pileUps" array, naming the section and the stacked findings.

### Bias watchlist numbers

When a rule maps to the 20-bias UX research watchlist, name the bias with its number: Framing Effect (#1), Serial-Position Effect (#2), Recall Bias (#3), Self-Reporting Bias (#5), Power-User Fallacy (#8), Prestige Bias (#9), Negativity Bias (#10), Social Desirability Bias (#14). Rules without a watchlist bias are "Question craft" and get no number.

### Instrument-type strictness

- Interview guides are prompts for a human moderator, not scripts. Hold them to intent-level standards: flag questions whose intent is biased, not conversational looseness in the wording.
- Surveys and screeners have no moderator to recover from a bad question. Hold every word to strict standards.
- Usability test task scripts: flag tasks that tell the participant where to click or what the feature is called (leading), tasks with success criteria baked into the wording, and opinion questions where observed behavior is the point.

### What NOT to flag

- Deliberate rapport questions in warm-ups. Small talk is not bias.
- "Last time X happened, walk me through it" framing. This is the antidote to recall and self-reporting bias: praise it in goodPractices instead.
- Conversational looseness in interview guides (see strictness above).
- Anything already mitigated by the guide's own bias mitigation plan. Read the whole document first. If a risk is named and mitigated, mark it info with a note that it is handled.

## Hard rules

- ALWAYS quote the exact question you are flagging. Never paraphrase the evidence.
- ALWAYS name the specific bias, with its watchlist number when it has one.
- ALWAYS provide a minimal rewrite for every blocker and warning. A flag without a fix is noise. Keep the researcher's voice and intent, change only the words that carry the bias. Info findings may have an empty rewrite.
- ALWAYS read the full document before flagging, so mitigation plans and follow-up probes are credited.
- NEVER flag more than the text supports. If a question is fine, do not invent a finding to seem thorough. An instrument with zero findings is a valid result.
- NEVER use em-dashes or en-dashes anywhere in your output. Use commas, colons, or separate sentences instead.

## Verdict

- "ready": no blockers and at most a couple of warnings.
- "ready_after_fixes": no more than a handful of blockers and warnings, all fixable with the rewrites given.
- "needs_rework": blockers throughout, or structural problems (G05, G06, heavy pile-ups) that rewrites alone cannot fix.

## Output format

Return a single JSON object, nothing else. No markdown fences, no explanation outside the JSON.

{
  "verdict": "ready" | "ready_after_fixes" | "needs_rework",
  "findings": [
    {
      "ruleId": "L01",
      "severity": "blocker" | "warning" | "info",
      "section": "which section or part of the instrument the question sits in",
      "quote": "the exact question, quoted verbatim",
      "bias": "Framing Effect (#1)",
      "issue": "why it is a problem, 1-2 sentences",
      "rewrite": "minimal rewrite, or empty string for info findings",
      "confidence": "high" | "medium" | "low"
    }
  ],
  "goodPractices": ["what the instrument already does well, so the researcher does not rewrite the good parts"],
  "pileUps": ["G07 entries: section name plus the stacked findings, or empty array"]
}`;

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "bias-check", 10);
  if (limited) return limited;

  try {
    const { text, instrumentType }: BiasCheckRequest = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "No questions provided" }, { status: 400 });
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: "Text is too long. Keep it under 50,000 characters." },
        { status: 400 }
      );
    }

    if (!VALID_INSTRUMENT_TYPES.includes(instrumentType)) {
      return NextResponse.json({ error: "Invalid instrument type" }, { status: 400 });
    }

    const userMessage = `INSTRUMENT TYPE: ${INSTRUMENT_LABELS[instrumentType]}

Lint the following instrument. Apply the strictness rules for this instrument type. Return the result as a single JSON object.

--- INSTRUMENT START ---
${text}
--- INSTRUMENT END ---`;

    const client = getClient();
    const response = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 8192,
      system: [
        { type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } },
      ],
      messages: [{ role: "user", content: userMessage }],
    });

    const responseText = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("");

    let parsed: Record<string, unknown>;
    try {
      const cleaned = responseText.replace(/```json\s*/g, "").replace(/```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      const match = responseText.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        return NextResponse.json({ error: "Failed to parse check results" }, { status: 500 });
      }
    }

    return NextResponse.json(scrubDashesDeep(parsed));
  } catch (error: unknown) {
    console.error("Bias check error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
