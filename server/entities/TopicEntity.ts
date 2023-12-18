import { Entity } from '@/server/entities/Entity';

export class TopicEntity extends Entity {
    public name: string;
    public userId: string;
    public creationDate: Date;
}
