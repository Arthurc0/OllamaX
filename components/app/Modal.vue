<template>
    <Teleport to="body">
        <Transition :name="TransitionEnum.MODAL_POPUP" mode="out-in">
            <div ref="modalElement" class="will-change-transform fixed flex flex-col gap-6 p-5 rounded-2xl shadow-xl bg-white shadow-lg top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] max-w-[600px]" :style="{ zIndex: zIndexModal, width: width ?? 'auto' }" v-if="isOpened">
                <div class="flex items-center justify-between gap-7">
                    <h2 class="select-none text-2xl font-semibold break-word hyphens-auto">
                        <slot name="title" />
                    </h2>
                    <div class="flex items-center justify-center bg-gray-100 p-[2px] rounded-lg transition duration-[200ms] cursor-pointer hover:bg-gray/5" @click="closeModal">
                        <AppIcon :name="IconEnum.CLOSE" color="text-gray" size="sm" />
                    </div>
                </div>
                <slot name="content" />
            </div>
        </Transition>
        <Transition :name="TransitionEnum.FADE" mode="out-in">
            <div class="fixed top-0 bottom-0 left-0 right-0 h-full w-full bg-gray/20" :style="{ zIndex: zIndexModalOverlay }" v-if="isOpened" @click="closeModal"></div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';

defineProps<{
    width?: string;
}>();
const emit = defineEmits<(e: 'update:modelValue', value: boolean) => void>();

const modalStore = useModalStore();
const { zIndexModal, zIndexModalOverlay } = modalStore.addModal();

const isOpened = ref(false);
const modalElement = ref<HTMLElement>();
const modalNumber = ref(0);
const openedModalCount = computed(() => modalStore.getOpenedModalCount);

const closeModal = async () => {
    await useTimeout(() => {
        isOpened.value = false;
    }, 1);
    emit('update:modelValue', false);
};
const escapeCloseModal = (e: KeyboardEvent) => {
    if (e.code !== 'Escape' || !isOpened.value || modalNumber.value < openedModalCount.value) return;
    closeModal();
};
onMounted(() => {
    isOpened.value = true;
    modalNumber.value = modalStore.openModal();
    useTimeout(() => {
        modalElement.value?.querySelector('input')?.focus();
    }, 310);
    document.addEventListener('keyup', escapeCloseModal);
});
onUnmounted(() => {
    document.removeEventListener('keyup', escapeCloseModal);
    modalStore.removeModal();
});
</script>
