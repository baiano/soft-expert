// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
      }
    ],
    '@nuxt/ui',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-vitest'
  ],
  imports: {
    dirs: ['stores'],
  },
  ui: {
    icons: 'all',
  },
})
