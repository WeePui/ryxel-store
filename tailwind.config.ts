import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import scrollbarHide from 'tailwind-scrollbar-hide';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { max: '639px' },
      md: { min: '640px', max: '767px' },
      lg: { min: '768px', max: '1023px' },
      xl: { min: '1024px', max: '1279px' },
      '2xl': { min: '1280px' },
    },
    extend: {
      colors: {
        primary: {
          default: '#304B65',
          50: '#E6F0F7',
          100: '#CFDEF2',
          200: '#92B9E3',
          300: '#6293C2',
          400: '#486E92',
          500: '#304B65',
          600: '#192A3B',
          700: '#08121B',
          800: '#04080D',
          900: '#020406',
        },
        secondary: {
          default: '#6B7280',
          50: '#FAFBFC',
          100: '#F9FAFB',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        tertiary: {
          default: '#653A30',
          50: '#FDF8F7',
          100: '#F5E1D4',
          200: '#E9B280',
          300: '#BD8D5F',
          400: '#906B47',
          500: '#653A30',
          600: '#3D2C1B',
          700: '#190F07',
          800: '#0E0805',
          900: '#070402',
        },
        grey: {
          default: '#47494B',
          50: '#EDEEEF',
          100: '#DBDDDF',
          200: '#B2B6BA',
          300: '#8C9093',
          400: '#696B6E',
          500: '#47494B',
          600: '#28292B',
          700: '#101112',
          800: '#060607',
          900: '#030303',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
        title: ['var(--font-kanit)', 'sans-serif'],
      },
    },
  },
  plugins: [forms, typography, scrollbarHide],
} satisfies Config;
