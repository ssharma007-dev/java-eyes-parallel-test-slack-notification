import { test, expect } from '@applitools/eyes-playwright/fixture';

test.setTimeout(600000);

test('Bank Login Page', async ({ page, eyes }) => {
  await page.goto('https://sandbox.applitools.com/bank');
  await eyes.check('Bank Login Page', { fully: true });
});

test('OrangeHRM Login Page', async ({ page, eyes }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await eyes.check('OrangeHRM Login', { fully: true });
});

test('GitHub Home Page', async ({ page, eyes }) => {
  await page.goto('https://github.com');
  await eyes.check('GitHub Home', { fully: true });
});

test('Wikipedia Article', async ({ page, eyes }) => {
  await page.goto('https://en.wikipedia.org/wiki/Software_testing');
  await eyes.check('Wikipedia Article', { fully: true });
});

test('StackOverflow Questions', async ({ page, eyes }) => {
  await page.goto('https://stackoverflow.com/questions');
  await eyes.check('StackOverflow Questions', { fully: true });
});

test('Netflix Landing Page', async ({ page, eyes }) => {
  await page.goto('https://www.netflix.com');
  await eyes.check('Netflix Landing', { fully: true });
});

test('Multiple windows in one Eyes session using Fixtures', async ({ page, context, eyes }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');

  await eyes.check('Initial Page', {target: 'window', fully: true});

  // Screenshot of Initial page
  await expect(page).toHaveScreenshot('Initial Page', {fullPage: true})


  //Navigate to new tab
  const [newTab] = await Promise.all([page.waitForEvent('popup'), 
  page.click('//a[normalize-space()="Click Here"]')])

  //Screenshot of new tab/pop up
  await expect(newTab).toHaveScreenshot('New Tab Page', {fullPage: true})

  //Screenshot of initial page using page object
  await expect(page).toHaveScreenshot('Initial Page Back Again', {fullPage: true})


});
