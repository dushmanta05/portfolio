/** @type {import('tailwindcss').Config} */

const colors = {
  gray: {
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
    '999-basis': '0, 0%, 100%',
    '999_40': 'hsla(0, 0%, 100%, 0.4)',
    999: '#ffffff',
  },
  accent: {
    light: '#69dcff',
    regular: '#01c2fd',
    dark: '#1c0056',
    overlay: 'hsla(194, 89%, 67%, 0.33)',
    subtleOverlay: 'hsla(194, 89%, 67%, 0.33)',
    textOver: '#ffffff',
  },
  link: {
    color: '#01c2fd',
  },
};

const gradients = {
  subtle: 'linear-gradient(150deg, #f3f4f7 19%, #ffffff 150%)',
  accent: 'linear-gradient(150deg, #69dcff, #01c2fd, #1c0056)',
  accentCta: 'linear-gradient(150deg, #01c2fd, #1c0056)',
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
    },
  },
  plugins: [],
};
