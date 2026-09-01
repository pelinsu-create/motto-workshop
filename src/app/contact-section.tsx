import type { CSSProperties } from "react";
import { caveat } from "./notebook-font";
import { TrackedCTA } from "./tracked-cta";

/* The one Get in touch block, used on every page that offers contact.
   Post-it treatment matches the notebook system; actions stay identical
   site-wide: email first, booking second, CV last. */
export default function ContactSection() {
  return (
    <section className="py-16 doodle-divider">
      <h2 className={`${caveat.className} notebook-heading font-semibold text-3xl md:text-4xl text-navy mb-6`}>
        Get in touch
      </h2>
      <div
        className="note inline-block bg-note-cream p-6 sm:p-7 mt-2"
        style={{ "--tilt": "0.7deg" } as CSSProperties}
      >
        <p className="text-gray leading-relaxed mb-6 max-w-xl">
          Hiring a senior product designer, or want to talk about a project?
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:pelinsu@mottoworkshop.com"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-navy btn-press"
          >
            pelinsu@mottoworkshop.com
          </a>
          <TrackedCTA
            event="contact_book_call"
            className="inline-block border border-border text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-lavender btn-press"
          >
            Book a call
          </TrackedCTA>
          <a
            href="/Pelinsu_Pelit_CV.pdf"
            className="inline-block border border-border text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-lavender btn-press"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
