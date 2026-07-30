import { defineConfig, devices } from '@playwright/test';

// An override lets deterministic browser checks use a safe open port when
// another local project already owns the repository's usual port 3000.
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000';
const webServerCommand =
  process.env.PLAYWRIGHT_WEBSERVER_COMMAND ?? 'npm run dev';

export default defineConfig({
  testDir: './tests/playwright',
  fullyParallel: false,
  reporter: 'list',
  timeout: 45_000,
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'mobile-chromium',
      use: {
        ...devices['Pixel 7'],
        browserName: 'chromium',
      },
    },
  ],
  webServer: {
    command: webServerCommand,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  workers: 1,
});
