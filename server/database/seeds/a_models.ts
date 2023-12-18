import type { Knex } from 'knex';
import type { ModelEntity } from '@/server/entities/ModelEntity';
import { randomUUID } from 'crypto';

export async function seed(knex: Knex): Promise<void> {
    const models = await knex<ModelEntity[]>('models').select();
    if (!models.length) {
        await knex<ModelEntity>('models').insert({
            publicId: randomUUID(),
            name: 'Modèle custom #1',
            value: 'modelCustomA',
            prompt: 'Test modelfile'
        });
    }
}
