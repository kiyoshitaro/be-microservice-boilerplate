import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('user_game')
    .insert([
      {
        id: '307cb744-fb31-4dad-a30c-6df36f34bd13',
        user_id: '55c69259-f463-47a8-9a2d-5131108a93c4',
        game_id: 'b0feba33-0ed3-4983-a38f-dd3abbd89b1b',
        level: 1,
        experience: 0,
      },
      {
        id: '82356af3-735c-466c-8001-a381829170fe',
        user_id: '0f4a022c-55a5-4ed3-ac3b-7c59ff6340f1',
        game_id: 'b0feba33-0ed3-4983-a38f-dd3abbd89b1b',
        level: 1,
        experience: 0,
      },
      {
        id: 'a969e8b3-2284-4cde-8287-bb1a4bd9e2c8',
        user_id: '0f4a022c-55a5-4ed3-ac3b-7c59ff6340f1',
        game_id: '47fee1bc-83a1-4328-95b8-ec9df033fdc5',
        level: 2,
        experience: 1,
      },
      {
        id: 'e744702d-3120-4b4c-bbbf-74e2d67cdc01',
        user_id: '55c69259-f463-47a8-9a2d-5131108a93c4',
        game_id: '47fee1bc-83a1-4328-95b8-ec9df033fdc5',
        level: 3,
        experience: 1,
      },
    ])
    .onConflict('id')
    .merge();
}
