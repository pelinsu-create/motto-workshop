import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide Builder and Bias Checker | Motto Workshop",
  description:
    "Draft an interview guide, survey or screener from your research goal, then check it against 20 UX research biases before fieldwork. Neutral wording, behavior over opinion, minimal rewrites. No account, nothing stored.",
};

export default function BiasCheckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
