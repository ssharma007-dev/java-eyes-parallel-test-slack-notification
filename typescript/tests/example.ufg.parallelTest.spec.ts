import { test, Page, TestInfo } from '@playwright/test';
import {
  Eyes,
  VisualGridRunner,
  Configuration,
  BatchInfo,
  Target,
  TestResultsSummary,
  TestResultContainer
} from '@applitools/eyes-playwright';

let runner: VisualGridRunner;
let batch: BatchInfo;
let config: Configuration;

const printedResultIds = new Set<string>();

test.setTimeout(600000);

test.beforeAll(async () => {
  runner = new VisualGridRunner({ testConcurrency: 5 });

  batch = new BatchInfo('TypeScript | Playwright Parallel test');
  batch.setId('TYPESCRIPT_BATCH'); // Prefer env-based ID in production

  batch.setNotifyOnCompletion(true);
  batch.addProperty('Name', 'AMCE Bank');

  config = new Configuration();
  config.setApiKey(process.env.APPLITOOLS_API_KEY as string);
  config.setBatch(batch);

  config.addBrowser(1200, 800, 'chrome');
  config.addBrowser(1600, 900, 'firefox');
  config.addBrowser(1024, 768, 'safari');
});

async function runVisualTest(
  page: Page,
  testInfo: TestInfo,
  url: string,
  checkpointName: string
): Promise<void> {
  const eyes = new Eyes(runner);
  eyes.setConfiguration(config);

  await eyes.open(
    page,
    'OrangeHRM',
    testInfo.title,
    { width: 1200, height: 800 }
  );

  await page.goto(url, { waitUntil: 'load' });

  await eyes.check(checkpointName, Target.window().fully());

  await eyes.closeAsync();
}


// ===================== TESTS =====================

test('Bank Login Page', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://sandbox.applitools.com/bank',
    'Bank Login Page'
  );
});

test('OrangeHRM Login Page', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    'OrangeHRM Login'
  );
});

test('GitHub Home Page', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://github.com',
    'GitHub Home'
  );
});

test('Wikipedia Article', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://en.wikipedia.org/wiki/Software_testing',
    'Wikipedia Article'
  );
});

test('StackOverflow Questions', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://stackoverflow.com/questions',
    'StackOverflow Questions'
  );
});

test('Netflix Landing Page', async ({ page }, testInfo) => {
  await runVisualTest(
    page,
    testInfo,
    'https://www.netflix.com',
    'Netflix Landing'
  );
});


// ===================== AFTER ALL =====================

test.afterAll(async () => {
  test.setTimeout(120000);

  console.log('>>> Waiting for Visual Grid results <<<');

  const summary: TestResultsSummary =
    await runner.getAllTestResults(false);

  const results: TestResultContainer[] =
    summary.getAllResults();

  for (const container of results) {
    const testResults = container.getTestResults();
    if (!testResults) continue;

    const id = testResults.getId();

    if (!printedResultIds.has(id)) {
      console.log('=======================================');
      console.log(`Test Name : ${testResults.getName()}`);
      console.log(`Status    : ${testResults.getStatus()}`);
      console.log(`URL       : ${testResults.getUrl()}`);
      console.log('=======================================');

      printedResultIds.add(id);
    }
  }
});