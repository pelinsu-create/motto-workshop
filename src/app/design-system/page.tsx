import type { Metadata } from "next";
import ProjectFilter from "../project-filter";
import {
  MethodCard,
  CardVisual,
  CardTitle,
  CardTags,
  CardBody,
  CardTip,
  Pill,
} from "../method-card";
import {
  ColorSwatch,
  InkPairSwatch,
  ValueRow,
  ShadowSwatch,
  Tilted,
} from "./swatches";

export const metadata: Metadata = {
  title: "Design System | Motto Workshop",
  description:
    "The living design system behind mottoworkshop.com: tokens, components, and the audit that keeps AI generated code inside the rails.",
};

/* The showcase renders everything from the live tokens in globals.css,
   so this page can never drift from the system it documents. */

function Section({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <p className="section-label mb-2">{label}</p>
      <h2 className="text-2xl text-navy mb-3">{title}</h2>
      {intro && <p className="text-gray text-sm leading-relaxed mb-6 max-w-2xl">{intro}</p>}
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-24">
      <header className="pt-12 pb-14 fade-rise">
        <p className="section-label mb-3">Living design system</p>
        <h1 className="text-4xl md:text-5xl text-navy mb-4">
          Calm paper, on the record
        </h1>
        <p className="text-gray leading-relaxed max-w-2xl">
          Every value on this page is read live from the site&apos;s token layer,
          so the showcase can never drift from the code. The written rules live
          in the repo as an AI readable spec, and a deterministic audit script
          fails any change that invents values outside this set.
        </p>
        <p className="mt-4 text-sm">
          <a
            href="https://github.com/pelinsu-create/motto-workshop/tree/main/design-system"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-navy transition-colors"
          >
            Read the spec files on GitHub
            <span className="arrow-nudge ml-1">&rarr;</span>
          </a>
        </p>
      </header>

      <Section
        label="Tokens"
        title="Core colors"
        intro="One blue, one navy, two grays, one border weight. AI tools pick from this closed set; the audit rejects anything else."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <ColorSwatch name="--background" note="Page background, the desk" />
          <ColorSwatch name="--navy" note="Headings and primary text" />
          <ColorSwatch name="--navy-mid" note="Secondary dark tone" />
          <ColorSwatch name="--accent" note="The one blue: links, buttons, focus" />
          <ColorSwatch name="--accent-light" note="Accent tinted fills" />
          <ColorSwatch name="--gray" note="Secondary text" />
          <ColorSwatch name="--gray-light" note="Placeholders and disabled only" />
          <ColorSwatch name="--border" note="All rules and borders" />
          <ColorSwatch name="--surface" note="Cards and paper" />
          <ColorSwatch name="--tag-bg" note="Neutral pill background" />
          <ColorSwatch name="--lavender" note="Soft tinted sections" />
          <ColorSwatch name="--delight-pink" note="Sparkle particles only" />
        </div>
      </Section>

      <Section
        label="Tokens"
        title="Paper family"
        intro="Six pastels for sticky notes and card panels, never for text. They sit with the 3D illustration family on the work page."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <ColorSwatch name="--note-cream" />
          <ColorSwatch name="--note-mint" />
          <ColorSwatch name="--note-peach" />
          <ColorSwatch name="--note-lavender" />
          <ColorSwatch name="--note-yellow" />
          <ColorSwatch name="--note-rose" />
        </div>
        <div className="mt-6 space-y-3">
          <InkPairSwatch ink="--ink-rose" paper="--note-rose" label="Rose pill" />
          <InkPairSwatch ink="--ink-mustard" paper="--note-cream" label="Mustard pill" />
        </div>
        <p className="mt-4 text-xs text-gray max-w-2xl">
          Ink colors exist only as pairs with their named paper and every pair
          is contrast checked to WCAG AA by the audit script.
        </p>
      </Section>

      <Section
        label="Tokens"
        title="Positive and feedback colors"
        intro="Green is reserved for success and diagram semantics. The interactive tools use the red, amber and emerald feedback families for severity, and nothing else from the default palette passes the audit."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <ColorSwatch name="--success" note="Success text and diagram strokes" />
          <ColorSwatch name="--success-light" note="Success tinted fills" />
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700">
            Error, high severity
          </span>
          <span className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
            Warning, medium severity
          </span>
          <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
            Verified, low severity
          </span>
        </div>
      </Section>

      <Section
        label="Tokens"
        title="Typography"
        intro="Playfair Display for headings, Inter for everything else. One sanctioned off scale size: the pill text."
      >
        <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
          <p className="text-4xl text-navy">Serif headings settle the page</p>
          <p className="font-sans text-base text-navy">
            Inter carries body text, labels and interface copy at four weights.
          </p>
          <p className="section-label">Section label, uppercase and tracked</p>
          <p className="text-sm text-gray">
            Secondary text uses gray, which passes AA on white and on the page
            background. Placeholder text may use gray-light because inputs
            carry visible labels.
          </p>
        </div>
      </Section>

      <Section
        label="Tokens"
        title="Motion and shadow"
        intro="Two durations, one decelerating curve, one rise distance. Nothing bounces, and reduced motion is handled globally."
      >
        <div className="rounded-xl border border-border bg-surface px-6 py-2 mb-6">
          <ValueRow name="--motion-duration-micro" note="Hovers, presses, small state changes" />
          <ValueRow name="--motion-duration-reveal" note="Scroll reveals and content entrances" />
          <ValueRow name="--motion-duration-delight" note="Lifetime of one sparkle particle" />
          <ValueRow name="--motion-ease-out" note="The only easing curve, decelerate without bounce" />
          <ValueRow name="--motion-rise" note="Distance content travels while fading in" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ShadowSwatch name="--shadow-note" note="Resting paper: notes, polaroids, cards" />
          <ShadowSwatch name="--shadow-lift" note="Hovered cards, slightly deeper" />
        </div>
      </Section>

      <Section
        label="Components"
        title="Buttons and links"
        intro="Three levels, no invented colors. Primary is accent, hover is navy, press nudges down one pixel."
      >
        <div className="flex flex-wrap items-center gap-4">
          <button className="btn-press bg-accent text-white px-4 py-2 rounded-lg hover:bg-navy transition-colors text-sm font-medium">
            Primary action
          </button>
          <button className="btn-press border border-border bg-surface text-navy px-4 py-2 rounded-lg hover:border-accent transition-colors text-sm font-medium">
            Secondary action
          </button>
          <a href="#" className="text-sm text-accent hover:text-navy transition-colors">
            Text link
            <span className="arrow-nudge ml-1">&rarr;</span>
          </a>
        </div>
      </Section>

      <Section
        label="Components"
        title="Pills"
        intro="Four tones, each a contrast checked paper and ink pair. Pills are labels, never buttons."
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="accent">Accent</Pill>
          <Pill tone="navy">Navy</Pill>
          <Pill tone="rose">Rose</Pill>
          <Pill tone="mustard">Mustard</Pill>
        </div>
      </Section>

      <Section
        label="Components"
        title="Filter chips"
        intro="Toggle buttons above a list. Both states carry a border, so a chip does not resize when it is selected, and the row stays hidden until JavaScript lands, since a filter cannot work without it."
      >
        <ProjectFilter
          label="Filter the example list"
          items={[
            {
              id: "example-research",
              tags: ["Research"],
              node: <p className="text-sm text-navy">A research project</p>,
            },
            {
              id: "example-design",
              tags: ["Product Design"],
              node: <p className="text-sm text-navy">A product design project</p>,
            },
            {
              id: "example-both",
              tags: ["Research", "Product Design"],
              node: <p className="text-sm text-navy">One that is both</p>,
            },
          ]}
        />
      </Section>

      <Section
        label="Components"
        title="Paper elements"
        intro="Sticky notes, tape, pins and polaroids carry the site's identity. They compose, they never restyle."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6">
          <Tilted tilt="-2deg" className="note bg-note-mint p-5 pt-6">
            <span className="tape" aria-hidden="true" />
            <p className="text-sm text-navy leading-relaxed">
              A sticky note with washi tape. It straightens quietly when
              hovered.
            </p>
          </Tilted>
          <Tilted tilt="1.5deg" className="note bg-note-yellow p-5 pt-6">
            <span className="pin" aria-hidden="true" />
            <p className="text-sm text-navy leading-relaxed">
              A note held by a push pin. Pins and tape are decorative and
              hidden from screen readers.
            </p>
          </Tilted>
          <Tilted tilt="2deg" className="polaroid">
            <div className="flex h-28 items-center justify-center rounded-sm bg-note-peach text-4xl" aria-hidden="true">
              📸
            </div>
            <p className="mt-2 text-xs text-gray text-center">A taped polaroid</p>
          </Tilted>
        </div>
      </Section>

      <Section
        label="Components"
        title="The method card"
        intro="The shared language of the games and tool pages, styled like a printed co-design methods handbook. Every part rules itself."
      >
        <div className="max-w-sm">
          <MethodCard>
            <CardVisual bg="bg-note-lavender" className="py-10 text-5xl">
              <span>🧭</span>
            </CardVisual>
            <CardTitle kicker="Showcase" as="h3">
              Method card
            </CardTitle>
            <CardTags
              tags={[
                { label: "Composable", tone: "accent" },
                { label: "Ruled", tone: "navy" },
              ]}
            />
            <CardBody>
              <p className="text-sm leading-relaxed text-gray">
                Visual panel, title band, pill row, body and tip footer stack
                in clearly ruled sections.
              </p>
            </CardBody>
            <CardTip label="Compose, do not rebuild.">
              new cards reuse these parts so the handbook stays one book.
            </CardTip>
          </MethodCard>
        </div>
      </Section>

      <Section
        label="Governance"
        title="How it stays honest"
        intro="The system is enforced, not aspirational. AI tools read the spec before generating, and a deterministic script checks what they made."
      >
        <div className="rounded-xl border border-border bg-surface p-6 max-w-2xl">
          <ol className="list-decimal list-inside space-y-2 text-sm text-navy">
            <li>
              Spec files in the repo capture every decision: principles,
              tokens, components, patterns and what wins when rules conflict.
            </li>
            <li>
              <code className="font-mono text-xs bg-tag-bg rounded px-1.5 py-0.5">npm run audit:design</code>{" "}
              scans the code for raw values, checks WCAG AA contrast on every
              declared pair, and fails if the spec and the token layer drift
              apart.
            </li>
            <li>
              Proof: the same component generated without the spec produced 24
              invented values; with the spec, zero.
            </li>
          </ol>
        </div>
      </Section>
    </div>
  );
}
