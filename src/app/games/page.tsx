"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Hallucination Hunter: curated rounds, no API. The fake claims are  */
/* fabricated on purpose; each verdict names the tell that catches it. */
/* ------------------------------------------------------------------ */

type Claim = {
  text: string;
  fake: boolean;
  verdict: string;
};

const ROUNDS: { title: string; claims: Claim[] }[] = [
  {
    title: "Round 1: Product and UX claims",
    claims: [
      {
        text: "Nielsen Norman Group research shows users often leave a web page within 10 to 20 seconds.",
        fake: false,
        verdict:
          "Real. Documented NN/g finding. Checkable in one search, which is what makes it safe to cite.",
      },
      {
        text: "A 2026 Stanford study of 50,000 designers across 30 countries found 78.3% now start every project with AI.",
        fake: true,
        verdict:
          "Fabricated. Two tells at once: the oddly precise 78.3% with no methodological reason, and a sample too broad to be real. Percentage Tell plus Scope Tell.",
      },
      {
        text: "Google research found more than half of mobile visits are abandoned when a page takes over 3 seconds to load.",
        fake: false,
        verdict: "Real. Published by Google in 2016. Old, but genuine, and still widely cited.",
      },
      {
        text: "Microsoft's latest Work Trend Index found that exactly 91.4% of Dutch teams have abandoned daily standups.",
        fake: true,
        verdict:
          "Fabricated. The report is real, this finding is not. A suspiciously precise percentage saying exactly what a slide needs is the Convenience Tell.",
      },
    ],
  },
  {
    title: "Round 2: Research and AI claims",
    claims: [
      {
        text: "A meta-analysis published last month, covering 40 years of remote work data, proves hybrid teams are 34.7% more creative.",
        fake: true,
        verdict:
          "Fabricated. An impossibly fresh study about long-term trends is the Timeline Tell, and single-study proof of creativity does not exist.",
      },
      {
        text: "AI labs have published research showing language models can state false claims fluently and with high confidence.",
        fake: false,
        verdict:
          "Real. Hallucination is documented by the labs themselves. It is the reason this game exists.",
      },
      {
        text: "The EU AI Act requires every company to appoint a certified AI Literacy Officer from 2025.",
        fake: true,
        verdict:
          "Fabricated, and dangerously plausible. Article 4 does require AI literacy measures, but it mandates no role, no officer, and no certification. Distorted versions of real rules are the hardest fakes to catch.",
      },
      {
        text: "Turkey's statistics institute reported annual inflation above 30 percent in mid 2026.",
        fake: false,
        verdict: "Real. TUIK reported 31.75% for July 2026. Surprising numbers are not automatically fake.",
      },
    ],
  },
];

function HallucinationHunter() {
  const [round, setRound] = useState(0);
  const [picks, setPicks] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState(false);

  const claims = ROUNDS[round].claims;
  const score = claims.reduce(
    (n, c, i) => n + ((picks[i] ?? false) === c.fake ? 1 : 0),
    0
  );

  const reset = (r: number) => {
    setRound(r);
    setPicks({});
    setRevealed(false);
  };

  return (
    <div>
      <p className="text-gray leading-relaxed mb-6">
        Four claims. Mark the ones you think are fabricated, then check your answers.
        Each verdict names the tell that gives it away.
      </p>
      <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">
        {ROUNDS[round].title}
      </p>
      <div className="space-y-3 mb-6">
        {claims.map((claim, i) => {
          const picked = picks[i] ?? false;
          const correct = picked === claim.fake;
          return (
            <div key={i}>
              <button
                onClick={() => !revealed && setPicks({ ...picks, [i]: !picked })}
                aria-pressed={picked}
                disabled={revealed}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  picked ? "border-accent bg-accent-light" : "border-border bg-surface"
                } ${revealed ? "cursor-default" : "cursor-pointer hover:border-accent"}`}
              >
                <span className="text-sm text-navy leading-relaxed">{claim.text}</span>
                {picked && !revealed && (
                  <span className="block text-xs text-accent font-semibold mt-2">
                    Marked as fabricated
                  </span>
                )}
              </button>
              {revealed && (
                <div
                  className={`mt-1 mx-1 p-3 rounded-lg text-sm leading-relaxed ${
                    correct ? "bg-accent-light text-navy" : "bg-tag-bg text-navy"
                  }`}
                >
                  <span className="font-semibold">
                    {claim.fake ? "Fabricated. " : "Real. "}
                    {correct ? "You had it right. " : "This one got you. "}
                  </span>
                  {claim.verdict}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
        >
          Check my answers
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-navy font-semibold">
            {score} of {claims.length} right.{" "}
            <span className="font-normal text-gray">
              Most people miss one or two. That is the point of the game.
            </span>
          </p>
          {round < ROUNDS.length - 1 ? (
            <button
              onClick={() => reset(round + 1)}
              className="border border-border text-navy px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-lavender transition-colors"
            >
              Next round
            </button>
          ) : (
            <button
              onClick={() => reset(0)}
              className="border border-border text-navy px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-lavender transition-colors"
            >
              Play again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bad Idea Bingo: nine AI-generated ideas, one gem, one trap.         */
/* ------------------------------------------------------------------ */

type BingoData = {
  ideas: { id: number; text: string }[];
  gemId: number;
  trapId: number;
  gemWhy: string;
  trapWhy: string;
};

function BadIdeaBingo() {
  const [challenge, setChallenge] = useState("");
  const [data, setData] = useState<BingoData | null>(null);
  const [pick, setPick] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const play = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    setPick(null);
    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game: "bingo", challenge }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "The round did not generate.");
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "The round did not generate. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-gray leading-relaxed mb-6">
        Describe a real challenge. You get nine solutions: one quietly good, one
        impressive-sounding trap, seven filler. Find the gem before you check.
      </p>
      <textarea
        value={challenge}
        onChange={(e) => setChallenge(e.target.value)}
        placeholder="e.g. Nobody reads our research reports after the readout meeting"
        rows={2}
        className="w-full p-4 rounded-xl border border-border bg-surface text-sm text-navy mb-4 focus:outline-none focus:border-accent"
      />
      <button
        onClick={play}
        disabled={loading || challenge.trim().length < 8}
        className="bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors disabled:opacity-50"
      >
        {loading ? "Dealing nine ideas..." : data ? "New round" : "Deal nine ideas"}
      </button>
      {error && (
        <p className="text-sm text-navy bg-tag-bg rounded-lg p-3 mt-4">
          {error} If it keeps failing, try a shorter description.
        </p>
      )}
      {data && (
        <div className="mt-6">
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {data.ideas.map((idea) => {
              const isGem = idea.id === data.gemId;
              const isTrap = idea.id === data.trapId;
              const chosen = pick === idea.id;
              return (
                <button
                  key={idea.id}
                  onClick={() => pick === null && setPick(idea.id)}
                  disabled={pick !== null}
                  className={`text-left p-4 rounded-xl border text-sm leading-relaxed transition-colors ${
                    pick === null
                      ? "border-border bg-surface hover:border-accent cursor-pointer"
                      : isGem
                      ? "border-accent bg-accent-light"
                      : isTrap
                      ? "border-navy bg-tag-bg"
                      : "border-border bg-surface opacity-60"
                  }`}
                >
                  <span className="text-navy">{idea.text}</span>
                  {pick !== null && isGem && (
                    <span className="block text-xs font-semibold text-accent mt-2">
                      The gem{chosen ? ", and you found it" : ""}
                    </span>
                  )}
                  {pick !== null && isTrap && (
                    <span className="block text-xs font-semibold text-navy mt-2">
                      The trap{chosen ? ", and it got you" : ""}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {pick !== null && (
            <div className="space-y-2 text-sm text-navy leading-relaxed">
              <p>
                <span className="font-semibold">Why the gem wins: </span>
                {data.gemWhy}
              </p>
              <p>
                <span className="font-semibold">How the trap fails: </span>
                {data.trapWhy}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hat Roulette: three stakeholder reactions to a real decision.       */
/* ------------------------------------------------------------------ */

type HatsData = {
  hats: { role: string; reaction: string; question: string }[];
};

function HatRoulette() {
  const [challenge, setChallenge] = useState("");
  const [data, setData] = useState<HatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const play = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game: "hats", challenge }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "The round did not generate.");
      setData(json);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "The round did not generate. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-gray leading-relaxed mb-6">
        Describe a decision your team is about to make. Three stakeholders react
        honestly, each with the one question your room cannot easily answer.
      </p>
      <textarea
        value={challenge}
        onChange={(e) => setChallenge(e.target.value)}
        placeholder="e.g. We want to replace our quarterly customer survey with AI analysis of support tickets"
        rows={2}
        className="w-full p-4 rounded-xl border border-border bg-surface text-sm text-navy mb-4 focus:outline-none focus:border-accent"
      />
      <button
        onClick={play}
        disabled={loading || challenge.trim().length < 8}
        className="bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors disabled:opacity-50"
      >
        {loading ? "Spinning three hats..." : data ? "Spin again" : "Spin three hats"}
      </button>
      {error && (
        <p className="text-sm text-navy bg-tag-bg rounded-lg p-3 mt-4">
          {error} If it keeps failing, try a shorter description.
        </p>
      )}
      {data && (
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {data.hats.map((hat, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-5">
              <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                {hat.role}
              </p>
              <p className="text-sm text-navy leading-relaxed mb-3">{hat.reaction}</p>
              <p className="text-sm text-gray leading-relaxed">
                <span className="font-semibold text-navy">Their question: </span>
                {hat.question}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

const GAMES = [
  {
    id: "hunter",
    name: "Hallucination Hunter",
    tag: "Verification",
    blurb: "Eight claims, some fabricated. Catch them before they catch you.",
  },
  {
    id: "bingo",
    name: "Bad Idea Bingo",
    tag: "Critique",
    blurb: "Nine solutions to your challenge. One gem, one trap. Find the gem.",
  },
  {
    id: "hats",
    name: "Hat Roulette",
    tag: "Perspective",
    blurb: "Three stakeholders react honestly to a decision you are about to make.",
  },
];

export default function Games() {
  const [active, setActive] = useState("hunter");

  return (
    <div className="max-w-3xl mx-auto px-6">
      <section className="py-20 md:py-28">
        <p className="section-label mb-4">Workshop Games</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-6">
          Games from the workshop
        </h1>
        <p className="text-lg text-gray max-w-2xl leading-relaxed">
          I built these for Motto Workshop sessions. They work on their own too.
          Bring a real challenge, play a round, no account needed.
        </p>
      </section>

      <div className="flex flex-wrap gap-3 mb-10">
        {GAMES.map((g) => (
          <button
            key={g.id}
            onClick={() => setActive(g.id)}
            aria-pressed={active === g.id}
            className={`text-left p-4 rounded-xl border flex-1 min-w-[200px] transition-colors cursor-pointer ${
              active === g.id
                ? "border-accent bg-accent-light"
                : "border-border bg-surface hover:border-accent"
            }`}
          >
            <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
              {g.tag}
            </p>
            <p className="text-navy font-semibold mb-1">{g.name}</p>
            <p className="text-xs text-gray leading-relaxed">{g.blurb}</p>
          </button>
        ))}
      </div>

      <section className="pb-16">
        {active === "hunter" && <HallucinationHunter />}
        {active === "bingo" && <BadIdeaBingo />}
        {active === "hats" && <HatRoulette />}
      </section>

      <section className="py-12 border-t border-border mb-16">
        <p className="text-gray leading-relaxed max-w-2xl">
          In the workshop we play these against your own project, with the arguing
          that makes them work.{" "}
          <a href="/workshop" className="text-accent font-medium hover:text-navy transition-colors">
            About the workshop
          </a>
        </p>
      </section>
    </div>
  );
}
