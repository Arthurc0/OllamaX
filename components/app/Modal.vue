<template>
    <div class="will-change-transform fixed flex flex-col gap-6 p-5 rounded-2xl shadow-xl bg-white shadow-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-modal" :style="{ maxWidth: width, width: 'calc(100% - 30px)', maxHeight: height, height: 'calc(100% - 30px)', transition: 'max-width 0.25s, max-height 0.25s, transform 0.25s, opacity 0.25s' }" v-if="isOpened">
        <div class="flex items-center justify-between gap-7">
            <h2 class="select-none text-2xl font-semibold break-word hyphens-auto">{{ title }}</h2>
            <div class="flex items-center justify-center bg-gray-100 p-[2px] rounded-lg transition duration-[200ms] cursor-pointer hover:bg-gray/5" @click="closeModal">
                <AppIcon :name="IconEnum.CLOSE" color="text-gray" size="sm" />
            </div>
        </div>
        <component :is="resolvedView" :key="view" />
    </div>
</template>

<script setup lang="ts">
import { ComponentEnum } from '@/enums/ComponentEnum';
import { IconEnum } from '@/enums/IconEnum';

const resolvedView = shallowRef(resolveNuxtComponent(ComponentEnum.SETTINGS_MODAL));

const modalStore = useModalStore();
const { width, height, isOpened, title, view } = storeToRefs(modalStore);
watch(view, async () => {
    resolvedView.value = resolveNuxtComponent(view.value);
});

const closeModal = async () => {
    modalStore.close();
};
const escapeCloseModal = (e: KeyboardEvent) => {
    if (e.code !== 'Escape' || !isOpened.value) return;
    closeModal();
};
onMounted(() => {
    document.addEventListener('keyup', escapeCloseModal);
});
onUnmounted(() => {
    document.removeEventListener('keyup', escapeCloseModal);
});
</script>
