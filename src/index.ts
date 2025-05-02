import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.js';
import path from 'path';

const env = process.env.NODE_ENV;

// Caminho absoluto do arquivo .env correspondente
const envFile = path.resolve(process.cwd(), `.env.${env}`);

dotenv.config({ path: envFile });

// console.log(`[env] Loaded ${envFile}`);

dotenv.config();

const app = express();

app.use(router);
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
