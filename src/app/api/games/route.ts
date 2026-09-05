import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "../../lib/rate-limit";

export const maxDuration = 30;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const PROMPTS: Record<string, string> = {
  bingo: `You generate one round of "Bad Idea Bingo", a workshop critique game.

Given a real product or team challenge, produce exactly 9 short solution ideas:
- Exactly 1 is a genuinely good idea (the gem). It should look unremarkable at first glance: modest, specific, testable.
- Exactly 1 is a trap: it sounds impressive and would quietly fail (hype technology, vanity metrics, solves the wrong problem, or unverifiable claims).
- The other 7 are plausible but mediocre.

Rules:
- Every idea must be specific to the stated challenge, not generic.
- One sentence each, maximum 18 words.
- Do not make the gem obviously good or the trap obviously bad. The game only works if people argue.
- No em dashes or en dashes in any text.

Respond with exactly one JSON object, no markdown fences, no extra text:
{"ideas":[{"id":1,"text":"..."},{"id":2,"text":"..."},{"id":3,"text":"..."},{"id":4,"text":"..."},{"id":5,"text":"..."},{"id":6,"text":"..."},{"id":7,"text":"..."},{"id":8,"text":"..."},{"id":9,"text":"..."}],"gemId":1,"trapId":2,"gemWhy":"one sentence on why the gem wins","trapWhy":"one sentence on how the trap quietly fails"}`,

  hats: `You run one round of "Hat Roulette", a stakeholder perspective game for workshops.

Given a decision or plan, pick the 3 stakeholders whose honest reactions would most change it. Prefer uncomfortable, concrete perspectives over official ones: the person who pays for it, the person on call when it breaks, the first-time user, the person whose job it changes.

For each stakeholder give:
- role: a short human label, not a job-ad title
- reaction: their honest first-person reaction, 2 to 3 sentences, specific to the stated decision
- question: the one question they would ask that the room cannot easily answer

Rules:
- Reactions must reference details of the actual decision, not generic concerns.
- No em dashes or en dashes in any text.

Respond with exactly one JSON object, no markdown fences, no extra text:
{"hats":[{"role":"...","reaction":"...","question":"..."},{"role":"...","reaction":"...","question":"..."},{"role":"...","reaction":"...","question":"..."}]}`,
};

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "games", 20);
  if (limited) return limited;

  try {
    const { game, challenge } = await req.json();

    if (!game || !PROMPTS[game]) {
      return NextResponse.json({ error: "Unknown game" }, { status: 400 });
    }
    if (!challenge || typeof challenge !== "string" || challenge.trim().length < 8) {
      return NextResponse.json(
        { error: "Describe the challenge in a sentence or two first." },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      system: PROMPTS[game],
      messages: [{ role: "user", content: challenge.trim().slice(0, 600) }],
    });

    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => ("text" in block ? block.text : ""))
      .join("");

    // The model is instructed to return bare JSON; strip fences defensively.
    const cleaned = text.replace(/^```(?:json)?/m, "").replace(/```\s*$/m, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) {
      return NextResponse.json({ error: "The round did not generate cleanly." }, { status: 502 });
    }

    const data = JSON.parse(cleaned.slice(start, end + 1));
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Games API error:", error);
    return NextResponse.json(
      { error: "The round did not generate. Try again, or shorten the challenge." },
      { status: 500 }
    );
  }
}
