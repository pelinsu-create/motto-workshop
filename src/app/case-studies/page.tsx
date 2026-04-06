import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies | Motto Workshop",
  description:
    "Real projects built with the GROUND research-to-product methodology.",
};

export default function CaseStudies() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="py-24 md:py-32">
        <p className="section-label mb-4">Case Studies</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-6">
          From Research to Product
        </h1>
        <p className="text-lg text-gray max-w-xl leading-relaxed mb-12">
          Real projects built with the GROUND methodology. Each case study shows
          the full process: research, synthesis, storyboarding, and
          product development.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/case-studies/fluffy-score"
            className="group bg-surface border border-border rounded-xl p-6 hover:border-accent transition-colors"
          >
            <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">
              AI Product &middot; UX Research
            </p>
            <h2 className="text-xl text-navy mb-2 group-hover:text-accent transition-colors">
              Fluffy Score
            </h2>
            <p className="text-sm text-gray leading-relaxed mb-4">
              5 years of cat sitting + veterinary behavior science = an
              AI-powered home assessment tool. From field research to working
              product.
            </p>
            <span className="text-sm text-accent font-medium">
              Read case study &rarr;
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
