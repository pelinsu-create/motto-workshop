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
  title: "Motto Workshop | AI Collaboration Workshop",
  description:
    "Filter. Remix. Prototype. A 6-hour workshop where you learn to collaborate with AI as a thinking partner.",
  icons: {
    icon: [
      { url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%234A5AE8'/><text x='16' y='23' font-family='system-ui' font-size='20' font-weight='700' fill='white' text-anchor='middle'>m</text></svg>" },
    ],
  },
  openGraph: {
    title: "Motto Workshop | AI Collaboration Workshop",
    description: "Filter. Remix. Prototype. Learn to collaborate with AI as a thinking partner.",
    type: "website",
    url: "https://www.mottoworkshop.com",
  },
  twitter: {
    card: "summary",
    title: "Motto Workshop",
    description: "AI Collaboration Workshop — Filter. Remix. Prototype.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <nav className="fixed top-0 w-full bg-surface/80 backdrop-blur-sm border-b border-border z-50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-navy font-semibold text-lg tracking-tight">
              motto<span className="text-accent">workshop</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray items-center">
              <a href="#demo" className="hover:text-navy transition-colors">
                Workshop
              </a>
              <Link href="/lab" className="hover:text-navy transition-colors">
                Workshop Planner
              </Link>
              <a href="https://motto-games.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-navy transition-colors">
                Games
              </a>
              <a href="#about" className="hover:text-navy transition-colors">
                About
              </a>
              <a
                href="https://calendar.app.google/K83wsdYJEWv5mWh47"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-navy transition-colors"
              >
                Book a Call
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
            <p>
              &copy; {new Date().getFullYear()} Motto Workshop. Pelinsu Pelit
            </p>
            <a
              href="mailto:pelinsu@mottoworkshop.com"
              className="text-accent hover:text-navy transition-colors"
            >
              pelinsu@mottoworkshop.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
