/** @type {import('tailwindcss').Config} */

const colors = {
  gray: {
    0: 'var(--gray-0)',
    50: 'var(--gray-50)',
    100: 'var(--gray-100)',
    200: 'var(--gray-200)',
    300: 'var(--gray-300)',
    400: 'var(--gray-400)',
    500: 'var(--gray-500)',
    600: 'var(--gray-600)',
    700: 'var(--gray-700)',
    800: 'var(--gray-800)',
    900: 'var(--gray-900)',
    999: 'var(--gray-999)',
    '999_40': 'var(--gray-999_40)',
  },
  accent: {
    light: 'var(--accent-light)',
    regular: 'var(--accent-regular)',
    dark: 'var(--accent-dark)',
    overlay: 'var(--accent-overlay)',
    textOver: 'var(--accent-text-over)',
  },
  link: {
    color: 'var(--accent-regular)',
  },
};

const gradients = {
  subtle: 'linear-gradient(150deg, #f3f4f7 19%, #ffffff 150%)',
  accent: 'linear-gradient(150deg, #69dcff, #7f6df2, #1c0056)',
  accentCta: 'linear-gradient(150deg, #7f6df2, #1c0056)',
  stroke: 'linear-gradient(180deg, #f3f4f7, #c3cadb)',
};

const shadows = {
  sm: '0px 6px 3px rgba(9, 11, 17, 0.01), 0px 4px 2px rgba(9, 11, 17, 0.01), 0px 2px 2px rgba(9, 11, 17, 0.02), 0px 0px 1px rgba(9, 11, 17, 0.03)',
  md: '0px 28px 11px rgba(9, 11, 17, 0.01), 0px 16px 10px rgba(9, 11, 17, 0.03), 0px 7px 7px rgba(9, 11, 17, 0.05), 0px 2px 4px rgba(9, 11, 17, 0.06)',
  lg: '0px 62px 25px rgba(9, 11, 17, 0.01), 0px 35px 21px rgba(9, 11, 17, 0.05), 0px 16px 16px rgba(9, 11, 17, 0.1), 0px 4px 9px rgba(9, 11, 17, 0.12)',
};

const fontSize = {
  sm: '0.875rem',
  base: '1rem',
  md: '1.125rem',
  lg: '1.25rem',
  xl: '1.625rem',
  '2xl': '2.125rem',
  '3xl': '2.625rem',
  '4xl': '3.5rem',
  '5xl': '4.5rem',
};

// Dark mode
const darkThemeColors = {
  gray: {
    0: '#ffffff',
    50: '#f3f4f7',
    100: '#e3e6ee',
    200: '#c3cadb',
    300: '#a3acc8',
    400: '#8490b5',
    500: '#6474a2',
    600: '#505d84',
    700: '#3d4663',
    800: '#283044',
    900: '#141925',
    '999-basis': '225, 31%, 5%',
    '999_40': 'hsla(225, 31%, 5%, 0.4)',
    999: '#090b11',
  },
  accent: {
    light: '#1c0056',
    regular: '#7f6df2',
    dark: '#7f6df2',
    overlay: '#d3cef2',
    subtleOverlay: '#3e2da8',
    textOver: '#ffffff',
  },
  link: {
    color: '#1c0056',
  },
};

const darkThemeGradients = {
  subtle: 'linear-gradient(150deg, #141925 19%, #090b11 81%)',
  accentCta: 'linear-gradient(150deg, #1c0056, #7f6df2)',
  stroke: 'linear-gradient(180deg, #505d84, #283044)',
};

const darkThemeShadows = {
  sm: '0px 6px 3px rgba(255, 255, 255, 0.01), 0px 4px 2px rgba(255, 255, 255, 0.01), 0px 2px 2px rgba(255, 255, 255, 0.02), 0px 0px 1px rgba(255, 255, 255, 0.03)',
  md: '0px 28px 11px rgba(255, 255, 255, 0.01), 0px 16px 10px rgba(255, 255, 255, 0.03), 0px 7px 7px rgba(255, 255, 255, 0.05), 0px 2px 4px rgba(255, 255, 255, 0.06)',
  lg: '0px 62px 25px rgba(255, 255, 255, 0.01), 0px 35px 21px rgba(255, 255, 255, 0.05), 0px 16px 16px rgba(255, 255, 255, 0.1), 0px 4px 9px rgba(255, 255, 255, 0.12)',
};

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors,
      boxShadow: shadows,
      fontSize,
      backgroundImage: {
        ...gradients,
      },
      dark: {
        colors: darkThemeColors,
        backgroundImage: darkThemeGradients,
        boxShadow: darkThemeShadows,
      },
    },
  },
  darkMode: ['class', '[class="theme-dark"]'],
  plugins: [],
};
