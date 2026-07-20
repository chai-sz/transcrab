import { defineConfig } from 'astro/config';

export default defineConfig({
  base: '/transcrab/',
  site: 'https://chai-sz.github.io',
  output: 'static',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
