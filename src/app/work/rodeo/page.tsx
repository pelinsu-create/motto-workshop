import type { Metadata } from "next";
import { CaseHero, Block, Steps, Findings, Outcomes, NextCase, Figure } from "../case-shell";

export const metadata: Metadata = {
  title: "Rodeo | Pelinsu Pelit",
  description:
    "Budget page redesign for a project management tool in Amsterdam. Heuristic evaluation, eight competitors, customer complaints and five prototype tests.",
};

export default function Rodeo() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <CaseHero
        tags="Product Design · UX Research · Data Tables"
        title="Pricing a project on one dense table"
        standfirst="Rodeo is bought to price project work correctly. Estimating and tracking both live on the budget page, which is what makes it dense, and the table had stopped being readable."
        meta={[
          { label: "Year", value: "2019 to 2020" },
          { label: "Role", value: "UX Designer and Researcher" },
          { label: "Context", value: "Rodeo, project management software, Amsterdam" },
          { label: "Surfaces", value: "Budget page, data table, project settings" },
          { label: "Methods", value: "Heuristic evaluation, eight competitors, customer complaints, five prototype tests" },
          { label: "Status", value: "Shipped" },
        ]}
      />

      <Block heading="Estimating and tracking sit on the same screen">
        <p>
          A project manager splits a project into phases or books activities separately,
          sets hours, an hourly rate and expenses on each activity, then watches deadlines
          and what is left of the budget while the work runs. Quoting the job and checking
          the job are the same table, read at two different moments.
        </p>
        <p>
          That is what makes the page hard. Every row has to carry a number someone will
          defend to a client, and the whole table has to stay scannable while it grows.
        </p>
        <Figure
          src="/work/rodeo-budget-before.jpg"
          alt="Rodeo budget page before the redesign, with phases, activities, suppliers and expanded rows"
          caption="The budget page as it was. Phases, activities, suppliers and expenses in one table, with rows that expand into more rows."
          priority
        />
      </Block>

      <Block heading="Four sources, so the problem list was not my opinion">
        <Steps
          items={[
            {
              title: "Heuristic evaluation",
              body: "Walked the budget flow against usability heuristics and wrote down every place the interface broke one, so the problems had a stated basis rather than a preference behind them.",
            },
            {
              title: "Comparative analysis, eight competitors",
              body: "Compared how other project management tools structure estimating, rates and expenses. Where the category had already settled a pattern, there was no reason to reinvent it here.",
            },
            {
              title: "Customer complaints",
              body: "Read what users had already reported, so the work started from problems people had bothered to write in about rather than from what was easiest to see.",
            },
            {
              title: "Prototype tests, five participants",
              body: "Tested the redesign on a prototype before it was built.",
            },
          ]}
        />
      </Block>

      <Block heading="The table was the problem, not the feature set">
        <p>
          Nothing was missing from the page. What was missing was hierarchy: four separate
          things made a table of numbers harder to read than the numbers themselves
          warranted.
        </p>
        <Findings
          items={[
            {
              title: "Navigation and sorting looked the same",
              body: "Nav tabs and sorting tabs sat on the same level with near identical styling, so two different kinds of control read as one row. Nothing told a user which one changed the page and which one changed the order.",
            },
            {
              title: "Parent rows and child rows were indistinguishable",
              body: "Expandable rows used the same border and background as the rows inside them. Once a row was open, the hierarchy the table depends on disappeared exactly when it was needed most.",
            },
            {
              title: "The figures were set in a display face",
              body: "League Gothic is a condensed display face. On a page whose whole purpose is reading and comparing amounts, it made scanning a column of numbers harder than it needed to be.",
            },
            {
              title: "Gray on gray read as disabled",
              body: "Gray text on a gray background is the convention for a control you cannot use. Applied to live content, it made working elements look switched off.",
            },
          ]}
        />
        <Figure
          src="/work/rodeo-problems.jpg"
          alt="The same budget page annotated with four problem areas labelled A to D"
          caption="The four problems marked on the page they came from. A, the two tab rows. B, the indistinguishable child rows. C, the figures. D, live content styled as disabled."
        />
      </Block>

      <Block heading="Expandable rows became a side drawer">
        <p>
          The concept round put the usual data table patterns on the table and decided
          between them rather than collecting all of them. A fixed header, row level hover
          actions and customisable columns went in. Zebra stripes stayed an open question.
          Expandable rows were dropped, because they were the source of the hierarchy
          problem, and detail moved into a side drawer instead.
        </p>
        <Figure
          src="/work/rodeo-concept.jpg"
          alt="Concept sheet with five data table patterns, expandable rows crossed out in favour of a side drawer"
          caption="The concept sheet. Expandable rows crossed out, side drawer written in its place."
        />
        <Figure
          src="/work/rodeo-side-drawer.jpg"
          alt="Redesigned budget page with an activity details side drawer open on the right"
          caption="Activity details in a drawer. Selling price, initial budget, markup, dates, description and suppliers, without the table losing its shape behind it."
        />
      </Block>

      <Block heading="Editing happens where the number is">
        <p>
          A budget is corrected constantly, so the redesign keeps editing in the row: the
          phase title, the date range and the description are all edited in place rather
          than in a separate form. The totals row underneath keeps the figure a manager is
          actually watching in view while they change the rows above it.
        </p>
        <Figure
          src="/work/rodeo-inline-editing.jpg"
          alt="Inline editing patterns: phase title field, date range picker and rich text description editor inside the table"
          caption="Inline editing. Phase title, date range and description, each edited in the row it belongs to."
        />
        <Figure
          src="/work/rodeo-budget-after.jpg"
          alt="Redesigned Rodeo budget page with separated tabs, phase totals and figures in a text face"
          caption="The redesigned page. Navigation separated from the view switcher, phases with their own totals row, figures set in a face built for reading numbers."
        />
      </Block>

      <Block heading="New components inside the existing language">
        <p>
          The new feature needed components the interface did not have yet. I designed them
          inside the existing design language rather than beside it, with every size and
          state specified, so the new parts of the page did not announce themselves as new.
          On a screen this dense, consistency is what keeps it readable.
        </p>
        <Figure
          src="/work/rodeo-buttons.jpg"
          alt="Button specification sheet with four sizes and five states across two colour families"
          caption="Buttons, four sizes and every state, specified down to icon size and spacing."
        />
      </Block>

      <Block heading="Outcomes">
        <Outcomes
          items={[
            "Budget page restructured around the three things it has to answer: what an activity costs, what the project costs, and what is left",
            "Table hierarchy made legible: navigation separated from sorting, detail moved out of expandable rows into a side drawer, figures set in a face built for numbers",
            "Inline editing for phase titles, dates and descriptions, so a budget is corrected where it is read",
            "New components delivered inside the existing design language, sizes and states specified",
            "Heuristic evaluation reduced setup time by 30%",
          ]}
        />
      </Block>

      <NextCase
        href="/work/turkish-airlines"
        title="Designing logistics products people are paid to use"
      />
    </div>
  );
}
