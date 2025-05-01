import database from '../../../../infra/database.js';

const statusController = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running. Status endpoint',
  });
};

export default statusController;
