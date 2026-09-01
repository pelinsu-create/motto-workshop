import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { caveat } from "../notebook-font";
import ContactSection from "../contact-section";

export const metadata: Metadata = {
  title: "About | Pelinsu Pelit",
  description:
    "Senior Product Designer. Ten years across fintech, travel, logistics and energy. Based in Helmond, Netherlands.",
};

const headingClass = `${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-8`;

function Icon({ children, className = "w-5 h-5" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const check = <path d="M20 6 9 17l-5-5" />;

const experience = [
  {
    org: "Senkron Digital",
    role: "UX Consultant",
    when: "Apr 2026 to present",
    note: "Market and UX research on energy asset management tools. Mapped 87 stakeholders across three company types.",
  },
  {
    org: "Turkish Airlines",
    role: "Product Designer",
    when: "Sep 2025 to Apr 2026",
    note: "Logistics products and employee experience. Integrated AI-assisted practice into the existing design system.",
  },
  {
    org: "Gordion Technology",
    role: "UX Researcher & Designer",
    when: "Jul 2024 to Sep 2025",
    note: "AI-powered research demos, model benchmarking against real customer interviews, sector service blueprints, five-year research review into mental models.",
  },
  {
    org: "Fluffy Hub",
    role: "Founder & Product Designer",
    when: "2021 to 2022",
    note: "Field research and prototyping for community cat colonies. Pivoted after market validation showed limited traction.",
  },
  {
    org: "LIZ Smart Office",
    role: "UX/UI Designer",
    when: "Oct 2021 to Oct 2022",
    note: "Onboarding flow for the enterprise admin panel. Stakeholder alignment through iterative prototyping.",
  },
  {
    org: "Rodeo Project Management, Amsterdam",
    role: "UX Designer & Researcher",
    when: "Nov 2019 to Aug 2020",
    note: "Heuristic evaluation reduced setup time by 30%. Led the planner module redesign.",
  },
  {
    org: "iyzico, PayU Group",
    role: "UX Designer & Researcher",
    when: "Jan 2018 to Oct 2018",
    note: "Mobile payment redesign improved acquisition by 20%. A/B testing and content architecture.",
  },
  {
    org: "Commencis",
    role: "UX Consultant",
    when: "Aug 2017 to Dec 2017",
    note: "Comparative usability testing and workshop facilitation for a mobile banking app.",
  },
  {
    org: "Userspots",
    role: "UX Researcher & Service Designer",
    when: "Jun 2014 to Aug 2017",
    note: "Facilitated 20+ workshops: kickoffs, journey mapping, innovation sprints. E-commerce UX and conversion.",
  },
];

const skills = [
  "End-to-end product design in live design systems",
  "AI in the design process: discovery, prototyping, evaluation",
  "User research, qualitative and quantitative",
  "Usability testing and benchmarking",
  "UX strategy and product discovery",
  "Workshop design and facilitation",
  "Journey mapping and problem framing",
  "Stakeholder interviews and insight synthesis",
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* The whole page reads as one dot-grid journal page, taped down at
          the top corners. Copy is unchanged, this is a visual restyle. */}
      <div className="notebook-page relative px-5 sm:px-8 md:px-12">
        <span className="tape-corner tape-corner-tl" aria-hidden="true" />
        <span className="tape-corner tape-corner-tr" aria-hidden="true" />

        <section className="pt-14 pb-12 md:pt-20">
          <p className="section-label mb-4 fade-rise">About</p>
          <div className="flex items-center gap-6 mb-6 fade-rise" style={{ animationDelay: "70ms" }}>
            <div className="polaroid shrink-0" style={{ "--tilt": "-2.4deg" } as CSSProperties}>
              <span className="tape tape-pink" aria-hidden="true" />
              <Image
                src="/pelinsu-journey.jpg"
                alt="Pelinsu Pelit in the desert at sunset"
                width={480}
                height={480}
                className="w-20 h-20 md:w-24 md:h-24 object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight">
              Pelinsu Pelit
            </h1>
          </div>
          <p
            className="text-lg text-gray leading-relaxed mb-4 max-w-2xl fade-rise"
            style={{ animationDelay: "140ms" }}
          >
            Most of my research involves building something. Ten years across fintech,
            travel, logistics and energy, in discovery research, usability evaluation
            and strategic facilitation.
          </p>
          <p
            className="text-base text-gray leading-relaxed mb-4 max-w-2xl fade-rise"
            style={{ animationDelay: "180ms" }}
          >
            Right now I am working on mental models,
            archetypes and decision-making frameworks, and on where AI fits into research
            and co-creation work. I am careful about which parts I hand over to it.
          </p>
          <p
            className="text-base text-gray leading-relaxed max-w-2xl fade-rise"
            style={{ animationDelay: "220ms" }}
          >
            Based in Helmond, Netherlands. Open to senior product design and UX design roles.
          </p>
        </section>

        <section className="py-10 doodle-divider">
          <h2 className={headingClass}>Experience</h2>
          <div className="space-y-6">
            {experience.map((e) => (
              <div key={e.org + e.when} className="border-b border-border pb-6 last:border-0">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                    <h3 className="text-lg text-navy font-semibold">{e.org}</h3>
                    <span className="text-xs text-gray-light shrink-0">{e.when}</span>
                  </div>
                  <p className="text-sm text-accent font-medium mb-2">{e.role}</p>
                  <p className="text-sm text-gray leading-relaxed">{e.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10 doodle-divider">
          <h2 className={headingClass}>What I do</h2>
          {/* The checklist is pasted into the journal on a taped post-it */}
          <div className="note bg-note-mint p-6 sm:p-7" style={{ "--tilt": "-0.8deg" } as CSSProperties}>
            <span className="tape" aria-hidden="true" />
            <div className="grid sm:grid-cols-2 gap-3">
              {skills.map((s) => (
                <div key={s} className="flex gap-2.5 items-start text-sm">
                  <span
                    className="mt-0.5 shrink-0 w-4 h-4 rounded-[3px] border border-accent/60 bg-white/60 text-accent flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Icon className="w-3 h-3">{check}</Icon>
                  </span>
                  <span className="text-navy">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 doodle-divider">
          <h2 className={headingClass}>Education</h2>
          <div className="space-y-5">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-1">
                <h3 className="text-lg text-navy font-semibold flex items-center gap-2">
                  <Image src="/home/icon-education.jpg" alt="" width={96} height={96} className="w-8 h-8 rounded-md object-cover shrink-0" aria-hidden="true" />
                  Anadolu University
                </h3>
                <span className="text-xs text-gray-light">2007 to 2014</span>
              </div>
              <p className="text-sm text-gray pl-7">Industrial Design</p>
            </div>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-1">
                <h3 className="text-lg text-navy font-semibold flex items-center gap-2">
                  <Image src="/home/icon-education.jpg" alt="" width={96} height={96} className="w-8 h-8 rounded-md object-cover shrink-0" aria-hidden="true" />
                  Adam Mickiewicz University
                </h3>
                <span className="text-xs text-gray-light">2011 to 2012</span>
              </div>
              <p className="text-sm text-gray pl-7">Graphic Design, exchange programme</p>
            </div>
          </div>
        </section>

        <ContactSection />
      </div>
    </div>
  );
}
