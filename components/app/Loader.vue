<template>
    <div class="inline-flex items-center">
        <svg class="animate-loader-circular-rotate" :class="color" fill="none" stroke="currentColor" :style="`height: ${getComputedSize(size)}px; width: ${getComputedSize(size)}px`" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle class="loader-circular-shape" cx="33" cy="33" r="20" :stroke-width="width" stroke-miterlimit="10" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import type { ComponentSize } from '@/types/ComponentSize';

withDefaults(defineProps<{
    color?: string;
    width?: string;
    size?: ComponentSize;
}>(), {
    size: 'md',
    width: '6'
});
</script>
