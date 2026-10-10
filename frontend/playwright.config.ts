import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:5173",
  },
  webServer: [
    {
      command: "uv run fastapi run main.py --port 8000",
      cwd: "../backend",
      url: "http://localhost:8000/api/items",
      reuseExistingServer: true,
    },
    {
      command: "pnpm dev --port 5173 --strictPort",
      url: "http://localhost:5173",
      reuseExistingServer: true,
    },
  ],
});
