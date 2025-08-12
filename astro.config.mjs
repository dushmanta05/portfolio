import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [tailwind()],
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
});
