import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        'inter': ['Inter', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // APEX Executive Primary Colors
        "charcoal-black": "hsl(var(--charcoal-black))",
        "electric-blue": "hsl(var(--electric-blue))",
        "electric": "hsl(var(--electric))",
        "pure-white": "hsl(var(--pure-white))",
        
        // APEX Executive Secondary Colors
        "slate-gray": "hsl(var(--slate-gray))",
        "light-gray": "hsl(var(--light-gray))",
        "success-green": "hsl(var(--success-green))",
        "warning-amber": "hsl(var(--warning-amber))",
        "error-red": "hsl(var(--error-red))",
        
        // Design System Tokens
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        electric: {
          DEFAULT: "hsl(var(--electric))",
          foreground: "hsl(var(--electric-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        },
        "button-press": {
          "0%": {
            transform: "scale(1)"
          },
          "50%": {
            transform: "scale(0.95)"
          },
          "100%": {
            transform: "scale(1)"
          }
        },
        "success-check": {
          "0%": {
            transform: "scale(0)",
            opacity: "0"
          },
          "50%": {
            transform: "scale(1.1)",
            opacity: "1"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "button-press": "button-press 0.1s ease-out",
        "success-check": "success-check 0.3s ease-out",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'executive': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'executive-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'electric': '0 2px 8px rgba(0, 102, 255, 0.2)',
        'electric-hover': '0 4px 12px rgba(0, 102, 255, 0.3)',
        'feature-card': '0 8px 24px rgba(0, 102, 255, 0.2)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
