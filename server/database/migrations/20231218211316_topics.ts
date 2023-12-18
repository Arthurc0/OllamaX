import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('topics', (table) => {
        table.increments('id').primary();
        table.string('publicId').unique({ indexName: 'public_id_topics_idx' }).notNullable();
        table.string('name', 150).notNullable();
        table.string('userId').references('publicId').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT').notNullable();
        table.datetime('creationDate').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('topics');
}
