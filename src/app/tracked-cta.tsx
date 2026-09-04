"use client";

import { track } from "@vercel/analytics";

export const BOOKING_URL = "https://calendar.app.google/K83wsdYJEWv5mWh47";

export function TrackedCTA({
  children,
  event,
  className,
  href = BOOKING_URL,
  newTab = false,
}: {
  children: React.ReactNode;
  event: string;
  className?: string;
  /** Defaults to the booking call. Pass an href so every offer is not
   *  funnelled into the same twenty minute conversation. */
  href?: string;
  /** Opens a same origin file, such as the CV, in a new tab so the
   *  visitor keeps the page they were reading. */
  newTab?: boolean;
}) {
  const external = href.startsWith("http") || newTab;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      onClick={() => track(event)}
    >
      {children}
    </a>
  );
}
