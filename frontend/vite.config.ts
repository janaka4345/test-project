/// <reference types="vitest/config" />
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig, loadEnv, type Plugin } from "vite";

// In production the container entrypoint writes /config.json from env vars.
function devRuntimeConfig(mode: string): Plugin {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    name: "dev-runtime-config",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/config.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-store");
        res.end(JSON.stringify({ appEnv: env.VITE_APP_ENV }));
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    devRuntimeConfig(mode),
  ],
  server: {
    port: 9000,
    proxy: {
      "/api": "http://localhost:8000",
      "/dummyjson": {
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dummyjson/, ""),
      },
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.tsx"],
  },
}));
