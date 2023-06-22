import { Knex } from "knex";

const TABLE_NAME = 'users';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, function (table) {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.integer('role_id').unsigned().references('id').inTable('roles');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

