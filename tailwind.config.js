/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
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
          999: '#ffffff',
        },
        accent: {
          light: '#69dcff',
          regular: '#01c2fd',
          dark: '#1c0056',
        },
      },
      boxShadow: {
        sm: '0px 6px 3px rgba(9, 11, 17, 0.01), 0px 4px 2px rgba(9, 11, 17, 0.01), 0px 2px 2px rgba(9, 11, 17, 0.02), 0px 0px 1px rgba(9, 11, 17, 0.03)',
        md: '0px 28px 11px rgba(9, 11, 17, 0.01), 0px 16px 10px rgba(9, 11, 17, 0.03), 0px 7px 7px rgba(9, 11, 17, 0.05), 0px 2px 4px rgba(9, 11, 17, 0.06)',
        lg: '0px 62px 25px rgba(9, 11, 17, 0.01), 0px 35px 21px rgba(9, 11, 17, 0.05), 0px 16px 16px rgba(9, 11, 17, 0.1), 0px 4px 9px rgba(9, 11, 17, 0.12)',
      },
    },
  },
  plugins: [],
};
