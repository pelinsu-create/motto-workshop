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
    img: "/work/thumb-cargo-5.jpg",
    imgAlt: "Pastel 3D illustration of an air cargo scene with a plane and freight containers",
    tag: "Product Design · Design Systems · Shipped",
    title: "Designing logistics products people are paid to use",
    year: "2025 to 2026",
    role: "Product Designer, contract",
    blurb:
      "Terminal charges, warehouse fees and loadability checks for Turkish Cargo. Shipped inside a live design system, with AI-assisted practice brought into the team.",
  },
  {
    href: "/work/liz-smart-office",
    img: "/work/thumb-liz-5.jpg",
    imgAlt: "Pastel 3D illustration of a hybrid office room with desks and a meeting booth",
    tag: "Product Design · Enterprise SaaS · Shipped",
    title: "Simplifying hybrid working, from booking to admin insights",
    year: "2021 to 2022",
    role: "UX/UI Designer",
    blurb:
      "Booker app usability, an admin insights page built from scratch, and a Teams app shipped on the Microsoft component library.",
  },
  {
    href: "/case-studies/fluffy-score",
    img: "/work/thumb-fluffy-5.jpg",
    imgAlt: "Pastel 3D illustration of a cat on a climbing tree, from the Fluffy Score app",
    tag: "AI Product · End to End · Shipped",
    title: "Fluffy Score: an AI home assessment tool",
    year: "2026",
    role: "Research, design and build",
    blurb:
      "Five years of field research and veterinary behaviour science, taken to a working product I researched, designed and built myself.",
  },
  {
    href: "/work/stakeholder-map",
    img: "/work/thumb-stakeholder-2.jpg",
    imgAlt: "Pastel 3D illustration of wind turbines and solar panels connected by a network",
    tag: "Research · Systems Mapping",
    title: "87 stakeholders, three company types, one map",
    year: "2025 to 2026",
    role: "UX Researcher · Client work",
    blurb:
      "Turning sector reports into an interactive map the client used to decide which roles their product should support first.",
  },
  {
    href: "/work/soft-start",
    img: "/work/thumb-workshop-2.jpg",
    imgAlt: "Pastel 3D illustration of a workshop room with a sticky note wall and round table",
    tag: "Facilitation · Workshop Design",
    title: "Getting a room ready in the first twenty minutes",
    year: "2024",
    role: "Workshop Designer · Facilitator",
    blurb:
      "Three AI-assisted exercises for the first twenty minutes of a strategic session, tested and kept as the standard opener.",
  },
];

const tools = [
  {
    href: "/research-sprint/analyze",
    img: "/work/thumb-sprint-4.jpg",
    imgAlt: "Pastel 3D illustration of a desk with transcripts, a laptop and sorted insight cards",
    title: "Transcript Analyzer",
    blurb: "Upload interview transcripts, get structured insights with confidence ratings. I built it because I could not find a tool that did this.",
    external: false,
  },
  {
    href: "/lab",
    img: "/work/thumb-lab-4.jpg",
    imgAlt: "Pastel 3D illustration of a playful dispenser machine producing activity cards",
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
          Five projects. Product design comes first, then research and facilitation
          work. For each one I wrote down what my role was, what shipped, and what
          happened after.
        </p>
      </section>

      <section className="pb-4">
        <div className="space-y-4">
          {projects.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex bg-surface border border-border rounded-xl overflow-hidden hover:border-accent transition-colors"
            >
              <div className="flex-1 min-w-0 p-6">
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
              <div className="hidden sm:block relative w-64 md:w-72 shrink-0 self-stretch border-l border-border">
                <Image
                  src={p.img}
                  alt={p.imgAlt}
                  fill
                  sizes="288px"
                  className="object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 border-t border-border mt-12">
        <h2 className="text-2xl md:text-3xl text-navy mb-3">Things I built</h2>
        <p className="text-gray leading-relaxed mb-8 max-w-2xl">
          Both of these are live. You can try them without an account.
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
                <Image
                  src={t.img}
                  alt={t.imgAlt}
                  width={640}
                  height={480}
                  className="w-full h-40 object-cover rounded-lg border border-border mb-4"
                />
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
                <Image
                  src={t.img}
                  alt={t.imgAlt}
                  width={640}
                  height={480}
                  className="w-full h-40 object-cover rounded-lg border border-border mb-4"
                />
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
