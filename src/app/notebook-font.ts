import { Caveat } from "next/font/google";

// Hand-lettered heading font for the dotted notebook pages (/about and
// /workshop) only. Self-hosted through next/font. Applied to section
// headings, never to body text.
export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
