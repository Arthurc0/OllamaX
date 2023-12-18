import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('models', (table) => {
        table.increments('id').primary();
        table.string('publicId').unique({ indexName: 'public_id_models_idx' }).notNullable();
        table.string('name', 50).notNullable();
        table.string('value', 50).notNullable();
        table.text('prompt').notNullable();
        table.string('imageUrl', 255);
        table.boolean('isInstalled').defaultTo(false).notNullable();
        table.boolean('isRemovable').defaultTo(true).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('models');
}
