import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { PORT, HOST } from './test-env';
import { testService } from './helper';

describe('game-service:game controller', () => {
  let client: ClientProxy;

  beforeEach(async () => {
    client = ClientProxyFactory.create({ options: { port: PORT, host: HOST } });
    await client.connect();
  });
  afterAll(async () => {
    client.close();
  });

  describe('Get game detail: (get_game_by_id)', () => {
    const falseId = 'b0feba33-0ed3-4983-a38f-dd3abbd89b1';
    it(`Get game detail with wrong id ${falseId}`, async () => {
      const response: any = await testService(
        client.send('get_game_by_id', { id: falseId })
      );
      expect(response.statusCode).toBe(400);
    });

    const trueId = 'b0feba33-0ed3-4983-a38f-dd3abbd89b1b';
    it(`Get game detail with right id but not contain game-info`, async () => {
      const response: any = await testService(
        client.send('get_game_by_id', { id: trueId })
      );
      expect(response.statusCode).toBe(200);
      expect(response.data.id).toEqual(trueId);
      expect(response.data).toHaveProperty('name');
      expect(response.data).not.toHaveProperty('game_info');
    });

    it(`Get game detail with right id with game-info`, async () => {
      const response: any = await testService(
        client.send('get_game_by_id', { id: trueId, include: 'game_info' })
      );
      expect(response.statusCode).toBe(200);
      expect(response.data.id).toEqual(trueId);
      expect(response.data).toHaveProperty('name');
      expect(response.data).toHaveProperty('game_info');
    });
  });
});
