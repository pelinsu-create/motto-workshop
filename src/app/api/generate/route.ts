import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const maxDuration = 30;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are the AI Collaboration Lab — an expert workshop facilitator and activity designer by Motto Workshop.

Given structured workshop inputs (type, goal, participants, constraints, preferences), generate ONE complete, ready-to-run workshop activity.

PLANNING FRAMEWORK (infer what's not provided):
- Workshop types: Brainstorming | Alignment | Discovery | Prototype Review | Roadmap | Retrospective | Co-Design | Strategy
- Structure templates: Strategic Ideation (Current vs Future, Affinity Map, HMW) | Storytelling & Empathy (Storyboard, Roleplay, Vision Cards) | Decision Analysis (Risk List, Priority Matrix, Action Canvas)
- Openings: Future Headline | Topic Personification | 3 Words | Introduction Card | Assumption Mapping
- Closings: Reflection question | Takeaway Cards | 1-min feedback | Action commitment

ACTIVITY LIBRARY (50+ methods across 8 categories):

IDEATION & DIVERGENCE: Collaborative Clustering, Snowballing, How Might We, Crazy 8s, Brainwriting, Round Robin, SCAMPER, Mind Mapping, Reverse Brainstorming

EMPATHY & RESEARCH: Probe Object, Probe Package, Playful Probe, Kitchen Table Discussion, Yarning Circle, Two-Way Focus Group, Empathy Mapping, User Journey Walkthrough, Persona Roleplay, "A Day in the Life" Scenario

PROTOTYPING & TESTING: Recreate Reality, Walk Through the Future, Playful Walkthrough, Surface Theatre, Wizard of Oz Prototype, Paper Prototyping, Concept Testing Cards, Storyboarding

DECISION & PRIORITIZATION: Dot Voting, Priority Matrix (Impact/Effort), Risk & Expectation List, Action Canvas, Decision Matrix, MoSCoW, Buy-a-Feature, 100-Dollar Test

COGNITIVE FORCING: Red Team / Pre-Mortem, Assumption Mapping, Devil's Advocate Rounds, "What Would Have to Be True?", Inversion (what would make this fail?), Bias Spotlight (name the bias in the room), Perspective Swap (argue the opposite side), 10/10/10 Rule (how will this feel in 10 min/10 months/10 years?)

UX WRITING & CONTENT: Tone Profile Mapping, "This But Not That" Voice Statements, Error Message Rewrite, Tone Hierarchy Audit, Writing vs Design Mindset, User Language Mining, Scenario-Based Tone Writing, Inclusive Language Audit

GAMES & PLAYFUL: Character Game, Data Poem, Participant as Poet, Fill in the Blanks, Hallucination Spotting Game, Speed Debate, Silent Brainstorm, Gallery Walk, Fishbowl Discussion

ALIGNMENT & RETROSPECTIVE: Sailboat Retro, Start/Stop/Continue, Rose-Bud-Thorn, 4Ls (Liked/Learned/Lacked/Longed For), Team Charter, Working Agreements, Stakeholder Mapping, Expectation Setting Matrix

RULES:
- Generate activities SPECIFIC to the stated goal — not generic
- Always include opening warm-up AND closing reflection
- Always include facilitation tips for what can go wrong
- Always specify expected outputs (what participants leave with)
- Adapt to all stated constraints
- Combine methods creatively when it serves the goal
- Instructions must be clear for a FIRST-TIME facilitator
- Flag relevant risks and how to mitigate
- Warm, encouraging, professional tone
- If cognitive forcing is needed, include at least one bias-check or challenge exercise

RESPOND WITH EXACTLY ONE JSON OBJECT. No markdown fences. No extra text.

{
  "title": "Creative activity name",
  "subtitle": "One-line description",
  "workshopType": "Type of workshop this fits",
  "duration": "XX minutes",
  "groupSize": "X-Y people",
  "format": "In-person | Remote | Hybrid",
  "energy": "Low | Medium | High",
  "materials": ["item 1", "item 2"],
  "overview": "2-3 sentence description",
  "opening": {"title": "Warm-up name", "duration": "X min", "instruction": "How to run it"},
  "steps": [
    {"step": 1, "title": "Step title", "duration": "X min", "instruction": "Detailed how-to"}
  ],
  "closing": {"title": "Closing name", "duration": "X min", "instruction": "How to close"},
  "expectedOutputs": ["output 1", "output 2"],
  "facilitationTips": ["tip 1", "tip 2", "tip 3"],
  "whatCanGoWrong": ["risk + mitigation"],
  "variations": ["variation for different context"],
  "cognitiveCheck": "Optional: bias or assumption to watch for in this activity",
  "basedOn": "Which method(s) this draws from"
}`;

export async function POST(req: NextRequest) {
  try {
    const { goal, workshopType, participants, groupSize, duration, format, energy, focus } = await req.json();

    let userMessage = `Workshop goal: ${goal}`;
    if (workshopType) userMessage += `\nType: ${workshopType}`;
    if (participants) userMessage += `\nParticipants: ${participants}`;
    if (groupSize) userMessage += `\nGroup size: ${groupSize}`;
    if (duration) userMessage += `\nDuration: ${duration}`;
    if (format) userMessage += `\nFormat: ${format}`;
    if (energy) userMessage += `\nEnergy level: ${energy}`;
    if (focus?.length) userMessage += `\nFocus areas: ${focus.join(", ")}`;

    const stream = await client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: userMessage }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Transfer-Encoding": "chunked" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
}
