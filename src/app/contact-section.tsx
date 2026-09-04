import type { CSSProperties } from "react";
import { TrackedCTA } from "./tracked-cta";

/* The one Get in touch block, used on every page that offers contact.
   Post-it treatment matches the notebook system; actions stay identical
   site-wide: email first, booking second, CV last. */
export default function ContactSection() {
  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl md:text-3xl text-navy mb-6">
        Get in touch
      </h2>
      <div>
      <div
        className="note inline-block bg-note-cream p-6 sm:p-7 mt-2"
        style={{ "--tilt": "0.7deg" } as CSSProperties}
      >
        <p className="text-gray leading-relaxed mb-3 max-w-xl">
          Hiring for a senior or lead design role, or want to talk about a project?
        </p>
        <p className="text-sm text-gray leading-relaxed mb-6 max-w-xl">
          I read every message myself and reply within a day. If you can, say what the
          work is and when you need to decide. That is usually enough for me to tell you
          whether I am the right person for it.
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
            Book a 20-minute call
          </TrackedCTA>
          <TrackedCTA
            event="contact_cv"
            href="/Pelinsu_Pelit_CV.pdf"
            newTab
            className="inline-block border border-border text-navy px-6 py-3 rounded-lg text-sm font-medium hover:bg-lavender btn-press"
          >
            CV (PDF)
          </TrackedCTA>
        </div>
      </div>
      </div>
    </section>
  );
}
