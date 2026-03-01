const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',

  reporter: '@applitools/eyes-playwright/reporter',

  globalTeardown: require.resolve('./setup/batchCloseAfterAllTest'),

  use: {
    trace: 'on',

    eyesConfig: {
      type: 'ufg',

      appName: 'Multiple Tab/Window/Popup',

      batch: {
        name: 'UFG Playwright With Fixtures',
        id: 'UFG_PLAYWRIGHT_FIXTURES_BATCH',
        notifyOnCompletion: true,
        properties: [
          { name: 'Name', value: 'AMCE Bank' }
        ]
      },

      browsersInfo: [
        // Desktop
        { name: 'chrome', width: 1920, height: 1080 },

        // iOS devices
        { iosDeviceInfo: { deviceName: 'iPhone 15 Pro Max' } },
        { iosDeviceInfo: { deviceName: 'iPhone 14 Pro Max' } },
      ],

      logConfig: {
        type: 'file',
        filename: 'applitools.log',
      },

      failTestsOnDiff: 'afterAll'
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});