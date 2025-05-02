import migrationRunner from 'node-pg-migrate';
import { join } from 'path';

const migrationsController = async (req, res) => {
  if (req.method === 'GET') {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join('src', 'infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',
    });
    return res.status(200).json([]);
  }

  if (req.method === 'POST') {
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: false,
      dir: join('src', 'infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',
    });
    return res.status(200).json([]);
  }

  return res.status(405).end();
};

export default migrationsController;
