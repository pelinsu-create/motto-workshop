import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "../reveal";
import HoverGif from "../hover-gif";

export const metadata: Metadata = {
  title: "Work | Pelinsu Pelit",
  description:
    "Selected projects in service research, design research, facilitation and AI product work.",
};

const projects = [
  {
    href: "/work/turkish-airlines",
    img: "/work/thumb-cargo-5.jpg",
    anim: "/work/anim-cargo.mp4",
    imgAlt: "Pastel 3D illustration of an air cargo scene where a small plane takes off past freight containers",
    tag: "Product Design",
    title: "Designing logistics products people are paid to use",
    year: "2025 to 2026",
    role: "Product Designer, contract",
    blurb:
      "Three freight products for Turkish Cargo: terminal charges, warehouse fees and loadability, shipped inside a live design system.",
    tint: "bg-surface",
    tilt: "-0.7deg",
    stick: "3deg",
  },
  {
    href: "/work/liz-smart-office",
    img: "/work/thumb-liz-5.jpg",
    anim: "/work/anim-liz.mp4",
    imgAlt: "Pastel 3D illustration of a hybrid office room with desks and a meeting booth",
    tag: "Enterprise SaaS",
    title: "Simplifying hybrid working, from booking to admin insights",
    year: "2021 to 2022",
    role: "UX/UI Designer",
    blurb:
      "Three parts of one product: booker usability, an insights page built from scratch, and a Teams app on the Microsoft component library.",
    tint: "bg-surface",
    tilt: "0.5deg",
    stick: "-2.5deg",
  },
  {
    href: "/case-studies/fluffy-score",
    img: "/work/thumb-fluffy-5.jpg",
    anim: "/work/anim-fluffy.mp4",
    imgAlt: "Pastel 3D illustration of a kitten hopping around a climbing tree, from the Fluffy Score app",
    tag: "AI Product",
    title: "Fluffy Score: an AI home assessment tool",
    year: "2026",
    role: "Research, design and build",
    blurb:
      "Five years of field research in more than 50 homes, scored across five pillars in a product I built myself.",
    tint: "bg-surface",
    tilt: "-0.4deg",
    stick: "2.5deg",
  },
  {
    href: "/work/stakeholder-map",
    img: "/work/thumb-stakeholder-2.jpg",
    anim: "/work/anim-stakeholder.mp4",
    imgAlt: "Pastel 3D illustration of spinning wind turbines and solar panels connected by a network",
    tag: "Research",
    title: "87 stakeholders, three company types, one map",
    year: "2025 to 2026",
    role: "UX Researcher · Client work",
    blurb:
      "An interactive map the client used to decide which roles their product should support first.",
    tint: "bg-surface",
    tilt: "0.6deg",
    stick: "-3deg",
  },
  {
    href: "/work/soft-start",
    img: "/work/thumb-workshop-2.jpg",
    anim: "/work/anim-workshop.mp4",
    imgAlt: "Pastel 3D illustration of a workshop room with a sticky note wall and round table",
    tag: "Facilitation",
    title: "Getting a room ready in the first twenty minutes",
    year: "2024",
    role: "Workshop Designer · Facilitator",
    blurb:
      "Three AI-assisted exercises for the first twenty minutes, kept as the standard opener.",
    tint: "bg-surface",
    tilt: "-0.5deg",
    stick: "2deg",
  },
];

const tools = [
  {
    href: "/bias-check",
    img: "/work/icon-bias.jpg",
    imgAlt: "Pastel 3D balance scale icon",
    tint: "bg-surface",
    tilt: "-0.8deg",
    title: "Guide Builder + Bias Checker",
    blurb: "Drafts an interview guide, survey or screener from your research goal, then checks the draft against 20 research biases in one click. It runs on the bias watchlist I use in my own studies.",
    external: false,
  },
  {
    href: "/xyz",
    img: "/work/icon-xyz.jpg",
    imgAlt: "Pastel 3D target with arrow icon",
    tint: "bg-surface",
    tilt: "-0.6deg",
    title: "XYZ Hypothesis Builder",
    blurb: "Turn a vague product idea into one testable sentence: at least X% of Y will Z. It steers you from opinions to observable behavior, recommends a cheap pretotype, and makes you set kill criteria before you test. No account needed.",
    external: false,
  },
  {
    href: "/research-sprint/analyze",
    img: "/work/icon-sprint.jpg",
    imgAlt: "Pastel 3D puzzle piece icon",
    tint: "bg-surface",
    tilt: "0.7deg",
    title: "Transcript Analyzer",
    blurb: "Upload interview transcripts and get structured insights back: themes with confidence ratings, quotes tagged by participant, contradictions between participants, and bias flags. Sample interviews are included, so you can watch a full analysis run without preparing anything.",
    external: false,
  },
];

export default function Work() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* The whole page reads as one dot-grid journal spread, with the project post-its pinned onto it. */}
      <div className="notebook-page relative px-5 sm:px-8 md:px-12">
      <section className="pt-14 pb-12 md:pt-20">
        <p className="section-label mb-4 fade-rise">Work</p>
        <h1
          className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-6 fade-rise"
          style={{ animationDelay: "70ms" }}
        >
          Selected projects
        </h1>
        <p
          className="text-lg text-gray max-w-2xl leading-relaxed fade-rise"
          style={{ animationDelay: "140ms" }}
        >
          Five projects. For each one I wrote down what my role was, what shipped,
          and what happened after.
        </p>
      </section>

      <section className="pb-4">
        <div className="space-y-6">
          {projects.map((p, i) => (
            <Reveal key={p.href} delay={Math.min(i * 70, 210)}>
              <Link
                href={p.href}
                className={`group note flex items-center ${p.tint}`}
                style={{ "--tilt": p.tilt } as CSSProperties}
              >
                <div className="flex-1 min-w-0 p-6">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <p className="text-xs font-semibold text-gray uppercase tracking-wider">{p.tag}</p>
                    <span className="text-xs text-gray shrink-0">{p.year}</span>
                  </div>
                  <h2 className="text-xl text-navy mb-2 group-hover:underline decoration-2 underline-offset-4">
                    {p.title}
                  </h2>
                  <p className="text-sm text-gray leading-relaxed mb-3">{p.blurb}</p>
                </div>
                <div className="hidden sm:block shrink-0 py-4 pr-2 -mr-3 md:-mr-4">
                  <div
                    className="sticker relative w-44 h-32 md:w-52 md:h-36"
                    style={{ "--stick": p.stick } as CSSProperties}
                  >
                    <HoverGif
                      staticSrc={p.img}
                      animSrc={p.anim}
                      alt={p.imgAlt}
                      sizes="208px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pt-10 pb-14 mt-8 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-3">Things I built</h2>
        <p className="text-gray leading-relaxed mb-8 max-w-2xl">
          All three are live. You can try them without an account.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {tools.map((t, i) =>
            t.external ? (
              <Reveal key={t.href} delay={i * 80}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group note block p-5 ${t.tint}`}
                  style={{ "--tilt": t.tilt } as CSSProperties}
                >
                  <Image
                    src={t.img}
                    alt={t.imgAlt}
                    width={800}
                    height={800}
                    className="w-full h-36 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg text-navy mb-1 group-hover:underline decoration-2 underline-offset-4">
                    {t.title} <span className="arrow-nudge" aria-hidden="true">&rarr;</span>
                  </h3>
                  <p className="text-sm text-gray leading-relaxed">{t.blurb}</p>
                </a>
              </Reveal>
            ) : (
              <Reveal key={t.href} delay={i * 80}>
                <Link
                  href={t.href}
                  className={`group note block p-5 ${t.tint}`}
                  style={{ "--tilt": t.tilt } as CSSProperties}
                >
                  <Image
                    src={t.img}
                    alt={t.imgAlt}
                    width={800}
                    height={800}
                    className="w-full h-36 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg text-navy mb-1 group-hover:underline decoration-2 underline-offset-4">
                    {t.title}
                  </h3>
                  <p className="text-sm text-gray leading-relaxed">{t.blurb}</p>
                </Link>
              </Reveal>
            )
          )}
        </div>
      </section>
      </div>
    </div>
  );
}
