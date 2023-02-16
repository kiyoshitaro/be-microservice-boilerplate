import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("users").insert([
        { id: "55c69259-f463-47a8-9a2d-5131108a93c4", username: "kiyoshi", email: "kiyoshi@gmail.com", name: "kiyoshi" },
        { id: "4b615f41-066a-4d40-97f2-2b1034c92c2e", username: "taro", email: "taro@gmail.com", name: "taro" },
        { id: "0f4a022c-55a5-4ed3-ac3b-7c59ff6340f1", username: "Test", email: "test@gmail.com", name: "test" },
    ]).onConflict("id").merge();
};
