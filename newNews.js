const originalCollectionId = '65fba4783c8718717052edb5';
const duplicatedCollectionId = '65fd0c7982c9e08915edff34';
const webflowApiKey = 'e22aa10a6b4df96c6fb3e69bb227c59e23d0927191e1cf5122fc72d301d34814';

async function fetchOriginalCollectionData() {
  const apiUrl = `https://api.webflow.com/collections/${originalCollectionId}/items`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${webflowApiKey}`,
        'accept-version': '1.0.0',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from the original collection.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data from the original collection:', error);
    return null;
  }
}

async function postToDuplicatedCollection(data) {
  const apiUrl = `https://api.webflow.com/collections/${duplicatedCollectionId}/items`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${webflowApiKey}`,
        'accept-version': '1.0.0',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to post data to the duplicated collection.');
    }

    console.log('Data successfully synchronized with the duplicated collection.');
  } catch (error) {
    console.error('Error posting data to the duplicated collection:', error);
  }
}

async function synchronizeCollections() {
  const originalData = await fetchOriginalCollectionData();
  if (!originalData) {
    return;
  }

  // Modify originalData if necessary to match the structure of the duplicated collection

  await postToDuplicatedCollection(originalData.items);
}

synchronizeCollections();
