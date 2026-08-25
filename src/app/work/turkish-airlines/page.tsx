import type { Metadata } from "next";
import { CaseHero, Block, Findings, Outcomes, NextCase, Figure } from "../case-shell";

export const metadata: Metadata = {
  title: "Turkish Cargo | Pelinsu Pelit",
  description:
    "Air freight logistics products: terminal charges, warehouse fees and loadability checks. Designed inside an existing design system, with AI-assisted practice brought into the team.",
};

export default function TurkishAirlines() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <CaseHero
        tags="Product Design · Design Systems · Logistics"
        title="Designing logistics products people are paid to use"
        standfirst="Freight forwarders are mid-shipment, on a deadline, working out what a warehouse will charge them and whether the cargo fits on the plane."
        meta={[
          { label: "Year", value: "2025 to 2026" },
          { label: "Role", value: "Product Designer, contract" },
          { label: "Context", value: "Turkish Cargo, air freight" },
          { label: "Surfaces", value: "Terminal charges, warehouse fees, loadability check" },
          { label: "Constraint", value: "Existing design system, in active use" },
          { label: "Status", value: "Shipped" },
        ]}
      />

      <Block heading="The Difference With Internal Products">
        <p>
          Freight forwarders use these screens because it is their job. If a screen is
          slow or confusing they do not churn. They call someone, or keep a spreadsheet
          open next to the tool, and quietly stop trusting it. None of that shows up in
          adoption numbers, so I spent research time finding where people had already
          routed around the product.
        </p>
      </Block>

      <Block heading="Terminal Charges">
        <p>
          A single master air waybill can carry several house waybills, each with its own
          warehouse charges, each independently paid or unpaid. The user needs to answer
          one question fast: what do I owe right now, and on which shipment?
        </p>
        <Findings
          items={[
            {
              title: "Paid and unpaid have to be visible without opening anything",
              body: "Status sits on the collapsed row, so the total owed can be read down the list. Expanding a row is for checking the breakdown, not for discovering whether you owe.",
            },
            {
              title: "Summary first, breakdown underneath",
              body: "The fee summary carries the number the user came for. Fee details underneath let them defend it to a client or an accounts team.",
            },
            {
              title: "Say plainly when a figure is not binding",
              body: "Terminal charges vary by date, time and exchange rate. The interface states that the amounts are informational rather than official.",
            },
          ]}
        />
        <Figure
          src="/work/tk-terminal-charges.jpg"
          alt="Turkish Cargo terminal charges screen with warehouse fees expanded"
          caption="Terminal charges. Paid and unpaid states on the collapsed rows, breakdown on expand, running total held on the right."
          priority
        />
        <Figure
          src="/work/tk-warehouse-fees.jpg"
          alt="Turkish Cargo warehouse fees screen, single paid waybill"
          caption="The same screen with one settled waybill. The summary panel states what it needs before it can calculate rather than showing an empty zero."
        />
      </Block>

      <Block heading="Loadability: Will It Actually Fit">
        <p>
          A forwarder enters dimensions and weight and needs to know which flights can
          carry the shipment. The complication is that a route is not one decision. A
          journey through a hub is a road leg plus a flight leg, and cargo can be loadable
          on one and not the other.
        </p>
        <Findings
          items={[
            {
              title: "Loadability is per leg, not per route",
              body: "Each segment carries its own status, so a route that fails is legible: the user can see it is the truck leg rather than the aircraft, and go looking for a different first leg instead of abandoning the route.",
            },
            {
              title: "Say how much does not fit",
              body: "Not Loadable minus three pieces is actionable. Not Loadable alone sends someone back to the form to guess.",
            },
            {
              title: "Volumetric weight is calculated, never asked for",
              body: "Volume and volumetric weight derive from the dimensions as they are typed. Asking a user to compute what the system can compute is where data entry errors come from.",
            },
          ]}
        />
        <Figure
          src="/work/tk-loadability.jpg"
          alt="Turkish Cargo loadability check results, multi-leg flight list"
          caption="Loadability results. Per-leg status across a hub connection, with the shortfall stated in pieces."
        />
      </Block>

      <Block heading="Working Inside a Design System">
        <p>
          Turkish Cargo has an established design system in active use across teams. My
          job was to improve these products without forking it. Consistency is what makes
          an unfamiliar screen legible to someone opening it under time pressure.
        </p>
      </Block>

      <Block heading="Bringing AI Into the Practice">
        <p>
          The second thread was integrating AI-assisted design practice into that system.
          A design system is a set of agreements, and generative tools are good at
          producing plausible output that ignores them.
        </p>
        <Findings
          items={[
            {
              title: "AI accelerates what is already decided",
              body: "Where the system has settled a pattern, generation is fast and safe, because the correct answer is documented and checkable.",
            },
            {
              title: "It is least reliable where the system is silent",
              body: "Novel flows are where output looks convincing but has nothing to anchor it. Those needed more review.",
            },
            {
              title: "The system turned out to be the quality gate",
              body: "Without a documented set of components and rules there is no standard to hold generated work against. The design system is what made AI output checkable at all.",
            },
          ]}
        />
      </Block>

      <Block heading="What I Did">
        <Outcomes
          items={[
            "Designed terminal charges, warehouse fee and loadability flows against an existing, actively used design system",
            "Worked on logistics products and employee experience across the same product surface",
            "Integrated AI-assisted design practice into the team's existing way of working rather than alongside it",
          ]}
        />
      </Block>

      <NextCase href="/work/soft-start" title="Getting a room ready in the first twenty minutes" />
    </div>
  );
}
