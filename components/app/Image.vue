<template>
    <NuxtImg class="pointer-events-none" :src="getImageUrl(type, src)" :width="getComputedSize(size)" placeholder />
</template>

<script setup lang="ts">
import type { ImageTypeEnum } from '@/enums/ImageTypeEnum';
import type { ComponentSize } from '@/types/ComponentSize';

defineProps<{
    size: ComponentSize;
    type: ImageTypeEnum;
    src: string;
}>();
</script>
