import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

interface TranscriptInput {
  id: string;
  name: string;
  content: string;
}

interface AnalysisRequest {
  transcripts: TranscriptInput[];
  methods: string[];
  context?: string;
}

const METHOD_PROMPTS: Record<string, string> = {
  thematic: `## Thematic Analysis (Braun & Clarke, 2006)

Follow the 6-phase process strictly:
1. FAMILIARIZE: Read all transcripts. Note initial impressions.
2. INITIAL CODES: Generate codes from explicit participant language. Every code must reference a participant ID.
3. SEARCH THEMES: Group codes into candidate themes.
4. REVIEW THEMES: Check themes against the data. Merge or split as needed.
5. DEFINE THEMES: Name and describe each theme precisely.
6. REPORT: For each theme, provide name, description, 2-3 supporting quotes with participant IDs, and confidence level (High/Medium/Low).

Output JSON:
{
  "themes": [
    {
      "name": "Theme Name",
      "description": "What this theme captures",
      "quotes": [{"participant": "P01", "quote": "exact words"}],
      "confidence": "High|Medium|Low"
    }
  ],
  "biasFlags": ["Any potential biases detected in the data or analysis"]
}`,

  affinity: `## Affinity Mapping (Beyer & Holtzblatt)

Create bottom-up clusters:
1. Extract individual insights/observations from each transcript (one insight per sticky note).
2. Group related insights by similarity — NOT by topic you chose, but by natural affinity.
3. Name each cluster after what the insights have in common.
4. List which participants contributed to each cluster.

Output JSON:
{
  "clusters": [
    {
      "cluster": "Cluster Name",
      "insights": ["Insight 1", "Insight 2"],
      "participants": ["P01", "P03"]
    }
  ]
}`,

  jtbd: `## Jobs to Be Done (Christensen / Moesta & Spiek Switch Interview)

For each job identified:
1. Extract the SITUATION (when/where the job arises)
2. Extract the MOTIVATION (what the person is trying to accomplish — functional + emotional + social)
3. Extract the DESIRED OUTCOME (what success looks like)
4. Map the FOUR FORCES:
   - Push: Frustration with current situation
   - Pull: Attraction of new solution
   - Anxiety: Fear of change
   - Habit: Comfort with status quo

Look for: struggling moments, workarounds, compensating behaviors, non-consumption.
Format as job stories: "When [situation], I want to [motivation], so I can [outcome]"

Output JSON:
{
  "jobs": [
    {
      "situation": "...",
      "motivation": "...",
      "outcome": "...",
      "forces": {"push": "...", "pull": "...", "anxiety": "...", "habit": "..."}
    }
  ]
}`,

  quotes: `## Quote Mining

Extract the most significant quotes from each transcript:
1. Select quotes that are emotionally charged, surprising, or representative of a pattern.
2. Tag each with participant ID, the theme it relates to, and emotional valence.
3. Preserve exact language — do NOT paraphrase.
4. Prioritize quotes showing: unmet needs, workarounds, strong emotions, contradictions, aha moments.

Output JSON:
{
  "quotes": [
    {
      "participant": "P01",
      "quote": "exact participant words",
      "theme": "Related theme",
      "sentiment": "positive|negative|neutral|mixed"
    }
  ]
}`,

  contradictions: `## Contradiction Flagging

Find where participants DISAGREE or hold CONFLICTING mental models:
1. Identify topics where different participants have opposing views.
2. For each contradiction, show what each participant said.
3. Explain the implication — why this tension matters for design decisions.
4. Do NOT resolve contradictions. Surface them. The tension IS the insight.

Output JSON:
{
  "contradictions": [
    {
      "topic": "What they disagree about",
      "positions": [
        {"participant": "P01", "position": "Their view"},
        {"participant": "P03", "position": "Opposing view"}
      ],
      "implication": "Why this matters"
    }
  ]
}`,

  patterns: `## Cross-Interview Pattern Detection

Find behaviors, pain points, and workarounds that appear across MULTIPLE participants:
1. A pattern must appear in 3+ transcripts to be reported (for 2 transcripts: 2+).
2. Count frequency (how many participants show this pattern).
3. Provide evidence (brief description of how it manifests).
4. List which participants exhibited the pattern.
5. Prioritize: recurring workarounds > recurring complaints > recurring behaviors.

Output JSON:
{
  "patterns": [
    {
      "pattern": "What the pattern is",
      "frequency": 4,
      "participants": ["P01", "P02", "P05", "P08"],
      "evidence": "How this pattern manifests across participants"
    }
  ]
}`,

  gaps: `## Gap Analysis

Identify what is NOT covered by the current data:
1. What topics were mentioned but not explored deeply enough?
2. What participant segments are missing? (demographic, behavioral, experience level)
3. What questions should the next round of research address?
4. What assumptions in the data remain untested?
5. Flag any potential biases in the sample or interview guide.

Output JSON:
{
  "gaps": [
    {
      "area": "Gap area",
      "question": "Specific follow-up question",
      "priority": "High|Medium|Low"
    }
  ],
  "biasFlags": ["Potential biases in the data collection"]
}`,
};

export async function POST(req: NextRequest) {
  try {
    const { transcripts, methods, context }: AnalysisRequest = await req.json();

    if (!transcripts || transcripts.length === 0) {
      return NextResponse.json({ error: "No transcripts provided" }, { status: 400 });
    }

    if (!methods || methods.length === 0) {
      return NextResponse.json({ error: "No analysis methods selected" }, { status: 400 });
    }

    const transcriptBlock = transcripts
      .map((t) => `--- TRANSCRIPT: ${t.id} (${t.name}) ---\n${t.content}\n--- END ${t.id} ---`)
      .join("\n\n");

    const methodInstructions = methods
      .filter((m) => METHOD_PROMPTS[m])
      .map((m) => METHOD_PROMPTS[m])
      .join("\n\n---\n\n");

    const systemPrompt = `You are a senior UX research analyst. You analyze interview transcripts using established research methods.

RULES:
- Every finding must reference specific participant IDs (P01, P02, etc.)
- Use EXACT participant language in quotes — never paraphrase
- Flag confidence levels: High (3+ sources), Medium (2 sources), Low (1 source)
- Flag potential biases using the 20 UX Research Biases framework (Calabro)
- Distinguish between what participants SAID vs. your INTERPRETATION
- If data is insufficient for a method, say so — do not fabricate findings
- Outliers and contradictions are valuable — do not smooth them away

OUTPUT FORMAT:
Return a single JSON object where each key is the method ID and the value is that method's output.
Example: {"thematic": {...}, "jtbd": {...}, "gaps": {...}}

No markdown fences. No explanation outside the JSON.`;

    const userMessage = `${context ? `RESEARCH CONTEXT: ${context}\n\n` : ""}TRANSCRIPTS (${transcripts.length} total):

${transcriptBlock}

---

Run the following analysis methods on the transcripts above. Return results as a single JSON object.

${methodInstructions}`;

    const client = getClient();
    const response = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 8192,
      system: [
        { type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } },
      ],
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("");

    let parsed: Record<string, unknown>;
    try {
      const cleaned = text.replace(/```json\s*/g, "").replace(/```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        return NextResponse.json({ error: "Failed to parse analysis results" }, { status: 500 });
      }
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("Analysis error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
