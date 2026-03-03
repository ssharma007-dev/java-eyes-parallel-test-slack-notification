Eyes Playwright Standard ( Without Fixtures )

Pre-requisite
(1) set environment variable
APPLITOOLS_BATCH_ID = <custom_batch_id>
APPLITOOLS_API_KEY = <applitools_api_key>
APPLITOOLS_DONT_CLOSE_BATCHES=true


(2) npm i

(3) npx playwright test

Reference
(1) https://applitools.com/docs/eyes/sdks/playwright-ts-standard/batch-close



========
Playwright parallel = multiple Node processes
Each process = separate memory
Your runner is NOT shared


In Java:
One JVM = one shared runner.

In Playwright:
Each worker = separate Node process = separate memory.