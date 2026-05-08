import type { Metadata } from "next";
import "./globals.css";

/**
 * [TRIAD_LAYOUT] Root layout for the Triad / benchmark-intel landing.
 * Sets editorial defaults: paper background, ink type, IBM Plex via globals.css.
 */

export const metadata: Metadata = {
  title: "Triad — the standing record of who is fastest, cheapest, and most correct in AI",
  description:
    "Triad is a three-layer benchmark intelligence service for AI engineers. We aggregate LLM, Agent, and Harness benchmarks across sources, normalise them into a single scoreboard, and publish a footnoted weekly digest.",
  metadataBase: new URL("https://benchmark-intel.prin7r.com"),
  openGraph: {
    title: "Triad — Cross-source benchmark intelligence",
    description:
      "Three layers (LLMs, Agents, Harnesses), cross-source normalised, footnoted, published weekly.",
    type: "website",
    url: "https://benchmark-intel.prin7r.com"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
