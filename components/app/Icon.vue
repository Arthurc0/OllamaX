<template>
    <svg class="inline-flex shrink-0" :class="[color]" :style="`height: ${getComputedSize(size)}px; width: ${getComputedSize(size)}px`">
        <use :href="`${Icons}#${name}`" />
    </svg>
</template>

<script setup lang="ts">
import type { IconEnum } from '@/enums/IconEnum';
import Icons from '@/assets/icons.svg';
import type { ComponentSize } from '@/types/ComponentSize';

defineProps<{
    color?: string;
    size: ComponentSize;
    name: IconEnum;
}>();
</script>
