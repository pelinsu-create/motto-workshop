import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

/** One full-width image with a caption beneath it. */
export function Figure({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  priority?: boolean;
}) {
  return (
    <figure className="my-8">
      <div className="rounded-xl overflow-hidden border border-border bg-surface">
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={900}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full h-auto"
        />
      </div>
      <figcaption className="text-xs text-gray-light mt-3">{caption}</figcaption>
    </figure>
  );
}

/** Embeds a live HTML artefact, with a link to open it full screen. */
export function LiveEmbed({
  src,
  title,
  caption,
  height = 620,
}: {
  src: string;
  title: string;
  caption: string;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <div className="rounded-xl overflow-hidden border border-border bg-surface">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          style={{ height }}
          className="w-full block"
        />
      </div>
      <figcaption className="text-xs text-gray-light mt-3 flex flex-wrap gap-x-3 gap-y-1 items-baseline">
        <span>{caption}</span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent font-medium hover:text-navy transition-colors"
        >
          Open full screen &rarr;
        </a>
      </figcaption>
    </figure>
  );
}

/** A grid of images. Captions sit under each tile. */
export function Gallery({
  items,
  columns = 2,
}: {
  items: { src: string; alt: string; caption: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`grid gap-4 my-8 ${
        columns === 3 ? "sm:grid-cols-2 md:grid-cols-3" : "sm:grid-cols-2"
      }`}
    >
      {items.map((it) => (
        <figure key={it.src}>
          <div className="rounded-lg overflow-hidden border border-border bg-surface">
            <Image
              src={it.src}
              alt={it.alt}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, 380px"
              className="w-full h-auto"
            />
          </div>
          <figcaption className="text-xs text-gray-light mt-2">{it.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function CaseHero({
  tags,
  title,
  standfirst,
  meta,
}: {
  tags: string;
  title: string;
  standfirst: string;
  meta: { label: string; value: string }[];
}) {
  return (
    <section className="py-20 md:py-28">
      <Link href="/work" className="text-sm text-accent font-medium hover:text-navy transition-colors">
        &larr; All work
      </Link>
      <p className="section-label mt-8 mb-4">{tags}</p>
      <h1 className="text-4xl md:text-5xl font-semibold text-navy leading-tight mb-6">{title}</h1>
      <p className="text-lg text-gray max-w-2xl leading-relaxed mb-10">{standfirst}</p>

      <dl className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5 border-t border-border pt-8">
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="text-xs font-semibold text-accent mb-1 uppercase tracking-wider">{m.label}</dt>
            <dd className="text-sm text-navy leading-relaxed">{m.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Block({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="py-14 border-t border-border">
      <h2 className="text-2xl md:text-3xl text-navy mb-6">{heading}</h2>
      <div className="space-y-4 text-gray leading-relaxed">{children}</div>
    </section>
  );
}

export function Pull({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 border-accent pl-6 my-8">
      <p className="text-xl md:text-2xl text-navy leading-snug font-serif">{children}</p>
    </blockquote>
  );
}

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="space-y-5 mt-2">
      {items.map((s, i) => (
        <li key={s.title} className="flex gap-4">
          <span className="shrink-0 w-7 h-7 rounded-full bg-accent-light text-accent text-xs font-semibold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <div>
            <p className="text-navy font-semibold text-base mb-1">{s.title}</p>
            <p className="text-sm text-gray leading-relaxed">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Findings({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="space-y-4 mt-2">
      {items.map((f) => (
        <div key={f.title} className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-lg text-navy font-semibold mb-2">{f.title}</h3>
          <p className="text-sm text-gray leading-relaxed">{f.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Outcomes({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 mt-2">
      {items.map((o) => (
        <li key={o} className="flex gap-3 items-start">
          <span className="text-accent mt-0.5">&#10003;</span>
          <span className="text-navy text-sm leading-relaxed">{o}</span>
        </li>
      ))}
    </ul>
  );
}

export function NextCase({ href, title }: { href: string; title: string }) {
  return (
    <section className="py-14 border-t border-border">
      <Link href={href} className="group block">
        <p className="text-xs font-semibold text-gray uppercase tracking-wider mb-2">Next project</p>
        <p className="text-2xl text-navy group-hover:underline decoration-2 underline-offset-4 font-serif">
          {title} &rarr;
        </p>
      </Link>
    </section>
  );
}
