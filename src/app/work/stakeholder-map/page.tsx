import type { Metadata } from "next";
import { CaseHero, Block, Pull, Steps, Findings, Outcomes, NextCase, Figure, LiveEmbed } from "../case-shell";

export const metadata: Metadata = {
  title: "Who Uses What, and Why It Varies | Pelinsu Pelit",
  description:
    "Comparative stakeholder mapping for a renewable energy SaaS client. 87 stakeholders across three company types.",
};

export default function StakeholderMap() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <CaseHero
        tags="Stakeholder Research · Systems Mapping · Sector Analysis"
        title="Who Uses What, and Why It Varies"
        standfirst="Turning sector reports into interactive maps that show who uses what, and why it looks different at every company."
        meta={[
          { label: "Year", value: "2025 to 2026" },
          { label: "Role", value: "UX Researcher" },
          { label: "Context", value: "Client, renewable energy SaaS company" },
          { label: "Methods", value: "Desk research, stakeholder mapping, comparative analysis" },
          { label: "Sources", value: "Gartner 2025 energy software report, three vendor case study libraries" },
          { label: "Status", value: "Delivered, phase two in progress" },
        ]}
      />

      <Block heading="The Challenge">
        <p>
          The client builds monitoring and prediction tools for renewable energy companies.
          The question was not what the product does. It was who actually uses it, and why
          that changes so much from company to company.
        </p>
        <p>
          A large power company with 30 plants across five countries has a very different
          actor landscape than a 14-plant independent producer, or a pension fund with a
          remote portfolio. Same sector. Different systems, roles, tools and tensions.
        </p>
        <Pull>Same tools, different hands.</Pull>
      </Block>

      <Block heading="The Approach">
        <Steps
          items={[
            {
              title: "Read the sector",
              body: "Extracted actor and tool data from Gartner's 2025 industry report on energy management software, and from three vendor case study libraries.",
            },
            {
              title: "Classify company types",
              body: "Gartner defines three buyer types: large power company, independent producer, and investment fund. Each runs differently and involves different people.",
            },
            {
              title: "Start from humans",
              body: "Mapped actors by role first, not by system or process. Who is in the room? What do they need to see? What do they hand off, and to whom?",
            },
            {
              title: "Make it interactive",
              body: "Built an interactive map showing each company type side by side: who is involved, what tools they use, and where the tensions are.",
            },
          ]}
        />
      </Block>

      <Block heading="The Map">
        <p>
          The map itself, live. Switch between the three company profiles to see how the
          same sector produces three different actor landscapes.
        </p>
        <LiveEmbed
          src="/work/stakeholder-map.html"
          title="Comparative stakeholder map, three renewable energy company types"
          caption="Interactive map. 87 stakeholders across three company profiles, with tools and tension flags."
          height={680}
        />
        <Figure
          src="/work/sm-ipp-overview.jpg"
          alt="Interactive stakeholder map, independent power producer profile overview"
          caption="Independent power producer profile: actors, tools and handoffs on one screen"
        />
        <Figure
          src="/work/sm-ipp-detail.jpg"
          alt="Interactive stakeholder map, integrated utility view"
          caption="Integrated utility view. Same sector, a completely different actor landscape"
        />
      </Block>

      <Block heading="Key Findings">
        <Findings
          items={[
            {
              title: "Size and structure change who holds the tools",
              body: "A large power company runs a 24/7 central control room with cybersecurity specialists, regional dashboards and full software integration. A mid-size independent producer often has one technical engineer doing the work of three roles. There are not just fewer people. The whole way they work together is different.",
            },
            {
              title: "The same tool sits in different hands",
              body: "Performance dashboards, maintenance scheduling and forecasting appear across all three company types, but who owns them, who reads them and who acts on them varies completely. A feature that serves an asset manager in a large utility may need to serve a director directly in a fund.",
            },
            {
              title: "Tensions are structural, not accidental",
              body: "Equipment manufacturers often overstate availability figures, a known tension in the sector. Field technicians work offline while control rooms depend on real-time data. These are not edge cases. They are built into how the sector operates.",
            },
          ]}
        />
      </Block>

      <Block heading="Outcomes">
        <Outcomes
          items={[
            "Interactive map comparing three company types, with people layers, tool annotations and tension flags",
            "87 stakeholders mapped across all profiles, each with role, tools and data source",
            "Used by the client to decide which roles and relationships the product should support first",
          ]}
        />
      </Block>

      <Block heading="Reflection">
        <p>
          Starting from humans, not from systems or features, changed what became visible.
          The data-flow diagrams in vendor materials hid the people doing the work. When I
          mapped by role first, tensions appeared that no architecture diagram would show:
          the field technician working offline while the control room depends on real-time
          data, the asset manager challenging manufacturer figures with no neutral tool to
          settle the dispute.
        </p>
        <p>
          I would push the interactive layer further. The map shows how each company type is
          set up. It does not yet show what breaks between them.
        </p>
      </Block>

      <NextCase href="/work/soft-start" title="Soft Start, Sharp Focus" />
    </div>
  );
}
