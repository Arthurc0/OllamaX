<template>
    <div class="relative">
        <textarea rows="1" class="resize-none overflow-y-auto flex bg-white border-1 shadow-md shadow-gray/5 text-gray/80 rounded-lg w-full py-4 pl-4 pr-14 placeholder:text-gray/40 transition duration-200 focus:border-gray/10 font-medium border-gray/5 focus:shadow-sm" :style="{ maxHeight: '140px', height: `${60 + inputHeightScale * 20}px` }" placeholder="Message..." v-model="message" @keydown.enter="textareaSendMessage" />
        <div class="absolute flex items-center justify-center right-3 border-2 border-gray/5 bottom-3 rounded-lg p-1 transition duration-200" :class="[canSend ? 'bg-gray/10 cursor-pointer hover:bg-gray/10 hover:border-gray/10 text-gray/80' : 'bg-gray/5 text-gray/40']" :disabled="!canSend" @click="sendMessage">
            <AppIcon :name="IconEnum.SEND" custom-size="25" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';

const emit = defineEmits<(e: 'send', message: string) => Promise<void>>();

const message = ref('');
const inputHeightScale = ref(0);
const canSend = computed(() => message.value.trim().length > 0);
const messageLineBreaks = computed(() => message.value.split('\n').length);

watch(messageLineBreaks, (newValue, oldValue) => {
    if (newValue === 1) inputHeightScale.value = 0;
    else {
        if (newValue > oldValue) inputHeightScale.value++;
        else inputHeightScale.value--;
    }
});
const sendMessage = (e: Event, isTextarea: boolean = false) => {
    if (!canSend.value) return;
    emit('send', message.value.trim());
    message.value = '';
    if (isTextarea) (e as KeyboardEvent).preventDefault();
    inputHeightScale.value = 0;
};

const textareaSendMessage = (e: KeyboardEvent) => {
    if (e.shiftKey) return;
    sendMessage(e, true);
};
</script>
