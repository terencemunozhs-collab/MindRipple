/**
 * Tailwind CSS configuration file.
 * Note: In Tailwind v4, most configuration is handled in index.css via @theme.
 * This file is included for compatibility and plugin setup.
 */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        indigo: {
          500: '#6366f1',
          600: '#4F46E5',
          700: '#4338ca',
        },
        teal: {
          500: '#14b8a6',
          600: '#0D9488',
        },
        slate: {
          800: '#1E293B',
        },
        gray: {
          50: '#F9FAFB',
          500: '#64748B',
        },
        red: {
          500: '#EF4444',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
