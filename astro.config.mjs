import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [tailwind()],
  tsconfig: './tsconfig.json',
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
      langs: [],
    },
  },
});
