import type { ComponentSize } from '@/types/ComponentSize';

export const getComputedSize = (size: ComponentSize): string => {
    return {
        'xs': '25',
        'sm': '30',
        'md': '40',
        'lg': '60',
        'xl': '90',
        '2xl': '120',
        '3xl': '200'
    }[size];
};
