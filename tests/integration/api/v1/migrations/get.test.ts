import database from '../../../../../src/infra/database';
import orchestrator from '../../../../orchestrator';

async function cleanDatabase() {
  await database.query('drop schema public cascade; create schema public;');
}
describe('GET to /api/v1/migrations', () => {
  beforeAll(async () => {
    await cleanDatabase();
    await orchestrator.waitForAllServices();
  });
  it('should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/migrations');
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
