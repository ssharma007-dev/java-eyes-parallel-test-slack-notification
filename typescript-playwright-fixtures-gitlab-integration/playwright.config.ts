import type { FileLogHandlerPlain } from '@applitools/eyes-playwright';
import type { EyesFixture } from '@applitools/eyes-playwright/fixture';
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig<EyesFixture>({
  testDir: './tests',
  //reporter: '@applitools/eyes-playwright/reporter',
  reporter: 'html',
  globalTeardown: require.resolve('./setup/batchCloseAfterAllTest'),
  use: {

     trace: 'on',
    eyesConfig: {
    type: 'ufg',
    appName: 'Multiple Tab/Window/Popup',
      // failTestsOnDiff: false,
      // matchLevel: 'Strict',
    batch: { name: 'UFG Playwright With Fixtures', 
      id: process.env.CI_COMMIT_SHA || 'UFG_PLAYWRIGHT_FIXTURES_BATCH',
      notifyOnCompletion: true, 
      properties: [{ name: 'Name', value: 'AMCE Bank' } ]
     },
      // proxy: {url: 'http://127.0.0.1:8888'},
      // matchTimeout: 0,
      // waitBeforeScreenshots: 50,
      // saveNewTests: true,

      browsersInfo: [
      // Desktop browsers
      { name: 'chrome', width: 1920, height: 1080 },
      //{ name: 'firefox', width: 1920, height: 1080 },
      //{ name: 'safari', width: 1920, height: 1080 },

    { iosDeviceInfo: { deviceName: 'iPhone 15 Pro Max' } },

     { iosDeviceInfo: { deviceName: 'iPhone 14 Pro Max' } },
    ],
      logConfig: {
        type: 'file',
        filename: 'applitools.log',
      } satisfies FileLogHandlerPlain,
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