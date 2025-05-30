import database from '../../../../infra/database.js';

const statusController = async (req, res) => {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query('SHOW server_version;');
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    'SHOW max_connections;',
  );
  const databaseMaxConnections =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseOpenedConnectionsResult = await database.query({
    text: `SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;`,
    values: [process.env.POSTGRES_DB],
  });

  const databaseOpenConnections = parseInt(
    databaseOpenedConnectionsResult.rows[0].count,
    10,
  );

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnections),
        opened_connections: databaseOpenConnections,
      },
    },
  });
};

export default statusController;
