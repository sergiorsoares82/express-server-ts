import express from 'express';
import statusController from '../controllers/api/v1/status/index.js';
import migrationsController from 'controllers/api/v1/migrations/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
  });
});

router.get('/api/v1/status', statusController);
router.get('/api/v1/migrations', migrationsController);
router.post('/api/v1/migrations', migrationsController);

export default router;
