import request from 'supertest';
import { HOST, PORT } from './test-env';

describe('platform-gateway:game api', () => {
  const API_HOST = `${HOST}:${PORT}`;
  describe('get all games request', () => {
    const falseId = 'b0feba33-0ed3-4983-a38f-dd3abbd89b1';
    it(`GET /api/v1/games/${falseId} fail url`, async () => {
      const response = await request(API_HOST).get(`/api/v1/games/${falseId}`);
      expect(response.body.statusCode).toBe(400);
    });

    const trueId = 'b0feba33-0ed3-4983-a38f-dd3abbd89b1b';
    it(`GET /api/v1/games/${trueId} success`, async () => {
      const response = await request(API_HOST).get(`/api/v1/games/${trueId}`);
      expect(response.body.statusCode).toBe(200);

      expect(response.body.data.id).toEqual(trueId);
      expect(response.body.data).toHaveProperty('name');
      expect(response.body.data).toHaveProperty('logo_url');
      expect(response.body.data).toHaveProperty('cover_url');
      expect(response.body.data).toHaveProperty('game_info');
    });
  });
});