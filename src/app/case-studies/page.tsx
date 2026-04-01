import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Motto Workshop",
  description: "Real workshop outcomes and team transformations. Coming soon.",
};

export default function CaseStudies() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="py-24 md:py-32 min-h-[60vh] flex flex-col justify-center">
        <p className="section-label mb-4">Coming Soon</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-6">
          Case Studies
        </h1>
        <p className="text-lg text-gray max-w-xl leading-relaxed mb-8">
          Real workshop outcomes from teams that used this process.
          Currently working with early clients. Case studies will be published here.
        </p>
        <p className="text-sm text-gray max-w-xl leading-relaxed mb-8">
          In the meantime, check out example scenarios on the{" "}
          <a href="/#services" className="text-accent hover:text-navy transition-colors underline">services page</a> to
          see how a typical engagement works.
        </p>

        <a
          href="https://calendar.app.google/K83wsdYJEWv5mWh47"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy transition-colors w-fit"
        >
          Book a Call
        </a>
      </section>
    </div>
  );
}
