import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npx vite --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    env: {
      VITE_APPWRITE_URL: "http://127.0.0.1:4173/mock",
      VITE_APPWRITE_PROJECT_ID: "playwright-project",
      VITE_APPWRITE_DATABASE_ID: "playwright-database",
      VITE_APPWRITE_TABLE_ID: "playwright-table",
      VITE_APPWRITE_BUCKET_ID: "playwright-bucket",
    },
  },
});
