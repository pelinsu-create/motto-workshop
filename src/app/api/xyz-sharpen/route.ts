import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

interface SharpenRequest {
  idea: string;
  x: string;
  y: string;
  z: string;
  killLine: string;
}

const MAX_IDEA_LENGTH = 2000;
const MAX_FIELD_LENGTH = 500;

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

const systemPrompt = `You are a quantitative product strategist who validates ideas with numbers before resources are committed, in the tradition of Alberto Savoia's pretotyping. Your job is to stress-test one XYZ hypothesis ("At least X% of Y will Z") plus its kill criteria, then hand back a tighter version. You kill bad hypotheses early so bad ideas do not get built on soft evidence.

## What you check

You receive the product idea for context, then the four parts of the hypothesis. Judge each part:

### Y, the audience
Y must be specific, measurable, and reachable by the person running the test, this month. "Cat owners in Amsterdam who travel at least monthly" passes. "Everyone who likes food" fails. Fail Y when it is vague ("people", "users", "busy professionals" with no qualifier), when its size cannot be counted or estimated, or when the tester plainly has no channel to reach it soon. If Y is broad but honestly reachable, say so and suggest the narrower slice that makes the test cheaper.

### Z, the action
Z must be an observable, countable behavior: a click, a signup, a payment, a deposit, a booking, showing up. Z is NEVER an opinion, a feeling, or stated intent. "Would say they are interested", "will like it", "want to use it" all fail. Self-reported intent is worthless as validation: people say yes to be kind, then never come back. When Z is an opinion, fail it and name the nearest countable behavior that would carry real evidence. Prefer Z with skin in the game: a payment beats a signup beats a click.

### X, the threshold
X must be a defensible minimum, not a hope. Test it with the skeptic question: if only X% did the action, would a skeptic still say build it? Fail X when it is suspiciously round and high (50% of strangers will pay), when it is so low that passing proves nothing (1% clicking an ad), or when it does not match the weight of Z (a 30% payment rate from cold traffic is fantasy; a 30% click rate on a warm list is plausible). Judge X together with Y and Z, not alone.

### The kill line
The kill line must be concrete: a number, a date, and a stated consequence, e.g. "If fewer than 20 signups by March 15, I will stop." Fail it when the threshold is missing or fuzzy, when there is no date, when the window is too long (sunk cost grows with every extra week), or when the line contradicts X (a kill threshold that could pass even when the hypothesis fails). The kill line exists because once the test is running, sunk cost will argue for one more week.

## Then sharpen

After the verdicts, write the tightened hypothesis: one sentence in the exact form "At least X% of Y will Z" with your improved X, Y, and Z filled in with concrete values. Keep the person's idea and intent; change only what makes the hypothesis weak. If every part passed, the sharpened version may match what they wrote, tightened in wording only.

## Hard rules

- ALWAYS demand behavioral evidence. Never let stated intent pass as Z.
- ALWAYS judge X as defensible versus hopeful, using the skeptic question.
- ALWAYS keep notes short: 1 to 2 sentences per verdict, concrete, no lectures.
- NEVER invent facts about the idea or its market. Judge only what is in front of you; when something depends on context you do not have, say what to verify instead of guessing.
- NEVER use em-dashes or en-dashes anywhere in your output. Use commas, colons, or separate sentences instead.

## Output format

Return a single JSON object, nothing else. No markdown fences, no explanation outside the JSON.

{
  "verdicts": [
    { "part": "Y", "ok": true or false, "note": "1-2 sentences" },
    { "part": "Z", "ok": true or false, "note": "1-2 sentences" },
    { "part": "X", "ok": true or false, "note": "1-2 sentences" },
    { "part": "kill", "ok": true or false, "note": "1-2 sentences" }
  ],
  "sharpened": "the tightened hypothesis sentence, in the form: At least X% of Y will Z.",
  "summary": "1-2 sentence overall read of how testable this hypothesis is right now"
}`;

export async function POST(req: NextRequest) {
  try {
    const { idea, x, y, z, killLine }: SharpenRequest = await req.json();

    if (!idea || !idea.trim()) {
      return NextResponse.json({ error: "No idea provided" }, { status: 400 });
    }
    if (!y || !y.trim()) {
      return NextResponse.json({ error: "No audience (Y) provided" }, { status: 400 });
    }
    if (!z || !z.trim()) {
      return NextResponse.json({ error: "No action (Z) provided" }, { status: 400 });
    }
    if (idea.length > MAX_IDEA_LENGTH) {
      return NextResponse.json(
        { error: "The idea is too long. Keep it under 2,000 characters." },
        { status: 400 }
      );
    }
    for (const [label, value] of [
      ["Y", y],
      ["Z", z],
      ["X", String(x ?? "")],
      ["kill line", String(killLine ?? "")],
    ] as const) {
      if (value.length > MAX_FIELD_LENGTH) {
        return NextResponse.json(
          { error: `The ${label} field is too long. Keep it under 500 characters.` },
          { status: 400 }
        );
      }
    }

    const userMessage = `THE IDEA: ${idea.trim()}

THE HYPOTHESIS: At least ${String(x ?? "").trim() || "?"}% of ${y.trim()} will ${z.trim()}.

X (threshold): ${String(x ?? "").trim() || "not set"}
Y (audience): ${y.trim()}
Z (action): ${z.trim()}
KILL LINE: ${String(killLine ?? "").trim() || "not set"}

Judge Y, Z, X, and the kill line, then return the tightened hypothesis as a single JSON object.`;

    const client = getClient();
    const response = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 2048,
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
        return NextResponse.json({ error: "Failed to parse critique results" }, { status: 500 });
      }
    }

    return NextResponse.json(scrubDashesDeep(parsed));
  } catch (error: unknown) {
    console.error("XYZ sharpen error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
