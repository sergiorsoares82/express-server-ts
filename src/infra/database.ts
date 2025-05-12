import { Client } from 'pg';

const query = async (queryObject: string) => {
  const client = await getNewClient();

  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error; // Rethrow the error to be handled by the caller
  } finally {
    await client.end();
  }
};

const getSSLValues = () => {
  return process.env.NODE_ENV === 'production' ? true : false;
};

const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });
  await client.connect();
  return client;
};

export default {
  query,
  getNewClient,
};
