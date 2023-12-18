import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('messages', (table) => {
        table.increments('id').primary();
        table.string('publicId').unique({ indexName: 'public_id_messages_idx' }).notNullable();
        table.text('message').notNullable();
        table.string('fromUserId').references('publicId').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT').notNullable();
        table.string('topicId').references('publicId').inTable('topics').onUpdate('CASCADE').onDelete('RESTRICT').notNullable();
        table.datetime('creationDate').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('messages');
}
