import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalTeardown: './setup/batchCloseAfterAllTest',

  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: false,
    // Opt out of parallel tests on CI
  workers: 1,

  // Fail the build on CI if test.only is committed
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,



  // Reporter
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Mobile examples (optional)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // Branded browser examples
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});