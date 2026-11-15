// @ts-nocheck
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node scripts/servidor.js',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
