<template>
    <Transition :name="TransitionEnum.FADE_SLIDE">
        <div class="text-slate-900 fixed top-4 right-4 ml-4 rounded-lg flex flex-col p-3 min-w-[180px] max-w-[340px] bg-slate-50 shadow-lg gap-3 break-word z-alert" v-if="alertIsShowed" :key="alertId">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-[5px]">
                    <AppIcon :name="alertType === AlertTypeEnum.ERROR ? IconEnum.ERROR : IconEnum.SUCCESS" :color="alertType === AlertTypeEnum.ERROR ? 'text-red-500' : 'text-emerald-500'" size="md" class="mt-[-2px] shrink-0" />
                    <h3 class="text-lg leading-none">{{ alertTitle }}</h3>
                </div>
                <div class="flex items-center justify-center bg-gray-100 p-[2px] rounded-lg transition duration-[200ms] cursor-pointer hover:bg-gray-200" @click="closeAlert">
                    <AppIcon :name="IconEnum.CLOSE" color="text-slate-900" size="md" />
                </div>
            </div>
            <div class="flex flex-col text-sm">
                <p>{{ alertMessage }}</p>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
import { AlertTypeEnum } from '@/enums/alert/AlertTypeEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';

const alertStore = useAlertStore();
const alertId = computed(() => alertStore.getId);
const alertType = computed(() => alertStore.getType);
const alertTitle = computed(() => alertStore.getTitle);
const alertMessage = computed(() => alertStore.getMessage);
const alertIsShowed = computed(() => alertStore.isShowed);

const closeAlert = (): void => {
    alertStore.closeAlert();
};
</script>
