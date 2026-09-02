import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XYZ Hypothesis Builder | Motto Workshop",
  description:
    "Turn a product idea or a pasted research insight into a testable hypothesis: at least X% of Y will Z. Get a matching pretotype and set kill criteria before you test. Free, no account, nothing stored.",
};

export default function XyzLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
