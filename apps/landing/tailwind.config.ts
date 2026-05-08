import type { Config } from "tailwindcss";

/**
 * [TRIAD_TAILWIND] Locked tokens for the benchmark-intel landing.
 * Refresh 2026-05-08 — palette + type lifted from the Anthropic reference
 * (canvas swapped to milky #FAFAF8 per no-beige rule). Source of truth lives
 * in /DESIGN.md sections 4-6.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2.5rem" }
    },
    extend: {
      colors: {
        // Anthropic-derived neutrals (canvas swapped to milky #FAFAF8)
        paper: "#FAFAF8",
        "paper-2": "#F0EEE6",
        "paper-3": "#E8E6DC",
        oat: "#E3DACC",
        "cloud-light": "#D1CFC5",
        "cloud-medium": "#B0AEA5",
        "cloud-dark": "#87867F",
        "slate-light": "#5E5D59",
        "slate-medium": "#3D3D3A",
        "slate-dark": "#141413",
        // Triad's existing graphite ink chain (kept for tabular numerics)
        ink: "#14171C",
        graphite: "#2A2D33",
        rule: "#B0AEA5",
        muted: "#87867F",
        // Triad semantic accents
        signal: "#F2C744",
        cinnabar: "#C13A2A",
        tide: "#2D5C5A",
        // Anthropic accent reserve
        clay: "#D97757"
      },
      fontFamily: {
        // Plex Serif retained as Anthropic-Serif analog (display); Plex Sans = Anthropic Sans body
        display: ['"IBM Plex Serif"', "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"]
      },
      maxWidth: {
        prose: "1200px",
        narrow: "880px"
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        md: "8px",
        lg: "16px",
        "2xl": "24px",
        full: "9999px"
      },
      letterSpacing: {
        tightest: "-0.018em",
        ledger: "0.18em"
      },
      fontSize: {
        // Display swapped to Anthropic 91px / 1.1 ratio
        display: ["clamp(64px, 9vw, 91px)", { lineHeight: "1.1", letterSpacing: "-0.022em" }],
        // h1 = Anthropic 61px / 1.1 / -1.22px
        h1: ["clamp(40px, 6vw, 61px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["48px", { lineHeight: "1.05", letterSpacing: "-0.014em" }],
        h3: ["24px", { lineHeight: "1.3", letterSpacing: "-0.005em" }]
      }
    }
  },
  plugins: []
};

export default config;
