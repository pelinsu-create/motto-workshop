import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bias Checker | Motto Workshop",
  description:
    "Check your discussion guide, survey or screener before fieldwork. A free linter that flags 20 UX research biases in your questions and suggests minimal rewrites. No account, nothing stored.",
};

export default function BiasCheckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
