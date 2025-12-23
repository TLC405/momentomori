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
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        tactical: {
          amber: "hsl(var(--tactical-amber))",
          "amber-dim": "hsl(var(--tactical-amber-dim))",
          crimson: "hsl(var(--tactical-crimson))",
          olive: "hsl(var(--tactical-olive))",
          steel: "hsl(var(--tactical-steel))",
          black: "hsl(var(--tactical-black))",
          dark: "hsl(var(--tactical-dark))",
          darker: "hsl(var(--tactical-darker))",
        },
        danger: {
          low: "hsl(var(--danger-low))",
          medium: "hsl(var(--danger-medium))",
          high: "hsl(var(--danger-high))",
          extreme: "hsl(var(--danger-extreme))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px hsl(var(--tactical-amber) / 0.5)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px hsl(var(--tactical-amber) / 0.8)" },
        },
        "radar-sweep": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "marker-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "connection-draw": {
          "0%": { strokeDashoffset: "100%" },
          "100%": { strokeDashoffset: "0%" },
        },
        "glow-pulse": {
          "0%, 100%": { filter: "drop-shadow(0 0 5px currentColor)" },
          "50%": { filter: "drop-shadow(0 0 15px currentColor)" },
        },
        // ULTRA-PREMIUM ANIMATIONS - "If it ain't movin', it ain't LIVIN'!" — Sgt. Payne
        "smoke-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.6" },
          "50%": { transform: "translateY(-15px) scale(1.2)", opacity: "0.3" },
          "100%": { transform: "translateY(-30px) scale(1.5)", opacity: "0" },
        },
        "flag-wave": {
          "0%, 100%": { transform: "skewX(0deg) scaleX(1)" },
          "25%": { transform: "skewX(-3deg) scaleX(0.95)" },
          "75%": { transform: "skewX(3deg) scaleX(1.05)" },
        },
        "water-ripple": {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        "firefly-float": {
          "0%, 100%": { transform: "translate(0, 0)", opacity: "0.3" },
          "25%": { transform: "translate(5px, -8px)", opacity: "0.8" },
          "50%": { transform: "translate(-3px, -12px)", opacity: "0.5" },
          "75%": { transform: "translate(-6px, -5px)", opacity: "0.9" },
        },
        "storm-flash": {
          "0%, 90%, 100%": { opacity: "0" },
          "92%, 94%": { opacity: "1" },
          "93%, 95%": { opacity: "0" },
          "96%": { opacity: "0.8" },
        },
        "compass-spin": {
          "from": { transform: "rotate(0deg)" },
          "to": { transform: "rotate(360deg)" },
        },
        "scroll-unroll": {
          "0%": { transform: "scaleY(0) translateY(-20px)", opacity: "0" },
          "100%": { transform: "scaleY(1) translateY(0)", opacity: "1" },
        },
        "ember-float": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(-30px) rotate(180deg)", opacity: "0" },
        },
        "mist-drift": {
          "0%, 100%": { transform: "translateX(0)", opacity: "0.3" },
          "50%": { transform: "translateX(20px)", opacity: "0.5" },
        },
        "beacon-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--tactical-amber) / 0.7)" },
          "50%": { boxShadow: "0 0 0 15px hsl(var(--tactical-amber) / 0)" },
        },
        "danger-throb": {
          "0%, 100%": { transform: "scale(1)", filter: "brightness(1)" },
          "50%": { transform: "scale(1.05)", filter: "brightness(1.3)" },
        },
        "radar-ping": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(3)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "radar-sweep": "radar-sweep 8s linear infinite",
        "marker-pulse": "marker-pulse 2s ease-out infinite",
        "connection-draw": "connection-draw 1s ease-out forwards",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        // Premium animations
        "smoke-rise": "smoke-rise 3s ease-out infinite",
        "flag-wave": "flag-wave 1.5s ease-in-out infinite",
        "water-ripple": "water-ripple 3s ease-out infinite",
        "firefly": "firefly-float 4s ease-in-out infinite",
        "storm-flash": "storm-flash 5s ease-in-out infinite",
        "compass-spin": "compass-spin 20s linear infinite",
        "scroll-unroll": "scroll-unroll 0.3s ease-out forwards",
        "ember": "ember-float 1.5s ease-out infinite",
        "mist": "mist-drift 8s ease-in-out infinite",
        "beacon": "beacon-pulse 2s ease-in-out infinite",
        "danger-throb": "danger-throb 0.8s ease-in-out infinite",
        "radar-ping": "radar-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;