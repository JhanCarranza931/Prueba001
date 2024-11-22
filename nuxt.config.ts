// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },


  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@prisma/nuxt',
    '@pinia/nuxt',
    'nuxt-auth-utils',
    'pinia-plugin-persistedstate/nuxt',
  ],
  prisma:{
    installStudio:false
  },
  googleFonts:{
    families:{
        Outfit:true
    }

  },
  icon:{
    size: '24px'
  },

  css: ['/assets/main.css'],

  build: {
    transpile: ['echarts', 'zrender', 'tslib'],
  },
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
});
