import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [tailwind()],
  tsconfig: './tsconfig.json',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'one-dark-pro'
      },
      defaultColor: 'dark',
      wrap: true,
      langs: ['javascript', 'typescript', 'bash', 'json', 'html', 'css', 'astro', 'jsx', 'tsx', 'php'],
    },
  },
});
