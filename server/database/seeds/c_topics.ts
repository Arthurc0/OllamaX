import type { Knex } from 'knex';
import type { TopicEntity } from '@/server/entities/TopicEntity';

export async function seed(knex: Knex): Promise<void> {
    const topics = await knex<TopicEntity[]>('topics').select();
    if (!topics.length) {
        await knex<TopicEntity>('topics').insert({
            publicId: '0595e37e-23c6-4db9-9424-19104a52140c',
            name: 'Topic 1',
            userId: '2397c033-0026-4eee-813e-59ac15150791'
        });
    }
}
