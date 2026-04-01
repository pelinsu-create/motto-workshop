"use client";

import { track } from "@vercel/analytics";

export function TrackedCTA({
  children,
  event,
  className,
}: {
  children: React.ReactNode;
  event: string;
  className?: string;
}) {
  return (
    <a
      href="https://calendar.app.google/K83wsdYJEWv5mWh47"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track(event)}
    >
      {children}
    </a>
  );
}
