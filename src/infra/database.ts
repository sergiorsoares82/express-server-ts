import { Client } from 'pg';

const query = async (queryObject: any) => {
  const client = new Client({
    host: 'localhost',
    port: 5430,
    password: 'postgres',
    user: 'postgres',
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
};

export default {
  query,
};
