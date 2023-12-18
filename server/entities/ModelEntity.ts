import { Entity } from '@/server/entities/Entity';

export class ModelEntity extends Entity {
    public name: string;
    public value: string;
    public prompt: string;
    public imageUrl?: string;
    public isInstalled: boolean;
    public isRemovable: boolean;
}
