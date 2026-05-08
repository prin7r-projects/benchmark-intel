import type { Config } from "tailwindcss";

/**
 * [TRIAD_TAILWIND] Locked tokens for the benchmark-intel landing.
 * Source of truth for the Triad palette + Plex type system.
 * Mirrored in `app/globals.css` and documented in /DESIGN.md sections 4-6.
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
        paper: "#FAFAF8",
        "paper-2": "#F0EFEC",
        ink: "#14171C",
        graphite: "#2A2D33",
        rule: "#B7B0A0",
        muted: "#6E6A60",
        signal: "#F2C744",
        cinnabar: "#C13A2A",
        tide: "#2D5C5A"
      },
      fontFamily: {
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
        full: "9999px"
      },
      letterSpacing: {
        tightest: "-0.018em",
        ledger: "0.18em"
      },
      fontSize: {
        display: ["96px", { lineHeight: "0.94", letterSpacing: "-0.022em" }],
        h2: ["48px", { lineHeight: "1.05", letterSpacing: "-0.014em" }]
      }
    }
  },
  plugins: []
};

export default config;
