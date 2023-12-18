import type { ThemeEnum } from '@/enums/theme/ThemeEnum';
import { Entity } from '@/server/entities/Entity';

export class UserEntity extends Entity {
    public name: string;
    public email: string;
    public password: string;
    public imageUrl?: string;
    public selectedModelId?: string;
    public selectedTheme: ThemeEnum;
    public creationDate: Date;
}
