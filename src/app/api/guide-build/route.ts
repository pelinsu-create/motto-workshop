import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

type QuestionType = "generative" | "descriptive" | "evaluative" | "causal";
type GuideFormat = "interview" | "survey" | "screener";

interface GuideBuildRequest {
  goal: string;
  decision: string;
  questionType: QuestionType;
  format: GuideFormat;
  participants: string;
}

const MAX_GOAL_LENGTH = 2000;
const MAX_FIELD_LENGTH = 500;

const VALID_QUESTION_TYPES: QuestionType[] = [
  "generative",
  "descriptive",
  "evaluative",
  "causal",
];

const VALID_FORMATS: GuideFormat[] = ["interview", "survey", "screener"];

const FORMAT_LABELS: Record<GuideFormat, string> = {
  interview: "interview discussion guide",
  survey: "survey questionnaire",
  screener: "recruitment screener",
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

const systemPrompt = `You are a senior UX researcher drafting research instruments BEFORE fieldwork: interview discussion guides, survey questionnaires, and recruitment screeners. Every question you write must survive a strict bias lint afterwards, so you write clean the first time.

## Inputs

You receive a research goal, optionally the decision the research informs, a question type (generative, descriptive, evaluative, or causal), the instrument format, and optionally a description of the target participants.

## Question craft rules

- Neutral wording. Never suggest the desired answer. No loaded adjectives, no praise for the topic, no "how much do you love".
- One question at a time. Never fuse two questions into one ("useful and easy to use?" is two questions).
- Behavior over opinion. Ask about concrete past behavior. NEVER ask "would you use", "would you pay", "do you like", or any prediction of future behavior. When an intent question feels tempting, replace it with the nearest past-behavior question.
- Recall limits. Anchor questions to a recent specific instance: "Tell me about the last time...". Never ask people to average their own behavior over long windows ("how often do you usually", "in a typical year").
- No assumed premises. Do not presuppose a behavior or attitude the guide has not established. Establish first, then probe.
- Participant language. Plain words, no researcher or industry jargon.

## Question type focus

- generative: open exploration of a problem space. Broad behavioral stories, workarounds, tools in use, unprompted pain.
- descriptive: how things happen today. Sequences, steps, frequency anchored to recent instances, who is involved, what is used.
- evaluative: reaction to something that exists. Task-and-observe framing where possible, specific recent usage, friction encountered, severity anchors.
- causal: why something happens. Walk back through a specific recent instance, decision points, what came right before, what else changed.

## Format rules

- Interview guide: a warm-up that does not prime the core topic, then open behavioral questions with probe follow-ups, at least one show-me or artifact moment when the goal allows it, and a closing that asks what was not covered. Questions are prompts for a human moderator, so they can breathe, but their intent must be unbiased.
- Survey: mostly closed questions. Suggest a response scale for every scaled question inside the question text, in parentheses, e.g. "(Scale: 1 = Never to 5 = Every day, all points labeled)". Keep scales balanced with a clear midpoint policy. Avoid agree/disagree batteries; alternate the framing of scaled items so acquiescence cannot run one direction through the whole instrument. Include one open text question at most per section.
- Screener: qualification questions that never reveal which answer qualifies. Hide the target behavior inside distractor options. Put the disqualification logic in the question's "why" line, e.g. "disqualify if the answer is less often than monthly". Keep it short: screeners are 5 to 8 questions total.

## Grounding

- Build ONLY on what the user typed. NEVER invent product facts, feature names, brand names, competitors, or participant traits that are not in the inputs. If the goal does not name a product, keep questions about the behavior and context, not about an imagined product.
- If the goal is vague, still draft the best guide the inputs allow and add a watchout that names what is missing.

## Structure

- Interview guides and surveys: 3 to 5 sections, 2 to 5 questions each.
- Screeners: 1 or 2 sections, 5 to 8 questions total.
- "intro" is what the researcher says or shows first: consent framing, what happens in the session, no priming of the core topic.
- "closing" is the wrap-up: final open door, thanks, next steps.
- Every question carries a one-line "why": what the answer retrieves for the decision at hand.
- "type" is a short lowercase label such as "warm-up", "behavioral", "recall", "probe", "scale", "single choice", "open text", "disqualifier", "closing".
- "watchouts" lists 2 or 3 bias risks specific to THIS guide, each naming the bias and where it could bite during fieldwork or analysis.

## Hard rules

- NEVER use em-dashes or en-dashes anywhere in your output. Use commas, colons, or separate sentences instead.
- NEVER include opinion or intent questions, even as closers.
- ALWAYS keep the guide answerable by the described participants; when none are described, keep it broadly answerable.

## Output format

Return a single JSON object, nothing else. No markdown fences, no explanation outside the JSON.

{
  "intro": "what the researcher says or shows first",
  "sections": [
    {
      "title": "section name",
      "purpose": "one line on what this section establishes",
      "questions": [
        {
          "text": "the question, verbatim as it will be asked",
          "type": "short lowercase label",
          "why": "one line on what this question retrieves"
        }
      ]
    }
  ],
  "closing": "the wrap-up",
  "watchouts": ["2 or 3 bias risks specific to this guide"]
}`;

export async function POST(req: NextRequest) {
  try {
    const { goal, decision, questionType, format, participants }: GuideBuildRequest =
      await req.json();

    if (!goal || !goal.trim()) {
      return NextResponse.json({ error: "No research goal provided" }, { status: 400 });
    }
    if (goal.length > MAX_GOAL_LENGTH) {
      return NextResponse.json(
        { error: "The research goal is too long. Keep it under 2,000 characters." },
        { status: 400 }
      );
    }
    for (const [label, value] of [
      ["decision", String(decision ?? "")],
      ["participants", String(participants ?? "")],
    ] as const) {
      if (value.length > MAX_FIELD_LENGTH) {
        return NextResponse.json(
          { error: `The ${label} field is too long. Keep it under 500 characters.` },
          { status: 400 }
        );
      }
    }
    if (!VALID_QUESTION_TYPES.includes(questionType)) {
      return NextResponse.json({ error: "Invalid question type" }, { status: 400 });
    }
    if (!VALID_FORMATS.includes(format)) {
      return NextResponse.json({ error: "Invalid format" }, { status: 400 });
    }

    const userMessage = `RESEARCH GOAL: ${goal.trim()}

DECISION THIS RESEARCH INFORMS: ${String(decision ?? "").trim() || "not stated"}

QUESTION TYPE: ${questionType}

FORMAT: ${FORMAT_LABELS[format]}

TARGET PARTICIPANTS: ${String(participants ?? "").trim() || "not described"}

Draft the ${FORMAT_LABELS[format]}. Build only on these inputs. Return the result as a single JSON object.`;

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
        return NextResponse.json({ error: "Failed to parse the draft" }, { status: 500 });
      }
    }

    return NextResponse.json(scrubDashesDeep(parsed));
  } catch (error: unknown) {
    console.error("Guide build error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
