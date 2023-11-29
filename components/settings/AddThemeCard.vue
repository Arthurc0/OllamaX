<template>
    <div class="select-none gap-[2px] py-2 px-1 text-center overflow-hidden cursor-pointer border-2 border-light-gray rounded-lg shadow-lg hover:shadow-md transition duration-200 text-gray/20 hover:text-gray/40 bg-light-gray hover:bg-gray/10 hover:border-gray/5 flex flex-col items-center justify-center">
        <AppIcon :name="IconEnum.ADD" size="md" />
        <span class="text-xs font-semibold">Ajouter un modèle</span>
    </div>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
</script>
