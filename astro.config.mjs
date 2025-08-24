import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  integrations: [tailwind()],
  adapter: cloudflare(),
  tsconfig: './tsconfig.json',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      defaultColor: false,
      wrap: true,
      langs: [
        'javascript',
        'typescript',
        'bash',
        'json',
        'html',
        'css',
        'astro',
        'jsx',
        'tsx',
        'php',
      ],
    },
  },
  vite: {
    plugins: [
      devtoolsJson({
        name: 'Portfolio',
        version: '1.0.0',
        description: 'Full-Stack Developer Portfolio',
        devtools: {
          type: 'page',
          title: 'Portfolio',
          description: 'Full-Stack Developer specializing in backend development.',
          faviconUrl: '/favicon.ico',
          url: import.meta.env.PROD ? 'https://dushmanta.dev' : '/',
        },
      }),
    ],
  },
});
