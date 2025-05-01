import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.js';

dotenv.config();

const app = express();

app.use(router);
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
