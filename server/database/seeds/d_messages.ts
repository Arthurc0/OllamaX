import type { Knex } from 'knex';
import type { MessageEntity } from '@/server/entities/MessageEntity';

export async function seed(knex: Knex): Promise<void> {
    const messages = await knex<MessageEntity[]>('messages').select();
    if (!messages.length) {
        await knex<MessageEntity>('messages').insert({
            message: 'Test message 1',
            fromUserId: '2397c033-0026-4eee-813e-59ac15150791',
            topicId: '0595e37e-23c6-4db9-9424-19104a52140c'
        });
    }
}
