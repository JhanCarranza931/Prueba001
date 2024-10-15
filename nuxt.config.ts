// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/google-fonts', '@nuxtjs/tailwindcss', '@nuxt/icon'],
  googleFonts:{
    families:{
      Roboto:true
    }
  },
  css: ["/assets/main.css"],
build: {
   transpile: ['echarts', 'zrender', 'tslib'],
 },
  
})