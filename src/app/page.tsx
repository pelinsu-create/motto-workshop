import Link from "next/link";

const work = [
  {
    href: "/work/turkish-airlines",
    tag: "Product Design · Design Systems · Shipped",
    title: "Designing logistics products people are paid to use",
    year: "2025 to 2026",
    blurb:
      "Terminal charges, warehouse fees and loadability for Turkish Cargo. Shipped inside a live design system, with AI-assisted practice brought into the team without breaking the system.",
  },
  {
    href: "/work/liz-smart-office",
    tag: "Product Design · Enterprise SaaS · Shipped",
    title: "Simplifying hybrid working, from booking to admin insights",
    year: "2021 to 2022",
    blurb:
      "Booker app usability, an admin insights page built from scratch, and a Teams app shipped on the Microsoft component library.",
  },
  {
    href: "/case-studies/fluffy-score",
    tag: "AI Product · End to End · Shipped",
    title: "Fluffy Score: an AI home assessment tool",
    year: "2026",
    blurb:
      "Five years of field research and veterinary behaviour science, taken to a working product I researched, designed and built myself.",
  },
  {
    href: "/work/stakeholder-map",
    tag: "Research Range · Systems Mapping",
    title: "87 stakeholders, three company types, one map",
    year: "2025 to 2026",
    blurb:
      "The client used it to decide which roles and relationships their product should support first.",
  },
  {
    href: "/work/soft-start",
    tag: "Facilitation · Workshop Design",
    title: "The strategy was fine. The room was not ready for it.",
    year: "2024",
    blurb:
      "Three AI-assisted exercises for the first twenty minutes, tested across three sessions and kept as the standard opener.",
  },
];

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Hero */}
      <section className="py-24 md:py-32">
        <p className="section-label mb-4">Senior Product Designer</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-6">
          I design the products
          <br className="hidden md:block" /> people use to do their jobs.
        </h1>
        <p className="text-lg text-gray max-w-2xl leading-relaxed mb-8">
          Ten years across fintech, travel, logistics and energy. I design end to end
          inside live design systems, run my own research, and use AI where it earns its
          place: discovery, prototyping, and keeping generated work honest against the
          system.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/work"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
          >
            See five projects
          </Link>
          <a
            href="mailto:pelinsu@mottoworkshop.com"
            className="inline-block border border-border text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-lavender transition-colors"
          >
            Email me
          </a>
        </div>
        <p className="text-base text-navy mt-8 max-w-xl leading-relaxed">
          Based in Helmond, Netherlands. Open to senior product design and UX design
          roles, hybrid in the Eindhoven and Amsterdam regions or remote. Permanent or
          freelance.
        </p>
      </section>

      {/* Selected work */}
      <section className="py-16 border-t border-border">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-2xl md:text-3xl text-navy">Selected Work</h2>
          <Link href="/work" className="text-sm text-accent font-medium hover:text-navy transition-colors">
            All work &rarr;
          </Link>
        </div>

        <div className="space-y-4">
          {work.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block bg-surface border border-border rounded-xl p-6 hover:border-accent transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {item.tag}
                </p>
                <span className="text-xs text-gray-light shrink-0">{item.year}</span>
              </div>
              <h3 className="text-xl text-navy mb-2 group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray leading-relaxed">{item.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* What I do */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">How I Work</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg text-navy font-semibold mb-2">Research</h3>
            <p className="text-sm text-gray leading-relaxed">
              Discovery, usability evaluation, stakeholder systems. Interviews,
              observation, surveys, and desk research that names its sources.
            </p>
          </div>
          <div>
            <h3 className="text-lg text-navy font-semibold mb-2">Facilitate</h3>
            <p className="text-sm text-gray leading-relaxed">
              Twenty plus workshops: kickoffs, journey mapping, innovation sprints.
              I design the openers as carefully as the agenda.
            </p>
          </div>
          <div>
            <h3 className="text-lg text-navy font-semibold mb-2">Build</h3>
            <p className="text-sm text-gray leading-relaxed">
              Research tools, facilitation games, working prototypes. If a study needs
              software that does not exist yet, I write it.
            </p>
          </div>
        </div>
        <p className="text-base text-gray leading-relaxed mt-8 max-w-2xl">
          Five years of cat sitting taught me more about domestic space than any audit.
          I research with people, animals, and whatever I can build. I make things to see
          what breaks.
        </p>
      </section>

      {/* Contact sits ahead of the workshop so the hiring path is unobstructed */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-4">Get in touch</h2>
        <p className="text-gray leading-relaxed mb-6 max-w-xl">
          Hiring a senior product designer, or want to talk about a project?
        </p>
        <a
          href="mailto:pelinsu@mottoworkshop.com"
          className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
        >
          pelinsu@mottoworkshop.com
        </a>
      </section>

      {/* Workshop, demoted below the hiring path */}
      <section className="py-16 border-t border-border">
        <div className="bg-surface border border-border rounded-xl p-8">
          <p className="section-label mb-3">Also available</p>
          <h2 className="text-2xl md:text-3xl text-navy mb-4">Motto Workshop</h2>
          <p className="text-gray leading-relaxed mb-6 max-w-2xl">
            A two to three hour session on AI-assisted research technique. Where does AI
            help, and where do you still need to think for yourself? We work it out on a
            topic you choose, using verification checklists and games I built for it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/workshop"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
            >
              About the workshop
            </Link>
            <Link
              href="/games"
              className="inline-block border border-border text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-lavender transition-colors"
            >
              Play the games &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
