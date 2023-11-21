import type { ImageTypeEnum } from '@/enums/ImageTypeEnum';

export const getImageUrl = (type: ImageTypeEnum, fileName: string): string => {
    return `${type}/${fileName}`;
};
