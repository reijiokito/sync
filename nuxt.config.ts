// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  modules: [
    '@nuxt/content',
    '@vue-macros/nuxt',
    "@nuxt/image",
    '@unocss/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    'radix-vue/nuxt',
    '@nuxthq/studio',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    "@vueuse/nuxt"
  ],
  content: {
    markdown: { remarkPlugins: ['remark-reading-time'] },
  },
  app: {
    head: {
      script: [
        {
          src: '//fw-cdn.com/11186380/3902989.js',
          async: true,
          defer: true,
        },
        {
          src: 'https://js.appointlet.com/',
          async: true,
          defer: true,
        },
      ],
      link: [
        { rel: "stylesheet", href: "https://js.appointlet.com/styles.css" }
      ]
    }
  },
  macros: {
    betterDefine: false,
  },
  css: [
    '@unocss/reset/tailwind.css'
  ],
  googleFonts: {
    families: {
      Inter: '100..800'
    },
    download: true,
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'vi',
        file: 'vi.json',
      },
    ],
    lazy: true,
    langDir: 'locales',
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['swiper-container', 'swiper-slide'].includes(tag),
    },
  },
  colorMode: {
    classSuffix: '',
    preference: 'light'
  },

  $development: {
    css: [
      'vue-json-pretty/lib/styles.css',
    ]
  },
  runtimeConfig: {
    public: {
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY
    }
  },
  routeRules: {
    '/resources**': { prerender: false },
  }
})
