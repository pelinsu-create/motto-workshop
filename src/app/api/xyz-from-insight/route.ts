import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "../../lib/rate-limit";

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

interface FromInsightRequest {
  insight: string;
}

const MAX_INSIGHT_LENGTH = 4000;

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

const systemPrompt = `You are a quantitative product strategist who validates ideas with numbers before resources are committed, in the tradition of Alberto Savoia's pretotyping. Your job is to read one research insight, interview finding, or observation, and draft the parts of an XYZ hypothesis ("At least X% of Y will Z") from it. The person will review and edit every part; you provide a solid, honest starting draft.

## What you draft

### idea
One or two plain sentences describing the idea or intervention the insight points toward. Stay inside what the pasted text supports. If the insight describes a problem but no solution, phrase the idea as the smallest thing that would address the observed problem, and keep it modest.

### Y, the audience
Y must be specific and measurable, always narrower than "everyone" or "users". Pull the audience from the insight itself: who was observed, interviewed, or described. If the insight names a broad group, narrow it to the slice the evidence actually covers, e.g. "freelance designers who invoice monthly" rather than "freelancers".

### Z, the action
Z must be an observable, countable behavior: a click, a signup, a payment, a deposit, a booking, showing up. Z is NEVER an opinion, a feeling, or stated intent. If the insight only reports opinions or stated intent ("they said they would love it", "they seemed interested"), still draft the nearest countable behavior that would carry real evidence, set opinion_flag to true, and use opinion_note to explain in 1 to 3 sentences that the insight reports opinion, why opinion is weak evidence, and how you converted it to the behavior you chose. If the insight already describes real behavior, set opinion_flag to false and leave opinion_note as an empty string.

### x_suggestion, the threshold
A conservative starting threshold as a plain number, digits only, no percent sign, e.g. "10". Choose it by the weight of Z: high-commitment actions like payments warrant low single digits, light actions like clicks warrant more. This number is a starting point for the person to challenge, not a market estimate. x_rationale is one short sentence explaining why this is a reasonable conservative floor for this kind of action.

### assumptions
List 2 or 3 assumptions hiding inside the insight that the test should surface. Good examples: "what people said in the interview matches what they do", "the three participants who mentioned this represent the wider segment", "the problem is painful enough to act on, not just to mention". Each one is a single short sentence, concrete, tied to this insight.

## Hard rules

- Derive EVERYTHING from the pasted text only. NEVER invent product facts, market facts, company names, or numbers beyond the single suggested threshold.
- ALWAYS make Z a behavior, never an opinion or stated intent.
- ALWAYS make Y narrower than "everyone", grounded in who the insight is actually about.
- Keep every field short and plain. No jargon, no pitch language.
- NEVER use em-dashes or en-dashes anywhere in your output. Use commas, colons, or separate sentences instead.

## Output format

Return a single JSON object, nothing else. No markdown fences, no explanation outside the JSON.

{
  "idea": "one or two plain sentences",
  "y": "the specific audience",
  "z": "the observable action",
  "x_suggestion": "a number as digits only, e.g. 10",
  "x_rationale": "one short sentence on why this threshold is a reasonable conservative floor",
  "opinion_flag": true or false,
  "opinion_note": "empty string, or 1-3 sentences on how the opinion was converted to a behavior",
  "assumptions": ["assumption one", "assumption two", "assumption three (optional)"]
}`;

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "xyz-from-insight", 15);
  if (limited) return limited;

  try {
    const { insight }: FromInsightRequest = await req.json();

    if (!insight || !insight.trim()) {
      return NextResponse.json({ error: "No insight provided" }, { status: 400 });
    }
    if (insight.length > MAX_INSIGHT_LENGTH) {
      return NextResponse.json(
        { error: "The insight is too long. Keep it under 4,000 characters." },
        { status: 400 }
      );
    }

    const userMessage = `THE INSIGHT:
${insight.trim()}

Draft the idea, Y, Z, a conservative X suggestion with rationale, the opinion flag and note, and 2 or 3 hidden assumptions, then return them as a single JSON object.`;

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
        return NextResponse.json({ error: "Failed to parse draft results" }, { status: 500 });
      }
    }

    return NextResponse.json(scrubDashesDeep(parsed));
  } catch (error: unknown) {
    console.error("XYZ from insight error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
