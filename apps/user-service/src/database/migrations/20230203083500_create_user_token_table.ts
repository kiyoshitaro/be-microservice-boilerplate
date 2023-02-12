import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_token', function (table) {
    table.uuid('id').primary();
    table.uuid('user_id').references('id').inTable('users');
    table.uuid('token_id').notNullable();
    table.unique(['user_id', 'token_id']);
    table.double('amount', 10).defaultTo(0.0);
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_token');
}
