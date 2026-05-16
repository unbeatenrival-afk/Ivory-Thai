/**
 * Tailwind CSS Configuration
 * Custom theme for Ivory Thai 3D website
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        // Siam Gold & Jade Premium Palette
        jade: {
          50: "#F0F9F4",
          100: "#DCF3E5",
          200: "#B9E7CB",
          300: "#87D4A8",
          400: "#4FB881",
          500: "#2A9D5F",
          600: "#1E7D4A",
          700: "#17633B",
          800: "#134F30",
          900: "#0F4127",
          950: "#082519",
        },
        gold: {
          50: "#FFFEF0",
          100: "#FEF9D3",
          200: "#FDF2A7",
          300: "#FCE870",
          400: "#F9D745",
          500: "#E6BA1E",
          600: "#D4AF37",
          700: "#B08A1C",
          800: "#916E1A",
          900: "#7A5B1C",
          950: "#47330C",
        },
        chilli: {
          50: "#FEF2F2",
          100: "#FEE5E5",
          200: "#FECFCF",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#E74C3C",
          600: "#C92A2A",
          700: "#A61E1E",
          800: "#8A1A1A",
          900: "#731C1C",
          950: "#450A0A",
        },
        plum: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#9F5AB8",
          600: "#7C3A9A",
          700: "#6B2F82",
          800: "#5A286B",
          900: "#4A2359",
          950: "#2E0F38",
        },
        charcoal: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
          950: "#0C0A09",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-dark': 'radial-gradient(ellipse 120% 80% at 50% 60%, #292524 0%, rgba(46, 15, 56, 0.15) 40%, #0C0A09 100%)',
        'hero-light': 'linear-gradient(135deg, #FFFEF0 0%, rgba(254, 249, 211, 0.6) 50%, rgba(240, 249, 244, 0.4) 100%)',
        'section-subtle': 'linear-gradient(180deg, #1C1917 0%, rgba(8, 37, 25, 0.03) 100%)',
        'brand-gradient': 'linear-gradient(135deg, #2A9D5F 0%, #D4AF37 100%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        '4xl': '2rem',
      },
      boxShadow: {
        'premium-sm': '0 1px 3px rgba(28, 25, 23, 0.1), 0 1px 2px rgba(28, 25, 23, 0.06)',
        'premium': '0 10px 25px rgba(28, 25, 23, 0.1), 0 4px 6px rgba(28, 25, 23, 0.05)',
        'premium-lg': '0 20px 50px rgba(28, 25, 23, 0.15), 0 8px 16px rgba(28, 25, 23, 0.08)',
        'premium-dark': '0 10px 25px rgba(12, 10, 9, 0.4), 0 4px 6px rgba(12, 10, 9, 0.3)',
        'gold-glow': '0 0 40px rgba(212, 175, 55, 0.15)',
        'jade-glow': '0 0 30px rgba(42, 157, 95, 0.12)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        "shimmer": {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        "glow": {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        "rotate-slow": {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "glow": "glow 2s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
      },
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
};

export default config;
