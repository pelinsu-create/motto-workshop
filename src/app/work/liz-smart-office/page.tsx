import type { Metadata } from "next";
import { CaseHero, Block, Pull, Findings, Outcomes, NextCase, Figure, Gallery } from "../case-shell";

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

      <Block heading="The Product">
        <p>
          LIZ lets people reserve a desk or workspace, see real-time occupancy, and pull
          reports on how space is actually used. Hybrid working made the second and third
          of those the interesting part. Companies were paying for floors nobody sat on,
          and had no evidence either way.
        </p>
      </Block>

      <Block heading="My Responsibility">
        <p>
          Three surfaces, three different problems. I redesigned the workspace manager
          setup flow and insights page based on customer feedback, fixed usability issues
          in the Booker mobile app, and designed the Teams web app using the Microsoft
          component library.
        </p>
        <Pull>Same product, three rooms, three sets of rules.</Pull>
      </Block>

      <Block heading="Booker App: Simplifying the Date Picker">
        <p>
          The Booker app is where an employee books a desk, and it was where people fell
          out of the flow. I focused on two components: the date picker and the tab bar.
        </p>
        <p>
          The date picker was the worst offender. Choosing a date and time to book a space
          took more steps than it needed, and each extra step was somewhere to hesitate.
          The redesign made selection direct and removed the steps that were not carrying
          their weight.
        </p>
        <p>
          The tab bar was doing too much. I prioritised the core features so the things
          people actually came to do were reachable first, and reduced the clutter around
          them.
        </p>
      </Block>

      <Block heading="Admin Insights: Built From Scratch">
        <p>
          Working with the product manager, I designed an insights page for admins that did
          not exist before. The question it answers is a specific one: what is really
          happening with our space?
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
              body: "The most important figures sit at the top in a summary, so an admin can grasp the state of the building at a glance and go deeper only when something looks wrong.",
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

      <Block heading="Teams App">
        <p>
          The Teams app had a constraint the others did not: it had to look like Teams. I
          designed it with the Microsoft component library so it sat inside the client
          rather than beside it, which is what makes people actually use an embedded app.
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
            "Stakeholder expectations aligned through iterative prototyping sessions rather than sign-off documents",
          ]}
        />
      </Block>

      <NextCase href="/work/stakeholder-map" title="Who Uses What, and Why It Varies" />
    </div>
  );
}
