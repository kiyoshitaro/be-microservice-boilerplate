import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('game_token', function (table) {
    table.uuid('game_id').notNullable();
    table.uuid('token_id').notNullable();
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('game_token');
}
