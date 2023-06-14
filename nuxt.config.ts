import { defineNuxtConfig } from '@nuxt/bridge';

const config = defineNuxtConfig({
  srcDir: 'src',
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    BASE_URL: process.env.BASE_URL || '',

    public: {
      baseUrl: process.env.BASE_URL || '',
    },
  },
});

export default config;