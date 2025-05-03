import dotenv from 'dotenv';
import migrationRunner, { type RunnerOption } from 'node-pg-migrate';
import { join } from 'path';

const migrationsController = async (req, res) => {
  const defaultMigrationsOptions: RunnerOption = {
    databaseUrl: process.env.DATABASE_URL,
    dir: join('src', 'infra', 'migrations'),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations',
    dryRun: true,
  };

  if (req.method === 'GET') {
    const migrations = await migrationRunner({
      ...defaultMigrationsOptions,
    });

    return res.status(200).json(migrations);
  }

  if (req.method === 'POST') {
    const migrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });
    if (migrations.length > 0) {
      return res.status(201).json(migrations);
    }
    return res.status(200).json(migrations);
  }

  return res.status(405).end();
};

export default migrationsController;
