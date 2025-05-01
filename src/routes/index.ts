import express from 'express';
import statusController from '../controllers/api/v1/status/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
  });
});

router.get('/api/v1/status', statusController);

export default router;
