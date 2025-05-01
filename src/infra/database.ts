import { Client } from 'pg';

const query = async (queryObject: any) => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
  } finally {
    await client.end();
  }
};

export default {
  query,
};
