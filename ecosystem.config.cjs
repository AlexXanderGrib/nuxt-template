module.exports = {
  apps: [
    {
      name: "App",
      port: process.env.PORT || 3000,
      exec_mode: "cluster",
      instances: process.env.INSTANCES_COUNT || "max",
      script: "./.output/server/index.mjs"
    }
  ]
};
