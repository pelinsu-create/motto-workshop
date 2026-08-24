import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Pelinsu Pelit",
  description:
    "Senior Product Designer. Ten years across fintech, travel, logistics and energy. Based in Helmond, Netherlands.",
};

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

const sectorIcons: Record<string, React.ReactNode> = {
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  plane: (
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  ),
  sparkles: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </>
  ),
  cat: (
    <>
      <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M8 10h.01" />
      <path d="M12 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
    </>
  ),
  calendar: (
    <>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  creditCard: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  landmark: (
    <>
      <path d="M3 22h18" />
      <path d="M6 18v-7" />
      <path d="M10 18v-7" />
      <path d="M14 18v-7" />
      <path d="M18 18v-7" />
      <path d="m12 2 8 5H4l8-5Z" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
};

const checkCircle = (
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </>
);

const graduationCap = (
  <>
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </>
);

const experience = [
  {
    org: "Senkron Digital",
    role: "UX Consultant",
    when: "Apr 2026 to present",
    note: "Market and UX research on energy asset management tools. Mapped 87 stakeholders across three company types.",
    icon: "zap",
  },
  {
    org: "Turkish Airlines",
    role: "Product Designer",
    when: "Sep 2025 to Apr 2026",
    note: "Logistics products and employee experience. Integrated AI-assisted practice into the existing design system.",
    icon: "plane",
  },
  {
    org: "Gordion Technology",
    role: "UX Researcher & Designer",
    when: "Jul 2024 to Sep 2025",
    note: "AI-powered research demos, model benchmarking against real customer interviews, sector service blueprints, five-year research review into mental models.",
    icon: "sparkles",
  },
  {
    org: "Fluffy Hub",
    role: "Founder & Product Designer",
    when: "2021 to 2022",
    note: "Field research and prototyping for community cat colonies. Pivoted after market validation showed limited traction.",
    icon: "cat",
  },
  {
    org: "LIZ Smart Office",
    role: "UX/UI Designer",
    when: "Oct 2021 to Oct 2022",
    note: "Onboarding flow for the enterprise admin panel. Stakeholder alignment through iterative prototyping.",
    icon: "building",
  },
  {
    org: "Rodeo Project Management, Amsterdam",
    role: "UX Designer & Researcher",
    when: "Nov 2019 to Aug 2020",
    note: "Heuristic evaluation reduced setup time by 30%. Led the planner module redesign.",
    icon: "calendar",
  },
  {
    org: "iyzico, PayU Group",
    role: "UX Designer & Researcher",
    when: "Jan 2018 to Oct 2018",
    note: "Mobile payment redesign improved acquisition by 20%. A/B testing and content architecture.",
    icon: "creditCard",
  },
  {
    org: "Commencis",
    role: "UX Consultant",
    when: "Aug 2017 to Dec 2017",
    note: "Comparative usability testing and workshop facilitation for a mobile banking app.",
    icon: "landmark",
  },
  {
    org: "Userspots",
    role: "UX Researcher & Service Designer",
    when: "Jun 2014 to Aug 2017",
    note: "Facilitated 20+ workshops: kickoffs, journey mapping, innovation sprints. E-commerce UX and conversion.",
    icon: "users",
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
        <div className="flex items-center gap-5 mb-6">
          <Image
            src="/pelinsu.jpg"
            alt="Portrait of Pelinsu Pelit"
            width={192}
            height={192}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border border-border shrink-0"
          />
          <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight">
            Pelinsu Pelit
          </h1>
        </div>
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
            <div key={e.org + e.when} className="flex gap-4 border-b border-border pb-6 last:border-0">
              <div className="w-10 h-10 rounded-lg bg-lavender border border-border flex items-center justify-center shrink-0 text-accent">
                <Icon>{sectorIcons[e.icon]}</Icon>
              </div>
              <div className="flex-1 min-w-0">
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

      <section className="py-14 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-8">What I do</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {skills.map((s) => (
            <div key={s} className="flex gap-2 items-start text-sm">
              <span className="text-accent mt-0.5 shrink-0">
                <Icon className="w-4 h-4">{checkCircle}</Icon>
              </span>
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
              <h3 className="text-lg text-navy font-semibold flex items-center gap-2">
                <span className="text-accent shrink-0">
                  <Icon>{graduationCap}</Icon>
                </span>
                Anadolu University
              </h3>
              <span className="text-xs text-gray-light">2007 to 2014</span>
            </div>
            <p className="text-sm text-gray pl-7">Industrial Design</p>
          </div>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-1">
              <h3 className="text-lg text-navy font-semibold flex items-center gap-2">
                <span className="text-accent shrink-0">
                  <Icon>{graduationCap}</Icon>
                </span>
                Adam Mickiewicz University
              </h3>
              <span className="text-xs text-gray-light">2011 to 2012</span>
            </div>
            <p className="text-sm text-gray pl-7">Graphic Design, exchange programme</p>
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
