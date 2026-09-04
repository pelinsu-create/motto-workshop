import type { Metadata } from "next";
import { CaseHero, Block, Findings, Outcomes, NextCase, Figure, Gallery } from "../case-shell";

export const metadata: Metadata = {
  title: "LIZ Smart Office | Pelinsu Pelit",
  description:
    "Simplifying hybrid working. Booker app usability, an admin insights page built from scratch, and a Teams web app using the Microsoft component library.",
};

export default function LizSmartOffice() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <CaseHero
        tags="Product Design · Usability · Enterprise SaaS"
        title="Simplifying Hybrid Working"
        standfirst="Reserve a desk, see who is in, and decide how much office you actually need. Workspace management for teams that stopped coming in five days a week."
        meta={[
          { label: "Year", value: "2021 to 2022" },
          { label: "Role", value: "UX/UI Designer" },
          { label: "Context", value: "LIZ Smart Office, workspace management SaaS" },
          { label: "Surfaces", value: "Booker mobile app, admin web, Microsoft Teams app" },
          { label: "Methods", value: "Customer feedback analysis, usability fixes, iterative prototyping" },
          { label: "Status", value: "Shipped" },
        ]}
      />

      <Block heading="Companies were paying for floors nobody sat on">
        <p>
          LIZ lets people reserve a desk or workspace, see real-time occupancy, and pull
          reports on how space is used. Companies were paying for floors nobody sat on,
          and had no evidence either way.
        </p>
      </Block>

      <Block heading="What I worked on">
        <p>
          I worked on three parts of the product. I redesigned the workspace manager
          setup flow and insights page based on customer feedback, fixed usability issues
          in the Booker mobile app, and designed the Teams web app using the Microsoft
          component library.
        </p>
      </Block>

      <Block heading="Booker app: simplifying the date picker">
        <p>
          The Booker app is where an employee books a desk, and it was where people fell
          out of the flow. I focused on two components: the date picker and the tab bar.
        </p>
        <p>
          The date picker was the worst offender. Choosing a date and time took more
          steps than it needed, so I cut them and made selection direct.
        </p>
        <p>
          The tab bar was overloaded. I prioritised the core features and reduced the
          clutter around them.
        </p>
      </Block>

      <Block heading="Admin insights: built from scratch">
        <p>
          Working with the product manager, I designed an insights page for admins that
          did not exist before.
        </p>
        <Findings
          items={[
            {
              title: "Bookings in advance versus real time",
              body: "Two very different behaviours that were previously invisible. Planning ahead and grabbing a desk on arrival need different amounts of space held back.",
            },
            {
              title: "No-shows",
              body: "How many employees reserved a desk and did not turn up. This is the number that changes how much space a company thinks it needs.",
            },
            {
              title: "Summary first, detail underneath",
              body: "The most important figures sit at the top, so an admin can see the state of the building at a glance.",
            },
          ]}
        />
        <Figure
          src="/work/liz-insights.webp"
          alt="LIZ Smart Office admin booking insights dashboard"
          caption="Booking insights. Behaviour, ratios and availability, with the summary figures reading first."
          priority
        />
      </Block>

      <Block heading="Teams app">
        <p>
          The Teams app had to look and feel like Teams. I designed it with the
          Microsoft component library so it feels native inside the client.
        </p>
        <Gallery
          items={[
            {
              src: "/work/liz-teams-home.webp",
              alt: "LIZ Smart Office Teams app home screen with bookings and quick actions",
              caption: "Home. Current bookings, then the six things people do most.",
            },
            {
              src: "/work/liz-teams-bookings.jpg",
              alt: "LIZ Smart Office Teams app weekly bookings view",
              caption: "The week ahead, including home office and travel days.",
            },
            {
              src: "/work/liz-teams-floorplan.jpg",
              alt: "LIZ Smart Office Teams app interactive floor plan",
              caption: "Floor plan. Availability read spatially rather than as a list.",
            },
          ]}
        />
      </Block>

      <Block heading="Outcomes">
        <Outcomes
          items={[
            "Booking flow simplified: fewer steps between opening the app and holding a desk",
            "Admin insights page shipped from scratch, giving space decisions an evidence base for the first time",
            "Teams app delivered on the Microsoft component library, native to the client it lives in",
            "Stakeholder expectations aligned through iterative prototyping sessions",
          ]}
        />
      </Block>

      <NextCase href="/work/stakeholder-map" title="87 stakeholders, three company types, one map" />
    </div>
  );
}
