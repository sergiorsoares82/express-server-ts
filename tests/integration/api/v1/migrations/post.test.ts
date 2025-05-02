import database from '../../../../../src/infra/database';

async function cleanDatabase() {
  await database.query('drop schema public cascade; create schema public;');
}
describe('POST to /api/v1/migrations', () => {
  beforeAll(async () => {
    await cleanDatabase();
  });
  it('should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/migrations', {
      method: 'POST',
    });
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);
  });
});
