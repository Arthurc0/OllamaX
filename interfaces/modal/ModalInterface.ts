import type { ComponentEnum } from '@/enums/ComponentEnum';

export interface ModalInterface {
    title: string;
    width?: string;
    height?: string;
    view: ComponentEnum;
}
