import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import "./globals.css";
import MobileNav from "./mobile-nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pelinsu Pelit | Senior Product Designer, Netherlands",
  description:
    "Senior product designer, ten years across fintech, travel, logistics and energy. Shipped work inside live design systems, research done first-hand, and AI brought into the practice without breaking it.",
  icons: {
    icon: [
      { url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%234A5AE8'/><text x='16' y='23' font-family='system-ui' font-size='20' font-weight='700' fill='white' text-anchor='middle'>p</text></svg>" },
    ],
  },
  openGraph: {
    title: "Pelinsu Pelit | Senior Product Designer, Netherlands",
    description:
      "Ten years across fintech, travel, logistics and energy. Shipped work, design systems, and AI in the practice.",
    type: "website",
    url: "https://www.mottoworkshop.com",
  },
  twitter: {
    card: "summary",
    title: "Pelinsu Pelit",
    description: "Senior Product Designer, Netherlands. Shipped work, design systems, and AI in the practice.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {/* Marks JS as available before paint. Scroll reveals only hide
            content behind this class, so a failed script load leaves the
            page fully visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <nav className="fixed top-0 w-full bg-surface/85 backdrop-blur-sm border-b border-border z-50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-navy font-semibold text-lg tracking-tight">
              Pelinsu Pelit
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray items-center">
              <Link href="/work" className="hover:text-navy transition-colors">
                Work
              </Link>
              <Link href="/about" className="hover:text-navy transition-colors">
                About
              </Link>
              <Link href="/services" className="hover:text-navy transition-colors">
                Services
              </Link>
              <a
                href="mailto:pelinsu@mottoworkshop.com"
                className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-navy transition-colors inline-block"
              >
                Get in touch
              </a>
            </div>

            {/* Mobile nav */}
            <MobileNav />
          </div>
        </nav>

        <Analytics />
        <main className="pt-20">{children}</main>

        <footer className="border-t border-border mt-32 py-12 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray">
            <p>&copy; {new Date().getFullYear()} Pelinsu Pelit</p>
            <div className="flex gap-6 items-center">
              <Link href="/work" className="hover:text-navy transition-colors">
                Work
              </Link>
              <Link href="/games" className="hover:text-navy transition-colors">
                Games
              </Link>
              <Link href="/design-system" className="hover:text-navy transition-colors">
                Design system
              </Link>
              <a
                href="mailto:pelinsu@mottoworkshop.com"
                className="text-accent hover:text-navy transition-colors"
              >
                pelinsu@mottoworkshop.com
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
