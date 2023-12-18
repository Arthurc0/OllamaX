import type { Knex } from 'knex';
import { randomUUID } from 'crypto';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('topics', (table) => {
        table.increments('id').primary();
        table.string('publicId').defaultTo(randomUUID()).unique({ indexName: 'public_id_topics_idx' }).notNullable();
        table.string('name', 150).notNullable();
        table.string('userId').references('publicId').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT').notNullable();
        table.datetime('creationDate').defaultTo(knex.raw('DATETIME()')).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('topics');
}
