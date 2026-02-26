import { BatchClose } from '@applitools/eyes-playwright';

const batchCloseAfterAllTest = async (): Promise<void> => {
  const batchId = "TYPESCRIPT_BATCH";//process.env.APPLITOOLS_BATCH_ID;
  const apiKey = process.env.APPLITOOLS_API_KEY;

  if (!batchId) {
    console.error('APPLITOOLS_BATCH_ID not set');
    process.exit(1);
  }

  if (!apiKey) {
    console.error('APPLITOOLS_API_KEY not set');
    process.exit(1);
  }

  const batchClose = new BatchClose();
  batchClose.setApiKey(apiKey);

  await batchClose.setBatchIds([batchId]).close();

  console.log('Batch closed:', batchId);
};

export default batchCloseAfterAllTest;