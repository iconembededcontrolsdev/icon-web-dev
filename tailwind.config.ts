import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e27',      // Deep navy blue-black
        foreground: '#e8edf4',      // Soft white with blue tint
        card: '#141b2d',            // Rich dark blue
        'card-light': '#f5f7fa',    // Light gray-blue for image backgrounds
        'card-foreground': '#f0f4f8',
        primary: '#4f8fff',         // Vibrant sky blue
        'primary-foreground': '#ffffff',
        accent: '#ff6b35',          // Warm coral orange
        'accent-hover': '#ff5722',
        muted: '#8b96a8',           // Cool gray-blue
        border: '#1e2842',          // Subtle blue-gray border
      },
      fontFamily: {
        sans: ['SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config;
