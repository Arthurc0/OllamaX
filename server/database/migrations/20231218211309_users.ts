import type { Knex } from 'knex';
import { ThemeEnum } from '@/enums/theme/ThemeEnum';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('publicId').unique({ indexName: 'public_id_users_idx' }).notNullable();
        table.string('name', 50).notNullable();
        table.string('email', 256).notNullable();
        table.string('password', 128).notNullable();
        table.string('imageUrl', 255);
        table.string('selectedModelId').references('publicId').inTable('models').onUpdate('CASCADE').onDelete('CASCADE');
        table.string('selectedTheme').notNullable().defaultTo(ThemeEnum.LIGHT_PURPLE);
        table.datetime('creationDate').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}
