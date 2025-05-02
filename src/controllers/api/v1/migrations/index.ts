import migrationRunner from 'node-pg-migrate';
import { join } from 'path';

const migrationsController = async (req, res) => {
  if (req.method === 'GET') {
    console.log('Method GET');
    const migrations = await migrationRunner({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join('src', 'infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',
    });
    return res.status(200).json(migrations);
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
    return res.status(200).json(migrations);
  }

  return res.status(405).end();
};

export default migrationsController;
