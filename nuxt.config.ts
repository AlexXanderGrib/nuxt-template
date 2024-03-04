// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {},
  modules: ["@nuxt/ui", "@nuxtjs/eslint-module"],
  devtools: { enabled: true },
  colorMode: {
    classSuffix: ""
  },
  ui: {
    icons: ["heroicons"],
    global: true
  },
  build: {
    transpile: ["trpc-nuxt"]
  },

  nitro: {
    preset: "node-cluster",

    esbuild: {
      options: {
        target: "esnext"
      }
    }
  }
});
