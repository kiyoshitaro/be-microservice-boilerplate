import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('games', function (table) {
    table.uuid('id').primary();
    table.uuid('client_id').notNullable();
    table.string('name').nullable();
    table.string('logo_url').nullable();
    table.string('cover_url').nullable();
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('games');
}
