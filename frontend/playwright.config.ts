import { defineConfig, devices } from "@playwright/test";

const externalBaseURL = process.env.E2E_BASE_URL;

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: externalBaseURL ?? "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: externalBaseURL
    ? undefined
    : [
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
