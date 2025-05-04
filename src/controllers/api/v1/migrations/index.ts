import { error } from 'console';
import database from '../../../../infra/database.js';
import migrationRunner, { type RunnerOption } from 'node-pg-migrate';
import { join } from 'path';

const migrationsController = async (req, res) => {
  const allowedMethods = ['GET', 'POST'];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: `Method ${req.method} is not allowed. Allowed methods are: ${allowedMethods.join(
        ', ',
      )}`,
    });
  }

  let dbClient: any;
  try {
    dbClient = await database.getNewClient();
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

      return res.status(200).json(pendingMigrations);
    }

    if (req.method === 'POST') {
      const migratedmigrations = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      });

      if (migratedmigrations.length > 0) {
        return res.status(201).json(migratedmigrations);
      }

      return res.status(200).json(migratedmigrations);
    }
  } catch (error) {
    console.error('Error in migrationsController:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while processing your request.',
    });
  } finally {
    if (dbClient) {
      await dbClient.end();
    }
  }
};

export default migrationsController;
