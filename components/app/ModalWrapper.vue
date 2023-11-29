<template>
    <Teleport to="body">
        <Transition :name="TransitionEnum.MODAL_POPUP" mode="out-in">
            <AppModal v-if="isOpened" />
        </Transition>
        <Transition :name="TransitionEnum.FADE" mode="out-in">
            <div class="fixed top-0 bottom-0 left-0 right-0 h-full w-full bg-gray/20 z-modal-overlay" v-if="isOpened" @click="closeModal"></div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { TransitionEnum } from '@/enums/TransitionEnum';

const modalStore = useModalStore();
const { isOpened } = storeToRefs(modalStore);

const closeModal = async () => {
    modalStore.close();
};
</script>
