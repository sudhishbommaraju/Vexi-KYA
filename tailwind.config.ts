/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", "var(--font-sans)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        surface2: "var(--surface2)",
        border: "var(--border)",
        textPrimary: "var(--textPrimary)",
        textSecondary: "var(--textSecondary)",
        textMuted: "var(--textMuted)",
        accent: "var(--accent)",
        accentSoft: "var(--accentSoft)",
        
        // Aliases for standard mapping without breaking older components
        panel: "var(--surface)",
        card: "var(--surface2)",
        primary: "var(--textPrimary)",
        secondary: "var(--textSecondary)",
        muted: "var(--textMuted)",
        hover: "var(--surface2)",
      },
    },
  },
  plugins: [],
}
