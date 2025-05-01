describe('GET to /api/v1/status', () => {
  it('should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status');
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.updated_at).toBeDefined();
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(parsedUpdatedAt).toEqual(responseBody.updated_at);
    expect(responseBody.dependencies.database.version).toBe('16.0');
    expect(responseBody.dependencies.database.max_connections).toBe(100);
    expect(responseBody.dependencies.database).toEqual({
      version: '16.0',
      max_connections: 100,
      opened_connections: 1,
    });
  });
});
