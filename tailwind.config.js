/** @type {import('tailwindcss').Config} */

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
      boxShadow: shadows,
      backgroundImage: {
        ...gradients,
      },
      dark: {
        backgroundImage: darkThemeGradients,
        boxShadow: darkThemeShadows,
      },
      screens: {
        sm: '800px',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  darkMode: ['class', '[class="theme-dark"]'],
  plugins: [],
};
