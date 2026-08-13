import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0c0e",
        bg2: "#101215",
        panel: "#141618",
        fg: "#ecece4",
        muted: "#8b8e94",
        line: "#25272b",
        accent: "#c6ff3d",
        accentDim: "#6b8f2a",
      },
      fontFamily: {
        display: ['"Archivo Black"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
