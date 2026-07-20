import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://transcrab.chaisz.com',
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
