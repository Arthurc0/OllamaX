<template>
    <NuxtImg class="select-none pointer-events-none" :src="getImageUrl(type, src)" :width="size ? getComputedSize(size) : customSize" placeholder />
</template>

<script setup lang="ts">
import type { ImageTypeEnum } from '@/enums/ImageTypeEnum';
import type { ComponentSize } from '@/types/ComponentSize';

defineProps<{
    size?: ComponentSize;
    customSize?: string;
    type: ImageTypeEnum;
    src: string;
}>();
</script>
