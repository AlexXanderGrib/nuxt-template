// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {},
  modules: ["@nuxt/ui"],
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

  devServer: {
    host: "0.0.0.0"
  },

  nitro: {
    preset: "node-cluster",

    esbuild: {
      options: {
        target: "esnext",
  
      }
    }
  }
});
