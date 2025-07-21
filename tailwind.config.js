/** @type {import('tailwindcss').Config} */

const colors = {
  customGray: {
    0: '#090b11',
    50: '#141925',
    100: '#283044',
    200: '#3d4663',
    300: '#505d84',
    400: '#6474a2',
    500: '#8490b5',
    600: '#a3acc8',
    700: '#c3cadb',
    800: '#e3e6ee',
    900: '#f3f4f7',
    999: '#ffffff',
    overlay: 'hsla(0, 0, 100%, 0.4)',
  },
  accent: {
    light: '#2200ff',
    regular: '#7f6df2',
    dark: '#1c0056',
    overlay: '#d3cef2)',
    textOver: '#ffffff',
  },
  link: {
    color: '#7f6df2',
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
  'xl-custom': '1.625rem',
  '2xl-custom': '2.125rem',
  '3xl-custom': '2.625rem',
  '4xl-custom': '3.5rem',
  '5xl-custom': '4.5rem',
};

// Dark mode
const darkThemeColors = {
  customGray: {
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
    999: '#090b11',
    overlay: 'hsla(225, 31%, 5%, 0.4)',
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
      screens: {
        sm: '800px',
      },
    },
  },
  darkMode: ['class', '[class="theme-dark"]'],
  plugins: [],
};
