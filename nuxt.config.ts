import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/a11y',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/color-mode',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  css: ['~/assets/css/main.css'],
  imports: {
    dirs: ['constants'],
  },
  routeRules: {
    '/user': { redirect: '/' }
  },
  runtimeConfig: {
    public: {
      githubApiBaseUrl: process.env.GH_API_BASE_URL || 'https://api.github.com',
      githubToken: process.env.GH_API_TOKEN || ''
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  pinia: {
    storesDirs: ['stores'],
  },
});