import { defineNuxtConfig } from 'nuxt/config';

const config = defineNuxtConfig({
  srcDir: 'src',
  runtimeConfig: {
    BASE_URL: process.env.BASE_URL || '',
    build: {
      number: 0,
    },
  },
});

export default config;