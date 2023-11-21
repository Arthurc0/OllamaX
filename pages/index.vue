<template>
    <BaseLayoutContainer>
        <template #title>Discussion 1</template>
        <template #subtitle>Vu il y a 2 heures</template>
        <template #content>
            <div class="relative h-full py-8 px-10 flex flex-col overflow-auto">
                <BaseAppIcon class="center" color="text-gray/5" size="3xl" :name="IconEnum.OLLAMA" />
                <p>hello</p>
            </div>
        </template>
    </BaseLayoutContainer>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
</script>
