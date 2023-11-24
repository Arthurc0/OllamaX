<template>
    <div class="select-none relative group overflow-hidden cursor-pointer border-2 rounded-lg shadow-lg hover:shadow-md transition duration-200 text-gray/70 hover:text-gray/60 flex flex-col" :class="[theme?.selected ? 'border-gray/10' : 'border-light-gray']">
        <div class="absolute top-1 left-1 flex items-center gap-1 bg-gray/50 rounded-md pl-[3px] pr-[6px] py-[3px]" v-if="theme?.selected">
            <AppIcon :name="IconEnum.SUCCESS" size="xs" class="text-white/50" />
            <span class="text-white/70 text-xs font-semibold">Sélectionné</span>
        </div>
        <div class="child w-full h-[60px] bg-left group-hover:bg-right bg-[length:140%]" :style="{ backgroundImage: `linear-gradient(100deg, ${theme.gradient.join(', ')})`, transition: 'background-position 0.3s' }"></div>
        <span class="px-2 py-1 bg-light-gray text-sm font-medium" :class="[theme?.selected ? 'font-bold' : 'font-normal']">{{ theme.name }}</span>
    </div>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
import type { ThemeInterface } from '@/interfaces/theme/ThemeInterface';

defineProps<{
    theme: ThemeInterface;
}>();
</script>
