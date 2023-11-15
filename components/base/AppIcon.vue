<template>
    <svg class="inline-flex shrink-0" :class="[color ?? 'text-inherit']" :style="`height: ${computedSize[size]}px; width: ${computedSize[size]}px`">
        <use :href="`${Icons}#${name}`" />
    </svg>
</template>

<script setup lang="ts">
import type { IconEnum } from '@/enums/base/IconEnum';
import Icons from '@/assets/icons.svg';

defineProps<{
    color?: string;
    size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    name: IconEnum;
}>();

const computedSize = {
    'sm': '10',
    'md': '23',
    'lg': '50',
    'xl': '70',
    '2xl': '90',
    '3xl': '110'
};
</script>
