import { Client } from 'pg';

const query = async (queryObject: any) => {
  // console.log('Environment variables:', {
  //   host: process.env.POSTGRES_HOST,
  //   port: process.env.POSTGRES_PORT,
  //   user: process.env.POSTGRES_USER,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: process.env.POSTGRES_DB,
  // });

  // console.log('Node environment:', process.env.NODE_ENV);

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
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

const getSSLValues = () => {
  return process.env.NODE_ENV === 'development' ? false : true;
};

export default {
  query,
};
