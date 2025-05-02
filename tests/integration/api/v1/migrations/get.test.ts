describe('GET to /api/v1/migrations', () => {
  it('should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/migrations');
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    console.log('responseBody', responseBody);

    expect(Array.isArray(responseBody)).toBe(true);
  });
});
