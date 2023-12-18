import type { Knex } from 'knex';
import type { UserEntity } from '@/server/entities/UserEntity';

export async function seed(knex: Knex): Promise<void> {
    const users = await knex<UserEntity[]>('users').select();
    if (!users.length) {
        await knex<UserEntity>('users').insert({
            publicId: '2397c033-0026-4eee-813e-59ac15150791',
            name: 'Arthurc0',
            email: 'test@test.test',
            password: ''
        });
    }
}
