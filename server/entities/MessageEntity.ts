import { Entity } from '@/server/entities/Entity';

export class MessageEntity extends Entity {
    public message: string;
    public fromUserId: string;
    public topicId: string;
    public creationDate: Date;
}
