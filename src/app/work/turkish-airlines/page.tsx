import type { Metadata } from "next";
import { CaseHero, Block, Pull, Findings, Outcomes, NextCase, Figure } from "../case-shell";

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
        standfirst="Freight forwarders do not browse. They are mid-shipment, on a deadline, working out what a warehouse will charge them and whether the cargo fits on the plane."
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
          Consumer products compete for attention. Logistics products compete with the
          workaround. If a screen is slow or ambiguous, a forwarder does not churn. They
          phone someone, or open a spreadsheet beside it, and stop trusting the tool. The
          failure is quiet and it does not appear in adoption numbers.
        </p>
        <p>
          That changes what research is for. The question is rarely whether someone likes
          the product. It is where they have already routed around it, and why.
        </p>
        <Pull>Nobody chooses a freight tool. They only decide whether to trust it.</Pull>
      </Block>

      <Block heading="Terminal Charges: Money, Owed by Whom, and When">
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
              title: "The summary is the answer, the accordion is the evidence",
              body: "The fee summary carries the number the user came for. Fee details underneath let them defend it to a client or an accounts team.",
            },
            {
              title: "Say plainly when a figure is not binding",
              body: "Terminal charges vary by date, time and exchange rate. The interface states that the amounts are informational rather than official, because a number that looks authoritative and later changes is worse than one that never claimed to be final.",
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
          Turkish Cargo has an established design system in active use across teams.
          Designing inside one is a different job from designing without one, and the
          constraint is the point. Consistency is what makes an unfamiliar screen legible
          to someone opening it under time pressure.
        </p>
        <p>
          The work was to improve these products without quietly forking the system, which
          is the usual cost of moving fast in a large organisation.
        </p>
      </Block>

      <Block heading="Bringing AI Into the Practice">
        <p>
          The second thread was integrating AI-assisted design practice into that system.
          The interesting constraint: a design system is a set of agreements, and
          generative tools are very good at producing plausible output that ignores
          agreements.
        </p>
        <Findings
          items={[
            {
              title: "AI accelerates what is already decided",
              body: "Where the system has settled a pattern, generation is fast and safe, because the correct answer is documented and checkable.",
            },
            {
              title: "It is least reliable where the system is silent",
              body: "Novel flows are exactly where output looks most convincing and is least anchored. Those needed more review, not less.",
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

      <NextCase href="/work/soft-start" title="The strategy was fine. The room was not ready for it." />
    </div>
  );
}
