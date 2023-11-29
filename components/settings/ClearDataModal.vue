<template>
    <div class="flex items-stretch self-end gap-4">
        <AppButton :type="ButtonTypeEnum.CANCEL" @click="modalStore.close()">Non</AppButton>
        <AppButton :type="ButtonTypeEnum.OK">Oui</AppButton>
    </div>
</template>

<script setup lang="ts">
import { ButtonTypeEnum } from '@/enums/button/ButtonTypeEnum';
const modalStore = useModalStore();
</script>
