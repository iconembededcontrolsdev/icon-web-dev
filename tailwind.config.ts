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
        bg: '#F8F9FA',           // Soft off-white background
        card: '#FFFFFF',          // Pure white cards
        text: '#1A1A2E',          // Deep navy text
        muted: '#6B7280',         // Refined gray for secondary text
        accent: '#C9A961',        // Champagne gold accent
        'accent-hover': '#B8964E', // Darker gold on hover
        primary: '#1A1A2E',       // Deep navy primary
        'primary-light': '#2D2D44', // Lighter navy
        secondary: '#8B7355',     // Warm bronze
        'secondary-light': '#A68968', // Light bronze
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
