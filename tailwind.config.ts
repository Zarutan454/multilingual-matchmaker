import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1a365d",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#c69963",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#9b87f5",
          hover: "#7E69AB",
        },
        neutral: {
          100: "#f7f7f7",
          200: "#eaeaea",
          300: "#dddddd",
          400: "#cccccc",
        },
      },
      fontFamily: {
        sans: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.9))',
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-5px) translateX(5px)" },
          "50%": { transform: "translateY(-8px) translateX(-5px)" },
          "75%": { transform: "translateY(-5px) translateX(5px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        }
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "float": "float 6s ease-in-out infinite",
        "pulse": "pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;