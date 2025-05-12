import retry from 'async-retry';
import database from '../src/infra/database';

const waitForAllServices = async () => {
  const waitForWebServer = async () => {
    const fetchStatusPage = async () => {
      const response = await fetch('http://localhost:3000/api/v1/status');

      if (response.status !== 200) {
        throw Error();
      }
    };

    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
      onRetry: (error: Error, attempt) => {
        console.log(
          `Attempt ${attempt} - Failed to fetch status page: ${error.message}`,
        );
      },
    });
  };

  await waitForWebServer();
};

const cleanDatabase = async () => {
  await database.query('drop schema public cascade; create schema public;');
};

export default {
  cleanDatabase,
  waitForAllServices,
};
