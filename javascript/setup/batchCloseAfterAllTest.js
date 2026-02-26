const { BatchClose } = require('@applitools/eyes-playwright');

async function batchCloseAfterAllTest() {
  const batchId = 'JAVASCRIPT_BATCH'; // Ensure this matches the batch ID set in tests/example.ufg.parallelTest.spec.js

  if (!batchId) {
    console.error('APPLITOOLS_BATCH_ID not set');
    process.exit(1);
  }

  const batchClose = new BatchClose();
  batchClose.setApiKey(process.env.APPLITOOLS_API_KEY); 
  await batchClose.setBatchIds([batchId]).close();

  console.log('Batch closed:', batchId);
}

module.exports = batchCloseAfterAllTest;
