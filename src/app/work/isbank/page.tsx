import type { Metadata } from "next";
import { CaseHero, Block, Steps, Findings, Outcomes, NextCase, Figure } from "../case-shell";

export const metadata: Metadata = {
  title: "İşbank pre-login | Pelinsu Pelit",
  description:
    "Two candidate designs for a mobile banking app's pre-login screens, settled with a comparative usability test scored on SUM and a desirability study.",
};

export default function Isbank() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <CaseHero
        tags="UX Research · Comparative Testing · Mobile Banking"
        title="Two concepts, and a test that decided between them"
        standfirst="İşbank had two candidate designs for the screens people see before they log in, and a room full of informed opinions about which was better. We measured instead of arguing."
        meta={[
          { label: "Year", value: "2017" },
          { label: "Role", value: "UX Researcher, agency team" },
          { label: "Context", value: "İşbank mobile banking app, pre-login screens" },
          { label: "Team", value: "Four UX designers and a UI designer at the agency" },
          { label: "Methods", value: "Comparative usability test scored on SUM, desirability study, ideation workshop" },
          { label: "Scale", value: "Two concepts, iOS and Android, more than 900 minutes of sessions" },
          { label: "Status", value: "Shipped" },
        ]}
      />

      <Block heading="Two concepts and no agreed way to choose between them">
        <p>
          The bank wanted to renew the screens a customer sees before logging in. Research
          and ideation produced two alternative concepts, and stakeholders reviewed both and
          commented on colour, layout and which features belonged there. That is the point
          where a project usually picks the option with the most senior person behind it.
        </p>
        <p>
          We had four questions instead, and none of them could be answered by discussing
          the designs: which option performs better and why, what each one trades away,
          which usability problems each carries, and which of them makes the bank feel
          trustworthy to people who use it every day.
        </p>
        <Figure
          src="/work/isbank-concepts.jpg"
          alt="The two pre-login concepts side by side, labelled A and B, on iPhone frames"
          caption="The two concepts. Same features, two different answers about what a customer should see before they authenticate."
          priority
        />
      </Block>

      <Block heading="One number per task, so the two designs could be compared">
        <p>
          A comparative usability test scored on SUM answered the first three. SUM is Jeff
          Sauro&apos;s Single Usability Metric: it folds task completion, errors, time on task
          and satisfaction into one score per task, which is what makes two designs
          comparable rather than merely both tested.
        </p>
        <Steps
          items={[
            {
              title: "Both concepts, same tasks",
              body: "Five minutes of interview, fifteen minutes of tasks, five minutes of reaction cards, run on iOS and Android. First impressions of the pre-login screen, finding login, switching user account, changing the password, and whether people noticed and understood the new features.",
            },
            {
              title: "No think aloud, deliberately",
              body: "Thinking aloud changes how long a task takes. Since time on task feeds the score, we left it out and gave up the running commentary to keep the timings honest.",
            },
            {
              title: "Satisfaction captured per task, not per session",
              body: "Each participant rated each task as they finished it, so satisfaction could be attributed to a specific step instead of to the whole experience afterwards.",
            },
            {
              title: "The team watched live, in the next room",
              body: "Sessions were broadcast to a second room where the team took their own notes. Stakeholders who watch the test argue with the findings less.",
            },
          ]}
        />
      </Block>

      <Block heading="Neither concept won outright, which is what made the result useful">
        <p>
          Scored task by task, the two designs traded wins. On some tasks the gap was
          enormous, 97% against 37.8% on one scenario, and on others the two were within a
          percentage point of each other. A single verdict would have thrown away most of
          what the test found.
        </p>
        <Figure
          src="/work/isbank-sum-scores.jpg"
          alt="Bar chart of SUM scores task by task, with the two designs side by side on each task"
          caption="SUM scores task by task. The result is a list of which design solved which problem, not a winner."
        />
      </Block>

      <Block heading="A usability test cannot tell you whether a bank feels trustworthy">
        <p>
          The fourth question was about how the design felt, and a usability test is the
          wrong instrument for it. The bank still needed the answer, so we ran a desirability
          study with Microsoft&apos;s Product Reaction Cards, the card set Joey Benedek and
          Trish Miner published in 2002.
        </p>
        <Findings
          items={[
            {
              title: "Ask after the task, not instead of it",
              body: "The cards came out after the usability test, so reactions were formed by using the design rather than by looking at it.",
            },
            {
              title: "Let people choose the words",
              body: "Participants picked the cards that described the design, from a set including familiar, fresh, impressive and innovative. Which words people reach for is the finding.",
            },
            {
              title: "Two methods, two kinds of answer",
              body: "SUM said which design worked better on which task. The cards said which one read as the bank. Neither would have been enough on its own, and the pair is what let the decision be made without a vote.",
            },
          ]}
        />
      </Block>

      <Block heading="The workshop is where data became design decisions">
        <p>
          Results do not turn into a product on their own. We presented every insight to the
          team first, then split the room into three groups, each with a brief covering
          information architecture problems, user paths and micro-interaction ideas.
        </p>
        <p>
          Five minutes alone with sticky notes before anyone spoke, so the loudest opinion
          did not set the direction. Twenty minutes of working through the ideas, then voting
          and sketching the ones that survived.
        </p>
        <p>
          A team will always hold different views about a design, and that is not a problem
          to be removed. Putting the research and the test results in front of everyone
          before the decision is what made agreeing on one easier.
        </p>
      </Block>

      <Block heading="Outcomes">
        <Outcomes
          items={[
            "The pre-login design decided on evidence rather than on seniority, task by task, with the usability problems fixed before it shipped",
            "Registration and login took less time, and feature usage went up",
            "More customers set their new PIN quickly, which was the KPI the bank was watching",
            "Support messages about logging in went down",
            "A customisable pre-login screen, so people arrange the modules they use before they authenticate",
          ]}
        />
        <Figure
          src="/work/isbank-shipped.jpg"
          alt="Five screens of the shipped app: exchange rates, nearest branch, the pre-login welcome screen, personal and commercial tabs, and Mobile Key"
          caption="What shipped. Rates, nearest branch, PIN creation and Mobile Key, all reachable before anyone logs in."
        />
      </Block>

      <NextCase
        href="/work/turkish-airlines"
        title="Designing logistics products people are paid to use"
      />
    </div>
  );
}
