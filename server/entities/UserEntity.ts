import { Entity } from '@/server/entities/Entity';

export class UserEntity extends Entity {
    public name: string;
    public imageUrl: string;
    public selectedModelId: string;
    public selectedTheme: string;
    public createdAt: Date;
}
