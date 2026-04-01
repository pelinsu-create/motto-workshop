"use client";

import { useState, useRef } from "react";

interface ActivityStep { step: number; title: string; duration: string; instruction: string; }
interface Opening { title: string; duration: string; instruction: string; }
interface Activity {
  title: string; subtitle: string; workshopType: string; duration: string; groupSize: string;
  format: string; energy: string; materials: string[]; overview: string;
  opening: Opening; steps: ActivityStep[]; closing: Opening;
  expectedOutputs: string[]; facilitationTips: string[];
  whatCanGoWrong: string[]; variations: string[]; cognitiveCheck: string; basedOn: string;
}

const MAX_FREE = 3;

const WORKSHOP_TYPES = [
  { id: "brainstorm", label: "Brainstorming", icon: "💡", desc: "Generate new ideas" },
  { id: "alignment", label: "Alignment", icon: "🎯", desc: "Get teams on same page" },
  { id: "discovery", label: "Discovery", icon: "🔍", desc: "Explore & research" },
  { id: "review", label: "Prototype Review", icon: "🧪", desc: "Evaluate solutions" },
  { id: "retro", label: "Retrospective", icon: "🔄", desc: "Reflect & improve" },
  { id: "codesign", label: "Co-Design", icon: "🤝", desc: "Build together" },
  { id: "strategy", label: "Strategy", icon: "♟️", desc: "Plan direction" },
  { id: "roadmap", label: "Roadmap", icon: "🗺️", desc: "Define next steps" },
];

const FOCUS_AREAS = [
  { id: "empathy", label: "Empathy & Personas", icon: "❤️" },
  { id: "cognitive", label: "Cognitive Forcing", icon: "🧠" },
  { id: "ideation", label: "Ideation & Divergence", icon: "✨" },
  { id: "decision", label: "Decision Making", icon: "⚖️" },
  { id: "ux-writing", label: "UX Writing", icon: "✍️" },
  { id: "playful", label: "Playful & Games", icon: "🎲" },
  { id: "prototyping", label: "Prototyping", icon: "📐" },
  { id: "storytelling", label: "Storytelling", icon: "📖" },
];

const FORMATS = [
  { id: "in-person", label: "In-person", icon: "🏢" },
  { id: "remote", label: "Remote", icon: "💻" },
  { id: "hybrid", label: "Hybrid", icon: "🔀" },
];

const ENERGIES = [
  { id: "low", label: "Low energy", icon: "🌙" },
  { id: "medium", label: "Medium", icon: "☀️" },
  { id: "high", label: "High energy", icon: "⚡" },
];

export default function Lab() {
  const [step, setStep] = useState(0);
  const [workshopType, setWorkshopType] = useState("");
  const [goal, setGoal] = useState("");
  const [participants, setParticipants] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [duration, setDuration] = useState("");
  const [format, setFormat] = useState("");
  const [energy, setEnergy] = useState("");
  const [focus, setFocus] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [error, setError] = useState("");
  const [streamText, setStreamText] = useState("");
  const [uses, setUses] = useState(() => {
    if (typeof window !== "undefined") return parseInt(localStorage.getItem("lab-uses") || "0");
    return 0;
  });
  const resultRef = useRef<HTMLDivElement>(null);
  const freeLeft = Math.max(0, MAX_FREE - uses);
  const hitPaywall = uses >= MAX_FREE;

  function toggleFocus(id: string) {
    setFocus(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }

  async function generate() {
    if (!goal.trim() || hitPaywall) return;
    setStep(4); setLoading(true); setError(""); setActivity(null); setStreamText("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: goal.trim(), workshopType, participants, groupSize, duration, format, energy, focus: focus.length > 0 ? focus : null }),
      });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      if (reader) { while (true) { const { done, value } = await reader.read(); if (done) break; fullText += decoder.decode(value, { stream: true }); setStreamText(fullText); } }
      const cleaned = fullText.replace(/```json\s*/g, "").replace(/```/g, "").trim();
      let depth = 0, start = -1; const objs: string[] = [];
      for (let i = 0; i < cleaned.length; i++) { if (cleaned[i] === "{") { if (depth === 0) start = i; depth++; } if (cleaned[i] === "}") { depth--; if (depth === 0 && start >= 0) { objs.push(cleaned.slice(start, i + 1)); start = -1; } } }
      const parsed = JSON.parse(objs[0] || "{}") as Activity;
      if (!parsed.title) throw new Error("Invalid");
      setActivity(parsed); setStep(5);
      const n = uses + 1; setUses(n); localStorage.setItem("lab-uses", String(n));
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) { console.error("Generation error:", err); setError("Generation failed — please try again. If it keeps failing, try a shorter goal description."); setStep(3); }
    finally { setLoading(false); setStreamText(""); }
  }

  function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
      <button onClick={onClick} className={`px-4 py-2.5 rounded-lg border text-sm transition-all cursor-pointer ${selected ? "border-accent bg-accent-light text-accent font-semibold" : "border-border bg-surface text-gray hover:border-accent/40"}`}>
        {children}
      </button>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6">

      {/* Step 0: Landing */}
      {step === 0 && (
        <section className="py-24 md:py-32 text-center">
          <p className="section-label mb-4">AI Collaboration Lab</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-4">
            Design your workshop activity<br className="hidden md:block" /> in 60 seconds.
          </h1>
          <p className="text-base text-gray max-w-xl mx-auto leading-relaxed mb-8">
            Answer a few questions about your session. AI generates a complete activity with steps, timing, materials, facilitation tips, and cognitive checks &mdash; built on 50+ proven methods.
          </p>

          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            {[
              { num: "50+", label: "Methods", sub: "Co-design, UX, cognitive forcing" },
              { num: "60s", label: "Generation", sub: "Complete activity ready to run" },
              { num: "€0", label: "To start", sub: `${freeLeft} free generations` },
            ].map((s, i) => (
              <div key={i} className="bg-surface rounded-xl border border-border px-6 py-4 text-center w-40">
                <div className="text-2xl font-bold text-accent">{s.num}</div>
                <div className="text-xs font-semibold text-navy mt-1">{s.label}</div>
                <div className="text-xs text-gray-light mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setStep(1)} className="bg-accent text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-navy transition-colors cursor-pointer">
            Start Designing →
          </button>

          <div className="mt-12 text-sm text-gray-light">
            <span className="font-medium text-gray">Two ways we work:</span>
            <div className="flex justify-center gap-8 mt-3">
              <div><a href="/" className="text-accent hover:text-navy transition-colors">In-person Workshop</a><br /><span className="text-xs">6-hour facilitated session</span></div>
              <div><span className="text-accent font-medium">AI Lab</span> (you are here)<br /><span className="text-xs">Self-service activity generator</span></div>
            </div>
          </div>
        </section>
      )}

      {/* Step 1: Workshop Type */}
      {step === 1 && (
        <section className="py-16">
          <p className="text-xs text-gray-light mb-2">Step 1 of 3</p>
          <h2 className="text-2xl md:text-3xl text-navy mb-2">What type of workshop?</h2>
          <p className="text-sm text-gray mb-6">Select the one that best describes your session.</p>
          <div className="grid grid-cols-2 gap-3">
            {WORKSHOP_TYPES.map(t => (
              <button key={t.id} onClick={() => { setWorkshopType(t.id); setStep(2); }}
                className="bg-surface border border-border rounded-xl p-5 text-left cursor-pointer hover:border-accent/40 transition-colors">
                <div className="text-xl mb-1">{t.icon}</div>
                <div className="text-sm font-semibold text-navy">{t.label}</div>
                <div className="text-xs text-gray-light mt-1">{t.desc}</div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Step 2: Goal + Participants */}
      {step === 2 && (
        <section className="py-16">
          <p className="text-xs text-gray-light mb-2">Step 2 of 3</p>
          <h2 className="text-2xl md:text-3xl text-navy mb-6">Tell us more</h2>

          <label className="section-label block mb-2">What&apos;s the workshop goal? *</label>
          <textarea value={goal} onChange={e => setGoal(e.target.value)}
            placeholder="e.g., Align product and engineering on Q2 priorities after conflicting roadmap feedback..."
            rows={3} className="w-full p-3 rounded-lg border border-border bg-surface text-foreground text-sm font-sans resize-y outline-none focus:border-accent/50 mb-5 leading-relaxed" />

          <label className="section-label block mb-2">Who&apos;s participating?</label>
          <input value={participants} onChange={e => setParticipants(e.target.value)}
            placeholder="e.g., Product managers, engineers, designers, 1 VP"
            className="w-full p-3 rounded-lg border border-border bg-surface text-foreground text-sm font-sans outline-none focus:border-accent/50 mb-6" />

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-5 py-2.5 rounded-lg border border-border text-gray text-sm cursor-pointer hover:border-accent/40 transition-colors">← Back</button>
            <button onClick={() => { if (goal.trim()) setStep(3); }}
              className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${goal.trim() ? "bg-accent text-white hover:bg-navy" : "bg-border text-gray-light cursor-default"}`}>
              Next →
            </button>
          </div>
        </section>
      )}

      {/* Step 3: Constraints + Focus */}
      {step === 3 && (
        <section className="py-16">
          <p className="text-xs text-gray-light mb-2">Step 3 of 3</p>
          <h2 className="text-2xl md:text-3xl text-navy mb-6">Fine-tune your activity</h2>

          <label className="section-label block mb-2">Group size</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {["3-5", "6-10", "11-20", "20+"].map(s => (
              <Chip key={s} selected={groupSize === s} onClick={() => setGroupSize(s)}>{s} people</Chip>
            ))}
          </div>

          <label className="section-label block mb-2">Duration</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {["15 min", "30 min", "45 min", "60 min", "90 min", "120 min"].map(d => (
              <Chip key={d} selected={duration === d} onClick={() => setDuration(d)}>{d}</Chip>
            ))}
          </div>

          <label className="section-label block mb-2">Format</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {FORMATS.map(f => (
              <Chip key={f.id} selected={format === f.id} onClick={() => setFormat(f.id)}>{f.icon} {f.label}</Chip>
            ))}
          </div>

          <label className="section-label block mb-2">Energy level</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {ENERGIES.map(e => (
              <Chip key={e.id} selected={energy === e.id} onClick={() => setEnergy(e.id)}>{e.icon} {e.label}</Chip>
            ))}
          </div>

          <label className="section-label block mb-2">Focus areas <span className="font-normal normal-case text-gray-light">(select multiple)</span></label>
          <div className="flex flex-wrap gap-2 mb-8">
            {FOCUS_AREAS.map(f => (
              <Chip key={f.id} selected={focus.includes(f.id)} onClick={() => toggleFocus(f.id)}>{f.icon} {f.label}</Chip>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-5 py-2.5 rounded-lg border border-border text-gray text-sm cursor-pointer hover:border-accent/40 transition-colors">← Back</button>
            {hitPaywall ? (
              <div className="flex-1 text-center">
                <p className="text-accent font-semibold text-sm mb-2">You&apos;ve used your 3 free generations</p>
                <a href="https://buy.stripe.com/test_placeholder" className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-navy transition-colors">Get More — €5 per activity</a>
              </div>
            ) : (
              <button onClick={generate} className="flex-1 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-navy transition-colors cursor-pointer">
                Generate Activity ({freeLeft} free left)
              </button>
            )}
          </div>
        </section>
      )}

      {/* Step 4: Generating */}
      {step === 4 && (
        <section className="py-32 text-center">
          <div className="flex justify-center gap-2 mb-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <p className="text-sm text-gray mb-1">Designing your activity...</p>
          <p className="text-xs text-gray-light">Drawing from 50+ facilitation methods</p>
          {streamText && (
            <div className="mt-6 bg-surface rounded-lg border border-border p-4 text-xs text-gray-light font-mono text-left max-h-28 overflow-hidden mx-auto max-w-lg">
              {streamText.slice(0, 200)}...
            </div>
          )}
        </section>
      )}

      {/* Step 5: Result */}
      {step === 5 && activity && (
        <section ref={resultRef} className="py-12 animate-[fadeUp_0.4s_ease]">
          {/* Header */}
          <div className="bg-surface rounded-2xl border-2 border-accent/20 p-6 mb-4">
            <p className="section-label mb-1">Generated Activity</p>
            <h2 className="text-2xl md:text-3xl text-navy mb-1">{activity.title}</h2>
            <p className="text-sm text-gray mb-4">{activity.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {[
                { l: activity.duration, i: "⏱" }, { l: activity.groupSize, i: "👥" },
                { l: activity.format, i: "📍" }, { l: `${activity.energy} energy`, i: "⚡" },
                { l: activity.workshopType, i: "🏷" },
              ].map((t, i) => (
                <span key={i} className="bg-tag-bg px-3 py-1 rounded-lg text-xs text-gray">{t.i} {t.l}</span>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="bg-surface rounded-xl border border-border p-5 mb-3">
            <p className="text-sm text-foreground leading-relaxed">{activity.overview}</p>
          </div>

          {/* Materials + Outputs */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {activity.materials?.length > 0 && (
              <div className="bg-surface rounded-xl border border-border p-4">
                <p className="section-label mb-2">🧰 Materials</p>
                {activity.materials.map((m, i) => <p key={i} className="text-xs text-gray leading-relaxed">• {m}</p>)}
              </div>
            )}
            {activity.expectedOutputs?.length > 0 && (
              <div className="bg-surface rounded-xl border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">📋 Expected Outputs</p>
                {activity.expectedOutputs.map((o, i) => <p key={i} className="text-xs text-gray leading-relaxed">• {o}</p>)}
              </div>
            )}
          </div>

          {/* Opening */}
          {activity.opening && (
            <div className="bg-accent-light rounded-xl border border-accent/20 p-4 mb-3">
              <div className="flex justify-between items-center mb-2">
                <p className="section-label">🌅 Opening: {activity.opening.title}</p>
                <span className="text-xs text-gray-light">{activity.opening.duration}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{activity.opening.instruction}</p>
            </div>
          )}

          {/* Steps */}
          <div className="bg-surface rounded-xl border border-border p-5 mb-3">
            <p className="section-label mb-4">📝 Steps</p>
            {activity.steps?.map((s, i) => (
              <div key={i} className={`flex gap-3 ${i < activity.steps.length - 1 ? "mb-4 pb-4 border-b border-border" : ""}`}>
                <div className="w-7 h-7 rounded-full bg-accent-light text-accent flex items-center justify-center text-xs font-bold shrink-0">{s.step}</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold text-navy">{s.title}</span>
                    <span className="text-xs text-gray-light">{s.duration}</span>
                  </div>
                  <p className="text-xs text-gray leading-relaxed">{s.instruction}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing */}
          {activity.closing && (
            <div className="bg-surface rounded-xl border border-green-200 p-4 mb-3">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-600">🌆 Closing: {activity.closing.title}</p>
                <span className="text-xs text-gray-light">{activity.closing.duration}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{activity.closing.instruction}</p>
            </div>
          )}

          {/* Tips + Risks */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-surface rounded-xl border border-border p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">💡 Facilitation Tips</p>
              {activity.facilitationTips?.map((t, i) => <p key={i} className="text-xs text-gray leading-relaxed mb-1">• {t}</p>)}
            </div>
            <div className="bg-surface rounded-xl border border-border p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">⚠️ What Can Go Wrong</p>
              {activity.whatCanGoWrong?.map((w, i) => <p key={i} className="text-xs text-gray leading-relaxed mb-1">• {w}</p>)}
            </div>
          </div>

          {/* Cognitive Check */}
          {activity.cognitiveCheck && (
            <div className="bg-lavender rounded-xl border border-accent/15 p-4 mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 mb-1">🧠 Cognitive Check</p>
              <p className="text-sm text-foreground leading-relaxed">{activity.cognitiveCheck}</p>
            </div>
          )}

          {/* Variations + Based On */}
          <div className="flex gap-3 mb-8">
            {activity.variations?.length > 0 && (
              <div className="flex-1 bg-surface rounded-xl border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 mb-2">🔄 Variations</p>
                {activity.variations.map((v, i) => <p key={i} className="text-xs text-gray leading-relaxed mb-1">• {v}</p>)}
              </div>
            )}
            <div className="bg-surface rounded-xl border border-border p-4 min-w-40">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-light mb-2">Based On</p>
              <p className="text-xs text-gray">{activity.basedOn}</p>
            </div>
          </div>

          {/* Actions */}
          <button onClick={() => { setActivity(null); setStep(1); setGoal(""); setWorkshopType(""); setFocus([]); }}
            className="w-full py-3 rounded-lg border border-border text-gray text-sm cursor-pointer hover:border-accent/40 transition-colors mb-8">
            Generate Another Activity ({freeLeft > 0 ? `${freeLeft - 1} free` : "€5"})
          </button>

          {/* Fake doors */}
          <div className="border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-light mb-3">Coming Soon</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Full Workshop Agenda (5 activities)", id: "agenda" },
                { label: "Download as PDF Card", id: "pdf" },
                { label: "Activity Pack: Remote Icebreakers — €15", id: "pack" },
                { label: "Share with Co-Facilitator", id: "share" },
              ].map(d => (
                <button key={d.id} onClick={() => {
                  const el = document.getElementById("wl");
                  if (el) { el.style.display = "block"; el.textContent = `"${d.label}" — noted!`; }
                }} className="bg-surface border border-border rounded-lg p-3 cursor-pointer text-left hover:border-accent/30 transition-colors">
                  <span className="text-xs font-semibold text-navy">{d.label}</span>
                </button>
              ))}
            </div>
            <p id="wl" className="hidden mt-3 text-xs text-accent text-center"></p>
          </div>
        </section>
      )}

      {error && <p className="mt-6 text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}
