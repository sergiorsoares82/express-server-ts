import dotenv from 'dotenv';
import database from 'infra/database';
import migrationRunner, { type RunnerOption } from 'node-pg-migrate';
import { join } from 'path';

const migrationsController = async (req, res) => {
  const dbClient = await database.getNewClient();
  const defaultMigrationsOptions: RunnerOption = {
    dbClient: dbClient,
    dir: join('src', 'infra', 'migrations'),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations',
    dryRun: true,
  };

  if (req.method === 'GET') {
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
    });

    await dbClient.end();
    return res.status(200).json(pendingMigrations);
  }

  if (req.method === 'POST') {
    const migratedmigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });
    await dbClient.end();

    if (migratedmigrations.length > 0) {
      return res.status(201).json(migratedmigrations);
    }

    return res.status(200).json(migratedmigrations);
  }

  return res.status(405).end();
};

export default migrationsController;
