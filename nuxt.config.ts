// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url' 

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  build: {
    transpile: []
  },
  app: {
    head: {
      title: 'HR&B Constructions',
      meta: [
        { 
          name: 'viewport', 
          content: 'width=device-width, initial-scale=1' 
        },
        {
          name: 'description',
          content: 'Tile installation, kitchen cabinet installation and refinishing, and wallpaper installation with professional workmanship and attention to detail.'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Slab:wght@500;700&family=Roboto+Mono:wght@400;500;700&display=swap',
        },
      ],
    }
  },
  runtimeConfig: {
    mailTo: process.env.MAIL_TO,
    mailFrom: process.env.MAIL_FROM,
    resendApiKey: process.env.RESEND_API_KEY
  },
  nitro: {
    compressPublicAssets: true,
  },

  css: [
    // '@/assets/style/main.scss'
    '@/assets/style/critical.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/mixins.scss" as *;'
        }
      }
    },
    optimizeDeps: {
      include: []
    }
  },

  alias: {
    '@': fileURLToPath(new URL('.', import.meta.url))
  },

  modules: ['nuxt-swiper', '@nuxt/image', '@pinia/nuxt'],
  plugins: ['@/plugins/gsap.client.ts'],

})