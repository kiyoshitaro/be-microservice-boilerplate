import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_item', function (table) {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable().references('id').inTable('users');
    table.uuid('item_id').notNullable();
    table.unique(['user_id', 'item_id']);
    table.integer('quantity').notNullable();
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_item');
}
