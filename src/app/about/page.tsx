import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Pelinsu Pelit",
  description:
    "Senior Product Designer. Ten years across fintech, travel, logistics and energy. Based in Helmond, Netherlands.",
};

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
    <div className="max-w-3xl mx-auto px-6">
      <section className="py-20 md:py-28">
        <p className="section-label mb-4">About</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-6">
          Pelinsu Pelit
        </h1>
        <p className="text-lg text-gray leading-relaxed mb-4 max-w-2xl">
          I research by making and learn by teaching. Ten years across fintech, travel,
          logistics and energy, working in discovery research, usability evaluation and
          strategic facilitation.
        </p>
        <p className="text-base text-gray leading-relaxed mb-4 max-w-2xl">
          I trained as an industrial designer, which is probably why I keep building the
          thing rather than only describing it. Currently working on mental models,
          archetypes and decision-making frameworks, and on integrating AI into research
          and co-creation workflows without letting it do the thinking.
        </p>
        <p className="text-base text-gray leading-relaxed max-w-2xl">
          Based in Helmond, Netherlands. Open to senior product design and UX design roles.
        </p>
      </section>

      <section className="py-14 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">Experience</h2>
        <div className="space-y-6">
          {experience.map((e) => (
            <div key={e.org + e.when} className="border-b border-border pb-6 last:border-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                <h3 className="text-lg text-navy font-semibold">{e.org}</h3>
                <span className="text-xs text-gray-light shrink-0">{e.when}</span>
              </div>
              <p className="text-sm text-accent font-medium mb-2">{e.role}</p>
              <p className="text-sm text-gray leading-relaxed">{e.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">What I do</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {skills.map((s) => (
            <div key={s} className="flex gap-2 items-start text-sm">
              <span className="text-accent mt-0.5">&#10003;</span>
              <span className="text-navy">{s}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">Education</h2>
        <div className="space-y-5">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-1">
              <h3 className="text-lg text-navy font-semibold">Anadolu University</h3>
              <span className="text-xs text-gray-light">2007 to 2014</span>
            </div>
            <p className="text-sm text-gray">Industrial Design</p>
          </div>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-1">
              <h3 className="text-lg text-navy font-semibold">Adam Mickiewicz University</h3>
              <span className="text-xs text-gray-light">2011 to 2012</span>
            </div>
            <p className="text-sm text-gray">Graphic Design, exchange programme</p>
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-4">Get in touch</h2>
        <p className="text-gray leading-relaxed mb-6 max-w-xl">
          Hiring a senior product designer, or want to talk about a project?
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:pelinsu@mottoworkshop.com"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors"
          >
            pelinsu@mottoworkshop.com
          </a>
          <Link
            href="/work"
            className="inline-block border border-border text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-lavender transition-colors"
          >
            See the work
          </Link>
          <a href="/Pelinsu_Pelit_CV.pdf" className="inline-block border border-border text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-lavender transition-colors">Download CV</a>
        </div>
      </section>
    </div>
  );
}
