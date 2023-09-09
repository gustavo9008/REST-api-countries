export default {
  pages: true,
  nitro: {
    preset: "vercel-edge",
  },
  routeRules: {
    // Homepage pre-rendered at build time
    "/country/**": { ssr: false },
  },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    tailwindcss: {
      cssPath: "~/assets/css/tailwind.css",
      configPath: "tailwind.config",
      exposeConfig: false,
      exposeLevel: 2,
      config: {},
      injectPosition: "first",
      viewer: true,
    },
  },
};
