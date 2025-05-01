import database from '../../../../infra/database.js';

const statusController = async (req, res) => {
  const result = await database.query('SELECT 1+1 as SUM;');
  console.log(result.rows);
  res.status(200).json({
    status: 'success',
    message: 'API is running. Status endpoint',
  });
};

export default statusController;
