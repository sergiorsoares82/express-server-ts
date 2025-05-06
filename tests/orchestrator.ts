import retry from 'async-retry';

const waitForAllServices = async () => {
  const waitForWebServer = async () => {
    const fetchStatusPage = async () => {
      const response = await fetch('http://localhost:3000/api/v1/status');
      const responseBody = await response.json();
    };

    return retry(fetchStatusPage, {
      retry: 100,
    });
  };

  await waitForWebServer();
};

export default {
  waitForAllServices,
};
