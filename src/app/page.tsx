import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "./reveal";
import HoverGif from "./hover-gif";
import { TrackedCTA } from "./tracked-cta";
import ContactSection from "./contact-section";

const work = [
  {
    href: "/work/turkish-airlines",
    tilt: "-0.7deg",
    stick: "3deg",
    img: "/work/thumb-cargo-5.jpg",
    anim: "/work/anim-cargo.mp4",
    imgAlt: "Pastel 3D illustration of an air cargo scene with a plane and freight containers",
    tag: "Product Design",
    title: "Designing logistics products people are paid to use",
    year: "2025 to 2026",
    blurb:
      "Terminal charges, warehouse fees and loadability for Turkish Cargo, shipped inside a live design system.",
  },
  {
    href: "/work/liz-smart-office",
    tilt: "0.5deg",
    stick: "-2.5deg",
    img: "/work/thumb-liz-5.jpg",
    anim: "/work/anim-liz.mp4",
    imgAlt: "Pastel 3D illustration of a hybrid office room with desks and a meeting booth",
    tag: "Enterprise SaaS",
    title: "Simplifying hybrid working, from booking to admin insights",
    year: "2021 to 2022",
    blurb:
      "Booker app usability, an admin insights page, and a Teams app on the Microsoft component library.",
  },
  {
    href: "/case-studies/fluffy-score",
    tilt: "-0.4deg",
    stick: "2.5deg",
    img: "/work/thumb-fluffy-5.jpg",
    anim: "/work/anim-fluffy.mp4",
    imgAlt: "Pastel 3D illustration of a cat on a climbing tree, from the Fluffy Score app",
    tag: "AI Product",
    title: "Fluffy Score: an AI home assessment tool",
    year: "2026",
    blurb:
      "Five years of field research, taken to a working product I built myself.",
  },
  {
    href: "/work/stakeholder-map",
    tilt: "0.6deg",
    stick: "-3deg",
    img: "/work/thumb-stakeholder-2.jpg",
    anim: "/work/anim-stakeholder.mp4",
    imgAlt: "Pastel 3D illustration of wind turbines and solar panels connected by a network",
    tag: "Research",
    title: "87 stakeholders, three company types, one map",
    year: "2025 to 2026",
    blurb:
      "The client used it to decide which roles their product should support first.",
  },
  {
    href: "/work/soft-start",
    tilt: "-0.5deg",
    stick: "2deg",
    img: "/work/thumb-workshop-2.jpg",
    anim: "/work/anim-workshop.mp4",
    imgAlt: "Pastel 3D illustration of a workshop room with a sticky note wall and round table",
    tag: "Facilitation",
    title: "Getting a room ready in the first twenty minutes",
    year: "2024",
    blurb:
      "Three AI-assisted exercises for the first twenty minutes, kept as the standard opener.",
  },
];

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Hero: the intro lives on a sticky note wall */}
      <section className="py-24 md:py-32">
        <p className="section-label mb-4 fade-rise">Senior Product Designer</p>
        <h1
          className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-10 fade-rise"
          style={{ animationDelay: "70ms" }}
        >
          I design the products
          <br className="hidden md:block" /> people use to do their jobs.
        </h1>
        <div
          className="flex flex-col gap-10 md:flex-row md:items-start md:gap-8 mb-10 fade-rise"
          style={{ animationDelay: "140ms" }}
        >
          <div
            className="note bg-note-cream p-6 md:p-7 md:max-w-xl"
            style={{ "--tilt": "-1.2deg" } as CSSProperties}
          >
            <span className="tape" aria-hidden="true" />
            <p className="text-lg text-navy-mid leading-relaxed">
              Ten years in fintech, travel, logistics and energy. I design end to end, run
              my own research, and work inside existing design systems. I use AI heavily for
              discovery and prototyping, and I check what it generates against the design
              system before it goes anywhere.
            </p>
          </div>
          <div
            className="polaroid shrink-0 self-center md:self-auto md:mt-3"
            style={{ "--tilt": "2.4deg" } as CSSProperties}
          >
            <span className="tape" aria-hidden="true" />
            <Image
              src="/pelinsu.jpg"
              alt="Pelinsu Pelit"
              width={480}
              height={480}
              priority
              className="w-32 h-32 md:w-36 md:h-36 object-cover"
            />
            <p className="text-sm font-medium text-navy text-center mt-2 flex items-center justify-center gap-1.5">
              <svg className="w-4 h-4 text-gray -scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19c6 1 12-2 15-11" />
                <path d="M15.5 9.5 19 8l.5 3.8" />
              </svg>
              Pelinsu
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 fade-rise" style={{ animationDelay: "210ms" }}>
          <Link
            href="/work"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy btn-press"
          >
            See five projects
          </Link>
          <TrackedCTA
            event="hero_book_call"
            className="inline-block border border-border text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-lavender btn-press"
          >
            Book a call
          </TrackedCTA>
        </div>
      </section>

      {/* What I do: three notes pinned under the hero */}
      <section className="py-16 border-t border-border">
        <h2 className="text-2xl md:text-3xl text-navy mb-10">How I Work</h2>
        <div className="grid gap-8 md:grid-cols-3 md:gap-5">
          <Reveal className="h-full">
            <div className="note h-full bg-surface p-6" style={{ "--tilt": "-1.4deg" } as CSSProperties}>
              <span className="tape" aria-hidden="true" />
              <Image src="/home/icon-research.jpg" alt="" width={96} height={96} className="w-12 h-12 rounded-lg object-cover mb-3" aria-hidden="true" />
              <h3 className="text-lg text-navy font-semibold mb-2">Research</h3>
              <p className="text-sm text-navy-mid leading-relaxed">
                Interviews, observation, surveys and desk research, and I cite
                where every finding comes from.
              </p>
            </div>
          </Reveal>
          <Reveal delay={70} className="h-full">
            <div className="note h-full bg-surface p-6" style={{ "--tilt": "1.1deg" } as CSSProperties}>
              <Image src="/home/icon-facilitate.jpg" alt="" width={96} height={96} className="w-12 h-12 rounded-lg object-cover mb-3" aria-hidden="true" />
              <h3 className="text-lg text-navy font-semibold mb-2">Facilitate</h3>
              <p className="text-sm text-navy-mid leading-relaxed">
                More than twenty workshops: kickoffs, journey mapping, innovation
                sprints.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140} className="h-full">
            <div className="note h-full bg-surface p-6" style={{ "--tilt": "-0.8deg" } as CSSProperties}>
              <span className="tape" aria-hidden="true" />
              <Image src="/home/icon-build.jpg" alt="" width={96} height={96} className="w-12 h-12 rounded-lg object-cover mb-3" aria-hidden="true" />
              <h3 className="text-lg text-navy font-semibold mb-2">Build</h3>
              <p className="text-sm text-navy-mid leading-relaxed">
                The Bias Checker and the workshop games on this site are things
                I built.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-12">
          <div
            className="note inline-block bg-note-cream px-6 py-5 max-w-2xl"
            style={{ "--tilt": "0.8deg" } as CSSProperties}
          >
            <span className="tape" aria-hidden="true" />
            <p className="text-base text-navy-mid leading-relaxed">
              I also spent five years cat sitting, in more than 50 homes. When I want
              to understand something, I end up building a small version of it.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Selected work: a journal spread the project post-its are pinned onto */}
      <section className="py-14 border-t border-border">
        <div className="notebook-page relative px-5 sm:px-8 py-10">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-2xl md:text-3xl text-navy">Selected Work</h2>
          <Link href="/work" className="text-sm text-accent font-medium hover:text-navy transition-colors">
            All work <span className="arrow-nudge" aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="space-y-6">
          {work.map((item, i) => (
            <Reveal key={item.href} delay={Math.min(i * 70, 210)}>
              <Link
                href={item.href}
                className="group note flex items-center bg-surface"
                style={{ "--tilt": item.tilt } as CSSProperties}
              >
                <div className="flex-1 min-w-0 p-6">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <p className="text-xs font-semibold text-gray uppercase tracking-wider">
                      {item.tag}
                    </p>
                    <span className="text-xs text-gray shrink-0">{item.year}</span>
                  </div>
                  <h3 className="text-xl text-navy mb-2 group-hover:underline decoration-2 underline-offset-4">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray leading-relaxed">{item.blurb}</p>
                </div>
                <div className="hidden sm:block shrink-0 py-4 pr-2 -mr-3 md:-mr-4">
                  <div
                    className="sticker relative w-44 h-32 md:w-52 md:h-36"
                    style={{ "--stick": item.stick } as CSSProperties}
                  >
                    <HoverGif
                      staticSrc={item.img}
                      animSrc={item.anim}
                      alt={item.imgAlt}
                      sizes="208px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* Contact sits ahead of the workshop so the hiring path is unobstructed */}
      <ContactSection />

      {/* Workshop and tools, demoted below the hiring path, on its own
          journal spread so it matches the Selected Work section */}
      <section className="py-14 border-t border-border">
        <div className="notebook-page relative px-5 sm:px-8 py-10">
        <p className="section-label mb-3">Also available</p>
        <h2 className="text-2xl md:text-3xl text-navy mb-8">Workshop and tools</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Reveal className="h-full">
            <div
              className="note flex flex-col h-full bg-surface"
              style={{ "--tilt": "-0.6deg" } as CSSProperties}
            >
            <Image
              src="/work/icon-sprint.jpg"
              alt="Pastel 3D puzzle piece icon"
              width={800}
              height={800}
              className="h-36 object-cover m-4 mb-0 rounded-lg"
              style={{ width: "calc(100% - 2rem)" }}
            />
            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-xl text-navy mb-2">Research Sprint</h3>
              <p className="text-sm text-gray leading-relaxed mb-5 flex-1">
                A three hour hands-on sprint for teams that do research. We practice
                what to hand to AI, what to keep, and how to check what comes back,
                with games I built for it.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/workshop"
                  className="inline-block bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-navy btn-press"
                >
                  About the workshop
                </Link>
                <Link
                  href="/games"
                  className="inline-block border border-border text-navy px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-lavender btn-press"
                >
                  Play the games <span className="arrow-nudge" aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            </div>
          </Reveal>
          <Reveal delay={80} className="h-full">
              <div
                className="note flex flex-col h-full bg-surface"
                style={{ "--tilt": "0.8deg" } as CSSProperties}
              >
                <Image
                  src="/work/icon-bias.jpg"
                  alt="Pastel 3D balance scale icon"
                  width={800}
                  height={800}
                  className="h-36 object-cover m-4 mb-0 rounded-lg"
                  style={{ width: "calc(100% - 2rem)" }}
                />
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl text-navy mb-2">Guide Builder + Bias Checker</h3>
                  <p className="text-sm text-gray leading-relaxed mb-5 flex-1">
                    Describe your research goal and it drafts an interview guide, survey
                    or screener. Then one click checks the draft, or any guide you paste,
                    against 20 research biases and suggests a minimal fix for each
                    problem. No account needed.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/bias-check"
                      className="inline-block bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-navy btn-press"
                    >
                      Try the tool
                    </Link>
                  </div>
                </div>
              </div>
          </Reveal>
        </div>
        </div>
      </section>
    </div>
  );
}
