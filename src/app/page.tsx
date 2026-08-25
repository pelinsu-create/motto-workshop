import Link from "next/link";
import Image from "next/image";

const work = [
  {
    href: "/work/turkish-airlines",
    img: "/work/thumb-cargo-5.jpg",
    imgAlt: "Pastel 3D illustration of an air cargo scene with a plane and freight containers",
    tag: "Product Design · Design Systems · Shipped",
    title: "Designing logistics products people are paid to use",
    year: "2025 to 2026",
    blurb:
      "Terminal charges, warehouse fees and loadability for Turkish Cargo. Shipped inside a live design system, with AI-assisted practice brought into the team.",
  },
  {
    href: "/work/liz-smart-office",
    img: "/work/thumb-liz-5.jpg",
    imgAlt: "Pastel 3D illustration of a hybrid office room with desks and a meeting booth",
    tag: "Product Design · Enterprise SaaS · Shipped",
    title: "Simplifying hybrid working, from booking to admin insights",
    year: "2021 to 2022",
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
    blurb:
      "The client used it to decide which roles and relationships their product should support first.",
  },
  {
    href: "/work/soft-start",
    img: "/work/thumb-workshop-2.jpg",
    imgAlt: "Pastel 3D illustration of a workshop room with a sticky note wall and round table",
    tag: "Facilitation · Workshop Design",
    title: "Getting a room ready in the first twenty minutes",
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
          Ten years in fintech, travel, logistics and energy. I design end to end, run
          my own research, and work inside existing design systems. I use AI heavily for
          discovery and prototyping, and I check what it generates against the design
          system before it goes anywhere.
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
        <p className="text-sm mt-4">
          <a href="/Pelinsu_Pelit_CV.pdf" className="text-accent font-medium hover:text-navy transition-colors">Download CV (PDF)</a>
        </p>
      </section>

      {/* What I do */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">How I Work</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="w-10 h-10 rounded-lg bg-lavender border border-border flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="text-lg text-navy font-semibold mb-2">Research</h3>
            <p className="text-sm text-gray leading-relaxed">
              Discovery, usability evaluation, stakeholder systems. Interviews,
              observation, surveys and desk research. I cite where every finding
              comes from.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-lavender border border-border flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-lg text-navy font-semibold mb-2">Facilitate</h3>
            <p className="text-sm text-gray leading-relaxed">
              More than twenty workshops: kickoffs, journey mapping, innovation
              sprints. I put a lot of work into the first twenty minutes, see the
              Soft Start project.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-lg bg-lavender border border-border flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h3 className="text-lg text-navy font-semibold mb-2">Build</h3>
            <p className="text-sm text-gray leading-relaxed">
              Research tools, facilitation games, working prototypes. The Transcript
              Analyzer and the workshop games on this site are things I built.
            </p>
          </div>
        </div>
        <p className="text-base text-gray leading-relaxed mt-8 max-w-2xl">
          I also spent five years cat sitting, in more than 50 homes in the Netherlands
          and Turkey. That research eventually became Fluffy Score. When I want to
          understand something, I end up building a small version of it.
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
              className="group flex bg-surface border border-border rounded-xl overflow-hidden hover:border-accent transition-colors"
            >
              <div className="flex-1 min-w-0 p-6">
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
              </div>
              <div className="hidden sm:block relative w-64 md:w-72 shrink-0 self-stretch border-l border-border">
                <Image
                  src={item.img}
                  alt={item.imgAlt}
                  fill
                  sizes="288px"
                  className="object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
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

      {/* Workshop and tools, demoted below the hiring path */}
      <section className="py-16 border-t border-border">
        <p className="section-label mb-3">Also available</p>
        <h2 className="text-2xl md:text-3xl text-navy mb-8">Workshop and tools</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col bg-surface border border-border rounded-xl overflow-hidden">
            <Image
              src="/work/thumb-lab-4.jpg"
              alt="Pastel 3D illustration of a playful dispenser machine producing activity cards"
              width={640}
              height={427}
              className="w-full h-44 object-cover border-b border-border"
            />
            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-xl text-navy mb-2">Research Sprint</h3>
              <p className="text-sm text-gray leading-relaxed mb-5 flex-1">
                A two to three hour session on AI-assisted research, on a topic you
                choose. We practice which parts of research you can hand to AI and
                which parts you should not, with games I built for it.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/workshop"
                  className="inline-block bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
                >
                  About the workshop
                </Link>
                <Link
                  href="/games"
                  className="inline-block border border-border text-navy px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-lavender transition-colors"
                >
                  Play the games &rarr;
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-surface border border-border rounded-xl overflow-hidden">
            <Image
              src="/work/thumb-sprint-4.jpg"
              alt="Pastel 3D illustration of a desk with transcripts, a laptop and sorted insight cards"
              width={640}
              height={427}
              className="w-full h-44 object-cover border-b border-border"
            />
            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-xl text-navy mb-2">Transcript Analyzer</h3>
              <p className="text-sm text-gray leading-relaxed mb-5 flex-1">
                Upload interview transcripts, get structured insights with confidence
                ratings. I built it because I could not find a tool that did this. No
                account needed.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/research-sprint/analyze"
                  className="inline-block bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
                >
                  Try Transcript Analyzer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
