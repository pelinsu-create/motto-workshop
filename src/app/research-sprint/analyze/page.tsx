"use client";

import { useState, useRef, useCallback } from "react";

interface Transcript {
  id: string;
  name: string;
  content: string;
}

interface ThemeQuote { quote: string; participant: string; }
interface Theme { name: string; confidence: string; description: string; quotes: ThemeQuote[]; }
interface Cluster { cluster: string; insights: string[]; participants: string[]; }
interface Job {
  situation: string;
  motivation: string;
  outcome: string;
  forces: Record<string, string>;
}
interface KeyQuote { quote: string; participant: string; theme: string; sentiment: string; }
interface Contradiction {
  topic: string;
  positions: { participant: string; position: string }[];
  implication: string;
}
interface Pattern { pattern: string; evidence: string; frequency: number; participants: string[]; }
interface Gap { area: string; question: string; priority: string; }

interface Results {
  thematic?: { themes: Theme[]; biasFlags?: string[] };
  affinity?: { clusters: Cluster[] };
  jtbd?: { jobs: Job[] };
  quotes?: { quotes: KeyQuote[] };
  contradictions?: { contradictions: Contradiction[] };
  patterns?: { patterns: Pattern[] };
  gaps?: { gaps: Gap[] };
}

const METHODS = [
  { id: "thematic", icon: "🔬", name: "Thematic Analysis", desc: "Braun & Clarke 6-phase: familiarize → initial codes → search themes → review → define → report", source: "Braun & Clarke, 2006" },
  { id: "affinity", icon: "🗂️", name: "Affinity Mapping", desc: "Cluster insights bottom-up into groups. Reveal hidden connections across participants.", source: "Beyer & Holtzblatt" },
  { id: "jtbd", icon: "⚡", name: "Jobs to Be Done", desc: "Extract job stories, four forces (push/pull/anxiety/habit), struggling moments, hiring criteria.", source: "Christensen / Moesta & Spiek" },
  { id: "quotes", icon: "💬", name: "Quote Mining", desc: "Key quotes tagged by participant ID, theme, and emotional valence. Presentation-ready.", source: "Direct evidence extraction" },
  { id: "contradictions", icon: "⚔️", name: "Contradiction Flagging", desc: "Where participants disagree or hold conflicting mental models. Tensions = insights.", source: "Divergent analysis" },
  { id: "patterns", icon: "🔗", name: "Cross-Interview Patterns", desc: "Behaviors, pain points, and workarounds appearing across 3+ participants. Frequency counted.", source: "Cross-case pattern matching" },
  { id: "gaps", icon: "🕳️", name: "Gap Analysis", desc: "Unanswered questions, insufficient data areas, recommended follow-up research.", source: "Research planning" },
];

const METHOD_META: Record<string, { icon: string; name: string }> = {
  thematic: { icon: "🔬", name: "Thematic Analysis" },
  affinity: { icon: "🗂️", name: "Affinity Mapping" },
  jtbd: { icon: "⚡", name: "Jobs to Be Done" },
  quotes: { icon: "💬", name: "Key Quotes" },
  contradictions: { icon: "⚔️", name: "Contradictions" },
  patterns: { icon: "🔗", name: "Cross-Interview Patterns" },
  gaps: { icon: "🕳️", name: "Gap Analysis" },
};

// Fictional sample interviews so a visitor can watch a full analysis run
// without preparing anything. Written to exercise every method: themes,
// quotes, a genuine contradiction, cross-participant patterns and gaps.
const SAMPLE_TRANSCRIPTS: Transcript[] = [
  {
    id: "P01",
    name: "Sample: Design lead, fintech",
    content: `Interviewer: How does your team use AI tools in research right now?

P01: Honestly, everywhere. Transcription, summaries, first-pass analysis. My researchers used to spend a week coding interviews, now they get a draft in an hour. I would never go back.

Interviewer: What do you do with that draft?

P01: That is the uncomfortable part. Mostly we use it as is. There is a deadline, the summary looks plausible, it goes in the deck. I know we should check it against the transcripts. Nobody has time. Last quarter a stat made it into a stakeholder readout and someone asked which participant said it. We could not find the quote. It turned out the tool had merged two different comments into one claim. That was a bad meeting.

Interviewer: Did anything change after that?

P01: We talked about a review step, but it never became a routine. The tools are so fast that slowing down feels like losing the whole benefit. What I actually want is analysis that comes with receipts. Show me the quote, show me who said it, then I can defend it.

Interviewer: What would you stop doing if you had that?

P01: I would stop re-reading transcripts at midnight before readouts. That is my current verification method. Me, at midnight, with search.`,
  },
  {
    id: "P02",
    name: "Sample: Senior researcher, agency",
    content: `Interviewer: How does AI show up in your analysis work?

P02: Carefully. I use it for transcription and to find passages, but I do not trust it with interpretation. My clients pay for defensible findings. If I cannot trace a theme back to real quotes from named participants, I cannot put it in a report.

Interviewer: Your colleagues feel the same way?

P02: No, and that is a tension in our studio. The younger researchers run everything through AI and ship the summary. I have caught themes in their reports that no participant actually expressed. Plausible, well written, and invented. When I flag it, the answer is that the deadline was yesterday. They are not wrong about the deadline.

Interviewer: So what happens when a big study lands?

P02: The honest answer is the analysis gets squeezed. A twelve interview study should get a week of analysis. It gets two days, because fieldwork ran over and the readout date never moves. Something has to give, and it is always the rigor. If I could hand the mechanical part to something I trusted, with quotes attached, and spend my two days on interpretation instead, that would change the job.

Interviewer: What would make you trust it?

P02: Named methods. Tell me it did thematic analysis the Braun and Clarke way, show me the codes, show me the quotes per theme with participant IDs. If it hides the working, it is a black box, and I have been burned by black boxes.`,
  },
];

export default function Analyze() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [pasteText, setPasteText] = useState("");
  const [pasteName, setPasteName] = useState("");
  const [methods, setMethods] = useState<string[]>(METHODS.map((m) => m.id));
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<"paste" | "upload">("paste");
  const fileRef = useRef<HTMLInputElement>(null);

  const addTranscript = useCallback(() => {
    if (!pasteText.trim()) return;
    const id = `P${String(transcripts.length + 1).padStart(2, "0")}`;
    setTranscripts((prev) => [
      ...prev,
      { id, name: pasteName.trim() || id, content: pasteText.trim() },
    ]);
    setPasteText("");
    setPasteName("");
  }, [pasteText, pasteName, transcripts.length]);

  function removeTranscript(id: string) {
    setTranscripts((prev) => prev.filter((t) => t.id !== id));
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target?.result as string;
        const id = `P${String(transcripts.length + idx + 1).padStart(2, "0")}`;
        setTranscripts((prev) => [
          ...prev,
          { id, name: file.name.replace(/\.[^.]+$/, ""), content },
        ]);
      };
      reader.readAsText(file);
    });
    if (fileRef.current) fileRef.current.value = "";
  }

  function toggleMethod(id: string) {
    setMethods((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  async function runAnalysis() {
    if (transcripts.length === 0 || methods.length === 0) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcripts: transcripts.map((t) => ({ id: t.id, name: t.name, content: t.content })),
          methods,
          context,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const totalWords = transcripts.reduce(
    (sum, t) => sum + t.content.split(/\s+/).length,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <p className="section-label mb-3">Interview Analyzer</p>
      <h1 className="text-3xl font-bold text-navy mb-2">Upload your transcripts</h1>
      <p className="text-gray mb-10">
        Paste or upload interview transcripts, choose your analysis methods, and get
        structured insights.
      </p>

      {/* Step 1: Transcripts */}
      <div className="bg-surface border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-navy font-sans">Step 1: Add Transcripts</h2>
          {transcripts.length > 0 && (
            <span className="text-xs text-gray-light">
              {transcripts.length} transcript{transcripts.length !== 1 && "s"} &middot;{" "}
              {totalWords.toLocaleString()} words
            </span>
          )}
        </div>

        {transcripts.length === 0 && (
          <button
            onClick={() => setTranscripts(SAMPLE_TRANSCRIPTS)}
            className="w-full mb-4 p-4 rounded-xl border border-accent/30 bg-accent-light/40 text-left hover:border-accent transition-colors"
          >
            <span className="text-sm font-semibold text-accent block">
              No transcripts handy? Load two sample interviews
            </span>
            <span className="text-xs text-gray block mt-1">
              Fictional interviews about AI in research work. Load them, hit Run Analysis,
              and watch all seven methods work in about a minute.
            </span>
          </button>
        )}

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setInputMode("paste")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              inputMode === "paste"
                ? "bg-accent-light text-accent border border-accent/20"
                : "border border-border text-gray hover:bg-lavender"
            }`}
          >
            Paste text
          </button>
          <button
            onClick={() => setInputMode("upload")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              inputMode === "upload"
                ? "bg-accent-light text-accent border border-accent/20"
                : "border border-border text-gray hover:bg-lavender"
            }`}
          >
            Upload files
          </button>
        </div>

        {inputMode === "paste" ? (
          <div>
            <input
              type="text"
              placeholder="Participant name (optional, e.g. P01, Maria, Senior Dev)"
              value={pasteName}
              onChange={(e) => setPasteName(e.target.value)}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-sm text-navy bg-surface placeholder:text-gray-light mb-3 outline-none focus:border-accent/40 transition-colors"
            />
            <textarea
              placeholder="Paste interview transcript here..."
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              rows={8}
              className="w-full border border-border rounded-lg px-4 py-3 text-sm text-navy bg-surface placeholder:text-gray-light mb-3 outline-none focus:border-accent/40 transition-colors resize-y font-mono"
            />
            <button
              onClick={addTranscript}
              disabled={!pasteText.trim()}
              className="bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-navy transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add Transcript
            </button>
          </div>
        ) : (
          <div>
            <input
              ref={fileRef}
              type="file"
              accept=".txt,.md,.text"
              multiple
              onChange={handleFiles}
              className="hidden"
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-xl py-10 text-center hover:border-accent/40 transition-colors cursor-pointer"
            >
              <span className="text-2xl block mb-2">📄</span>
              <span className="text-sm text-gray">Click to upload .txt or .md files</span>
              <span className="text-xs text-gray-light block mt-1">Multiple files supported</span>
            </button>
          </div>
        )}

        {transcripts.length > 0 && (
          <div className="mt-4 space-y-2">
            {transcripts.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between bg-lavender/30 rounded-lg px-4 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-accent bg-accent-light px-2 py-0.5 rounded">
                    {t.id}
                  </span>
                  <span className="text-sm text-navy font-medium">{t.name}</span>
                  <span className="text-xs text-gray-light">
                    {t.content.split(/\s+/).length.toLocaleString()} words
                  </span>
                </div>
                <button
                  onClick={() => removeTranscript(t.id)}
                  className="text-gray-light hover:text-red-500 transition-colors text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Step 2: Methods */}
      <div className="bg-surface border border-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-navy font-sans">Step 2: Choose Analysis Methods</h2>
          <button
            onClick={() =>
              setMethods(methods.length === METHODS.length ? [] : METHODS.map((m) => m.id))
            }
            className="text-xs text-accent hover:text-navy transition-colors"
          >
            {methods.length === METHODS.length ? "Deselect all" : "Select all"}
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {METHODS.map((m) => {
            const selected = methods.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => toggleMethod(m.id)}
                className={`text-left p-3 rounded-xl border transition-colors ${
                  selected
                    ? "border-accent bg-accent-light/50 text-accent"
                    : "border-border bg-surface text-gray hover:border-accent/30"
                }`}
              >
                <span className="text-lg block mb-1">{m.icon}</span>
                <span
                  className={`text-xs font-semibold block ${selected ? "text-accent" : "text-navy"}`}
                >
                  {m.name}
                </span>
                <span className="text-xs text-gray-light block mt-0.5">{m.source}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Context */}
      <div className="bg-surface border border-border rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-navy font-sans mb-3">
          Step 3: Research Context <span className="text-gray-light font-normal">(optional)</span>
        </h2>
        <textarea
          placeholder="What was the research question? Who are the participants? Any context that helps the analysis..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          rows={3}
          className="w-full border border-border rounded-lg px-4 py-3 text-sm text-navy bg-surface placeholder:text-gray-light outline-none focus:border-accent/40 transition-colors resize-y"
        />
      </div>

      <button
        onClick={runAnalysis}
        disabled={transcripts.length === 0 || methods.length === 0 || loading}
        className="w-full bg-accent text-white py-4 rounded-xl text-sm font-semibold hover:bg-navy transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-6"
      >
        {loading
          ? "Analyzing transcripts..."
          : `Run Analysis: ${methods.length} method${methods.length !== 1 ? "s" : ""} on ${transcripts.length} transcript${transcripts.length !== 1 ? "s" : ""}`}
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
            Running {methods.length} analysis methods across {transcripts.length} transcripts...
          </p>
          <p className="text-xs text-gray-light mt-1">This usually takes 30-60 seconds</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-700">
            The analysis did not complete. {error} Try again with fewer transcripts, or
            email me if it keeps failing.
          </p>
        </div>
      )}

      {results && <ResultsView results={results} />}

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
  function exportJson() {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "research-sprint-results.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy">Analysis Results</h2>
        <button
          onClick={exportJson}
          className="border border-border text-navy px-4 py-2 rounded-lg text-sm font-medium hover:bg-lavender transition-colors"
        >
          Export JSON
        </button>
      </div>

      {results.thematic && (
        <Section id="thematic">
          <div className="space-y-4">
            {results.thematic.themes.map((theme, i) => (
              <div key={i} className="bg-lavender/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-navy font-sans">{theme.name}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      theme.confidence === "High"
                        ? "bg-emerald-100 text-emerald-700"
                        : theme.confidence === "Medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {theme.confidence}
                  </span>
                </div>
                <p className="text-sm text-gray mb-3">{theme.description}</p>
                {theme.quotes.map((q, j) => (
                  <div key={j} className="border-l-2 border-accent/30 pl-3 mb-2">
                    <p className="text-sm text-navy italic">&ldquo;{q.quote}&rdquo;</p>
                    <p className="text-xs text-accent font-medium mt-0.5">{q.participant}</p>
                  </div>
                ))}
              </div>
            ))}
            {results.thematic.biasFlags && results.thematic.biasFlags.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-amber-700 mb-1">Bias Flags</p>
                {results.thematic.biasFlags.map((flag, i) => (
                  <p key={i} className="text-xs text-amber-600">
                    {flag}
                  </p>
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {results.affinity && (
        <Section id="affinity">
          <div className="grid md:grid-cols-2 gap-3">
            {results.affinity.clusters.map((c, i) => (
              <div key={i} className="bg-lavender/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-navy font-sans mb-2">{c.cluster}</h4>
                <ul className="space-y-1">
                  {c.insights.map((insight, j) => (
                    <li key={j} className="text-sm text-gray flex gap-2">
                      <span className="text-accent">&middot;</span>
                      {insight}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-light mt-2">
                  Participants: {c.participants.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {results.jtbd && (
        <Section id="jtbd">
          <div className="space-y-4">
            {results.jtbd.jobs.map((job, i) => (
              <div key={i} className="bg-lavender/30 rounded-lg p-4">
                <p className="text-sm text-navy mb-3">
                  <span className="font-semibold">When</span> {job.situation},{" "}
                  <span className="font-semibold">I want to</span> {job.motivation},{" "}
                  <span className="font-semibold">so I can</span> {job.outcome}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(job.forces).map(([force, text]) => (
                    <div key={force} className="bg-surface rounded-lg p-2.5">
                      <span
                        className={`text-xs font-semibold block mb-0.5 ${
                          force === "push"
                            ? "text-red-600"
                            : force === "pull"
                            ? "text-emerald-600"
                            : force === "anxiety"
                            ? "text-amber-600"
                            : "text-gray"
                        }`}
                      >
                        {force === "push"
                          ? "Push ↗"
                          : force === "pull"
                          ? "Pull ↙"
                          : force === "anxiety"
                          ? "Anxiety ⚠"
                          : "Habit ⟳"}
                      </span>
                      <p className="text-xs text-gray">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {results.quotes && (
        <Section id="quotes">
          <div className="space-y-3">
            {results.quotes.quotes.map((q, i) => (
              <div key={i} className="border-l-2 border-accent/30 pl-4 py-1">
                <p className="text-sm text-navy italic">&ldquo;{q.quote}&rdquo;</p>
                <div className="flex gap-3 mt-1">
                  <span className="text-xs text-accent font-medium">{q.participant}</span>
                  <span className="text-xs text-gray-light bg-tag-bg px-2 py-0.5 rounded">
                    {q.theme}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      q.sentiment === "positive"
                        ? "bg-emerald-50 text-emerald-600"
                        : q.sentiment === "negative"
                        ? "bg-red-50 text-red-600"
                        : "bg-gray-100 text-gray"
                    }`}
                  >
                    {q.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {results.contradictions && (
        <Section id="contradictions">
          <div className="space-y-4">
            {results.contradictions.contradictions.map((c, i) => (
              <div key={i} className="bg-lavender/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-navy font-sans mb-2">{c.topic}</h4>
                {c.positions.map((p, j) => (
                  <div key={j} className="flex gap-2 text-sm mb-1">
                    <span className="text-accent font-medium shrink-0">{p.participant}:</span>
                    <span className="text-gray">{p.position}</span>
                  </div>
                ))}
                <p className="text-xs text-amber-600 mt-2 bg-amber-50 rounded px-2 py-1">
                  Implication: {c.implication}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {results.patterns && (
        <Section id="patterns">
          <div className="space-y-3">
            {results.patterns.patterns.map((p, i) => (
              <div key={i} className="bg-lavender/30 rounded-lg p-4 flex gap-4">
                <span className="text-2xl font-bold text-accent/30 font-serif shrink-0">
                  {p.frequency}x
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-navy font-sans">{p.pattern}</h4>
                  <p className="text-sm text-gray mt-1">{p.evidence}</p>
                  <p className="text-xs text-gray-light mt-1">{p.participants.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {results.gaps && (
        <Section id="gaps">
          <div className="space-y-3">
            {results.gaps.gaps.map((g, i) => (
              <div key={i} className="flex items-start gap-3 bg-lavender/30 rounded-lg p-4">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 mt-0.5 ${
                    g.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : g.priority === "Medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray"
                  }`}
                >
                  {g.priority}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-navy font-sans">{g.area}</h4>
                  <p className="text-sm text-gray mt-0.5">{g.question}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  const meta = METHOD_META[id];
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="border-b border-border px-6 py-4 flex items-center gap-3">
        <span className="text-xl">{meta.icon}</span>
        <h3 className="text-sm font-semibold text-navy font-sans">{meta.name}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
