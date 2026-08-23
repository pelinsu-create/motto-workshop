import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workshop Toolkits | Motto Workshop",
  description: "Activity library, persona panels, and facilitation guides with built in AI. Coming soon.",
};

export default function Toolkits() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="py-24 md:py-32 min-h-[60vh] flex flex-col justify-center">
        <p className="section-label mb-4">Coming Soon</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-6">
          Workshop Toolkits
        </h1>
        <p className="text-lg text-gray max-w-xl leading-relaxed mb-8">
          An activity library, persona panels, and facilitation guides
          with built in AI where it helps. Enough to run a focused workshop without me in the room.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-2xl">
          {[
            { title: "Activity Library", desc: "8 AI powered exercises with prompt templates and fallbacks" },
            { title: "Persona Panels", desc: "14 AI personas including users, stakeholders, experts, and provocateurs" },
            { title: "Facilitation Guides", desc: "Step by step scripts for every workshop kit" },
          ].map((item) => (
            <div key={item.title} className="bg-surface border border-border rounded-lg p-4">
              <h3 className="text-sm font-semibold text-navy mb-1">{item.title}</h3>
              <p className="text-xs text-gray leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <a
          href="https://calendar.app.google/K83wsdYJEWv5mWh47"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors w-fit"
        >
          Book a call about early access
        </a>
      </section>
    </div>
  );
}
