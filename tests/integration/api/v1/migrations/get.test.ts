import orchestrator from '../../../../orchestrator';

describe('GET to /api/v1/migrations', () => {
  beforeAll(async () => {
    await orchestrator.cleanDatabase();
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
