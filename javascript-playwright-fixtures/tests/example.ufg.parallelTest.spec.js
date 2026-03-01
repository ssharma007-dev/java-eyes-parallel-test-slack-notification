const { test } = require('@playwright/test');
const {
  Eyes,
  VisualGridRunner,
  Configuration,
  BatchInfo,
  BatchClose,
  Target
} = require('@applitools/eyes-playwright');

const printedResultIds = new Set();

let runner;
let batch;
let config;
let eyes;

// ===================== SUITE SETUP =====================
test.setTimeout(60000);


test.beforeAll(async () => {

  runner = new VisualGridRunner(10); // testConcurrency(5)

  batch = new BatchInfo('JavaScript | Playwright Parallel test');

  //Make sure APPLITOOLS_DONT_CLOSE_BATCHES=true in env variable
  batch.setNotifyOnCompletion(true);
  batch.setId('JAVASCRIPT_BATCH');
  batch.addProperty('Name', 'AMCE Bank');

  config = new Configuration();
  config.setApiKey(process.env.APPLITOOLS_API_KEY);
  config.setBatch(batch);

  // UFG browsers
  config.addBrowser(1200, 800, 'chrome');
  config.addBrowser(1600, 900, 'firefox');
  config.addBrowser(1024, 768, 'safari');
});

test.describe.configure({ mode: 'parallel' });

// ===================== HELPER FUNCTION =====================

async function runVisualTest(page, testInfo, url, checkpointName) {

  eyes = new Eyes(runner);
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

test.afterAll(async () => {
  test.setTimeout(60000); 
  const allTestResults = await runner.getAllTestResults(false);
  for (const resultContainer of allTestResults.getAllResults()) {
    const testResults = resultContainer.getTestResults();
    if (testResults) {
      const id = testResults.getId();
      if (!printedResultIds.has(id)) {
        console.log(`Test results for ${testResults.getName()} - ${testResults.getUrl()}`);
        printedResultIds.add(id);
      }
    }
  }
});