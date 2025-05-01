import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
  });
});

router.get('/api/v1/status', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running. Status endpoint',
  });
});

export default router;
