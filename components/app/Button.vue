<template>
    <RouterLink v-if="to" class="transition duration-[200ms]" :class="customClass" :to="to"><slot /></RouterLink>
    <button type="button" v-else class="transition duration-[300ms]" :class="customClass"><slot /></button>
</template>

<script setup lang="ts">
import { ButtonTypeEnum } from '@/enums/button/ButtonTypeEnum';

const props = defineProps<{
    to?: string;
    type?: ButtonTypeEnum;
}>();

const customClass = ref<string[]>([]);
if (props?.type === ButtonTypeEnum.NO) customClass.value = ['font-medium px-3 py-[5px] rounded-md bg-red/90 border-4 border-red/20 text-sm text-white hover:border-red hover:bg-red'];
else if (props?.type === ButtonTypeEnum.CANCEL) customClass.value = ['font-medium px-5 py-[8px] rounded-md bg-light-gray rounded-lg text-gray/50 text-sm text-gray/50 border-2 border-gray/5 hover:border-gray/20 font-medium'];
else if (props?.type === ButtonTypeEnum.OK) customClass.value = ['font-medium px-5 py-[8px] rounded-md text-sm border-2 border-purple text-white hover:bg-purple/95 bg-purple'];
</script>
