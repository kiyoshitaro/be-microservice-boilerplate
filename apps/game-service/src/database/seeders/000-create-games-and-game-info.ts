import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("games").insert([
        { id: "b0feba33-0ed3-4983-a38f-dd3abbd89b1b", client_id: "dd165d11-f5c8-4079-9290-07ca60ed8401", name: "Test 1", },
        { id: "47fee1bc-83a1-4328-95b8-ec9df033fdc5", client_id: "dd165d11-f5c8-4079-9290-07ca60ed8401", name: "Test 2", },
        { id: "e70999f3-7910-4ac0-b82d-5cc29e17da9d", client_id: "a792dcf1-0eb3-491a-933e-ad27add251ab", name: "Test 3", },
        { id: "4c794133-d54f-48ff-85e8-331839212153", client_id: "a792dcf1-0eb3-491a-933e-ad27add251ab", name: "Test 4", },
    ]).onConflict("id").merge();

    await knex("game_info").insert([
        { id: "066e6804-e299-42b7-9a15-44c2d31ea932", game_id: "b0feba33-0ed3-4983-a38f-dd3abbd89b1b", description: "Test game description 1", },
        { id: "43de400a-eb78-47d8-aa86-ab8faf52170e", game_id: "47fee1bc-83a1-4328-95b8-ec9df033fdc5", description: "Test game description 2", },
        { id: "d4e7c0c1-486d-48db-b812-4ec30df7807f", game_id: "e70999f3-7910-4ac0-b82d-5cc29e17da9d", description: "Test game description 3", },
        { id: "381d3b9e-d547-46f8-b769-8971e8df3dd5", game_id: "4c794133-d54f-48ff-85e8-331839212153", description: "Test game description 4", },
    ]).onConflict("id").merge();

};
