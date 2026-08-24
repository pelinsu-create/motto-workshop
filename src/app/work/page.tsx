import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Work | Pelinsu Pelit",
  description:
    "Selected projects in service research, design research, facilitation and AI product work.",
};

const projects = [
  {
    href: "/work/turkish-airlines",
    img: "/work/tk-terminal-charges.jpg",
    imgAlt: "Turkish Cargo terminal charges screen",
    tag: "Product Design · Design Systems · Shipped",
    title: "Designing logistics products people are paid to use",
    year: "2025 to 2026",
    role: "Product Designer, contract",
    blurb:
      "Terminal charges, warehouse fees and loadability checks for Turkish Cargo. Shipped inside a live design system, with AI-assisted practice brought into the team.",
  },
  {
    href: "/work/liz-smart-office",
    img: "/work/liz-insights.webp",
    imgAlt: "LIZ Smart Office booking insights dashboard",
    tag: "Product Design · Enterprise SaaS · Shipped",
    title: "Simplifying hybrid working, from booking to admin insights",
    year: "2021 to 2022",
    role: "UX/UI Designer",
    blurb:
      "Booker app usability, an admin insights page built from scratch, and a Teams app shipped on the Microsoft component library.",
  },
  {
    href: "/case-studies/fluffy-score",
    img: "/work/fluffy-cat.jpg",
    imgAlt: "Fluffy Score field research",
    tag: "AI Product · End to End · Shipped",
    title: "Fluffy Score: an AI home assessment tool",
    year: "2026",
    role: "Research, design and build",
    blurb:
      "Five years of field research and veterinary behaviour science, taken to a working product I researched, designed and built myself.",
  },
  {
    href: "/work/stakeholder-map",
    img: "/work/sm-ipp-overview.jpg",
    imgAlt: "Interactive stakeholder map",
    tag: "Research Range · Systems Mapping",
    title: "87 stakeholders, three company types, one map",
    year: "2025 to 2026",
    role: "UX Researcher · Client work",
    blurb:
      "Turning sector reports into an interactive map the client used to decide which roles their product should support first.",
  },
  {
    href: "/work/soft-start",
    img: "/work/ws-planets-full.jpg",
    imgAlt: "Planets workshop exercise",
    tag: "Facilitation · Workshop Design",
    title: "The strategy was fine. The room was not ready for it.",
    year: "2024",
    role: "Workshop Designer · Facilitator",
    blurb:
      "Three AI-assisted exercises for the first twenty minutes of a strategic session, tested and kept as the standard opener.",
  },
];

const tools = [
  {
    href: "/research-sprint",
    title: "Research Sprint",
    blurb: "Upload interview transcripts, get structured insights with confidence ratings. Built because the tool I wanted did not exist.",
    external: false,
  },
  {
    href: "/lab",
    title: "Activity Lab",
    blurb: "Generates a complete workshop activity from a topic and a goal. Three free runs, no account.",
    external: false,
  },
];

export default function Work() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <section className="py-20 md:py-28">
        <p className="section-label mb-4">Work</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-6">
          Selected projects
        </h1>
        <p className="text-lg text-gray max-w-2xl leading-relaxed">
          Five projects. Product design first, then the research and facilitation range
          behind it. Each one names the role I held, what shipped, and what it changed.
        </p>
      </section>

      <section className="pb-4">
        <div className="space-y-4">
          {projects.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex gap-5 bg-surface border border-border rounded-xl p-6 hover:border-accent transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider">{p.tag}</p>
                  <span className="text-xs text-gray-light shrink-0">{p.year}</span>
                </div>
                <h2 className="text-xl text-navy mb-2 group-hover:text-accent transition-colors">
                  {p.title}
                </h2>
                <p className="text-sm text-gray leading-relaxed mb-3">{p.blurb}</p>
                <p className="text-xs text-gray-light">{p.role}</p>
              </div>
              <div className="hidden sm:block shrink-0 self-center">
                <Image
                  src={p.img}
                  alt={p.imgAlt}
                  width={320}
                  height={224}
                  className="w-40 h-28 object-cover object-top rounded-lg border border-border"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 border-t border-border mt-12">
        <h2 className="text-2xl md:text-3xl text-navy mb-3">Things I built</h2>
        <p className="text-gray leading-relaxed mb-8 max-w-2xl">
          Two working tools, not concepts. Try them, no account needed.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {tools.map((t) =>
            t.external ? (
              <a
                key={t.href}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors"
              >
                <h3 className="text-lg text-navy mb-1 group-hover:text-accent transition-colors">
                  {t.title} &rarr;
                </h3>
                <p className="text-sm text-gray leading-relaxed">{t.blurb}</p>
              </a>
            ) : (
              <Link
                key={t.href}
                href={t.href}
                className="group block bg-surface border border-border rounded-xl p-5 hover:border-accent transition-colors"
              >
                <h3 className="text-lg text-navy mb-1 group-hover:text-accent transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-gray leading-relaxed">{t.blurb}</p>
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
}
