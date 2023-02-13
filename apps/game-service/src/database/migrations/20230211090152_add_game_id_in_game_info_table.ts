import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("game_info", function (table) {
    table.uuid("game_id")
      .notNullable()
      .references("id")
      .inTable("games")
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("game_info", function (table) {
    table.dropColumn("game_id");
  });
}

