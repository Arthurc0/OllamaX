<template>
    <div class="flex gap-3 items-start">
        <div class="flex w-fit shrink-0">
            <AppIcon v-if="fromBot" class="text-gray/70 rounded-full overflow-hidden" :name="IconEnum.OLLAMA" custom-size="30" />
            <AppImage v-else class="rounded-full overflow-hidden border border-2 border-gray/30" custom-size="30" :type="ImageTypeEnum.PROFILE" src="profile.jpg" />
        </div>
        <div class="flex flex-col gap-1">
            <div class="h-[30px] flex items-center">
                <span class="font-semibold text-gray/80 text-lg">{{ fromBot ? 'Ollama' : 'Arthurc0' }}</span>
            </div>
            <div class="text-md text-gray/80">{{ content }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
import { ImageTypeEnum } from '@/enums/ImageTypeEnum';

const props = defineProps<{
    from: 'bot' | 'me';
    content: string;
}>();

const fromBot = props.from === 'bot';
</script>
