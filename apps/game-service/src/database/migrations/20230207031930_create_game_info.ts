import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('game_info', function (table) {
    table.uuid('id').primary();
    table.string('trait_type_ids').nullable();
    table.string('download_url').nullable();
    table.string('social_url').nullable();
    table.string('description').nullable();
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('game_info');
}
