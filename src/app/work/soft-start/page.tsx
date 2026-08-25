import type { Metadata } from "next";
import { CaseHero, Block, Findings, Outcomes, NextCase, Figure } from "../case-shell";

export const metadata: Metadata = {
  title: "Soft Start, Sharp Focus | Pelinsu Pelit",
  description:
    "Three AI-assisted exercises for the first twenty minutes of a strategic session. Designed, tested across three sessions, and kept as the standard opener.",
};

export default function SoftStart() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <CaseHero
        tags="Workshop Design · Facilitation Research · AI-Assisted Design"
        title="Soft Start, Sharp Focus"
        standfirst="Three short exercises that help a team actually settle into a session before the real agenda starts."
        meta={[
          { label: "Year", value: "2024" },
          { label: "Role", value: "Workshop designer, facilitator, researcher" },
          { label: "Context", value: "Mid-size technology company, product team" },
          { label: "Format", value: "Three exercises, first 20 minutes of a two-hour session" },
          { label: "Tools", value: "Digital toolkit, AI-generated prompts" },
          { label: "Status", value: "Adopted as the standard opener" },
        ]}
      />

      <Block heading="The Design Problem">
        <p>
          In years of facilitation work I kept seeing the same pattern. People arrived
          with the previous meeting still in their heads, unfinished tasks, unresolved
          tension, and the quality of the session suffered for it. Most teams know a
          proper check-in helps, but they skip it because there were no practical tools
          that fit in under twenty minutes.
        </p>
      </Block>

      <Block heading="The Toolkit">
        <p>
          Three short AI-assisted exercises for the first twenty minutes. Each works on
          something different: where people stand on the topic, what role they take, and
          what they might be missing.
        </p>
        <Findings
          items={[
            {
              title: "Planets",
              body: "Each person places themselves on a map relative to the topic. Shows where assumptions and distances are before discussion begins.",
            },
            {
              title: "Archetype Selector",
              body: "Each person picks a participation role for this session. Makes unspoken modes visible and open to discussion.",
            },
            {
              title: "Empathy Prompts",
              body: "AI-generated questions tailored to the session topic. Prompts people to think from a different angle before decisions are made.",
            },
          ]}
        />
        <Figure
          src="/work/ws-planets-full.jpg"
          alt="Planets exercise: theme selection and visual language voting"
          caption="Planets. Each person places themselves relative to the topic before anyone speaks."
          priority
        />
        <Figure
          src="/work/ws-archetype-full.jpg"
          alt="Archetype Selector: eight participant role types connected in a role map"
          caption="Archetype Selector. Eight roles, picked openly, so the mode people are in stops being a guess."
        />
      </Block>

      <Block heading="What Made It Work">
        <p>
          The first twenty minutes are for the group, before the agenda starts. People
          need a moment to arrive. AI writes the prompts, and the facilitator runs the
          room. That split worked well in all three sessions.
        </p>
      </Block>

      <Block heading="Tested and Refined">
        <p>
          Three sessions with a product team at a mid-size technology company in 2024.
          Timing was adjusted between sessions to keep the opener within twenty minutes.
          Planets was simplified after the first session. Empathy Prompts were reduced from
          five questions to three.
        </p>
        <p>
          After the demo, participants named six workshop risks: not enough time, conflicting
          priorities, low participation, no follow-up, going off-topic, and team tension.
          These shaped the final structure of the toolkit.
        </p>
      </Block>

      <Block heading="Outcomes">
        <Outcomes
          items={[
            "The three exercises became the standard opener for product team sessions, replacing unstructured check-ins",
            "Planets brought hidden assumptions to the surface early, reducing late-session debate",
            "Session outputs became working documents used by HR and project planning teams (contents confidential)",
          ]}
        />
      </Block>

      <Block heading="What Comes Next">
        <p>
          Next I want to explore what a shared room means when people work across
          distances and boundaries.
        </p>
      </Block>

      <NextCase href="/case-studies/fluffy-score" title="Fluffy Score" />
    </div>
  );
}
