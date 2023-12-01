<template>
    <div class="relative flex flex-1 flex-col">
        <div ref="chatArea" class="overflow-y-auto h-full pb-3">
            <div class="z-chat-title sticky top-0 backdrop-blur-sm select-none p-6 flex flex-col gap-2 items-center text-center">
                <h1 class="text-gray text-3xl font-semibold">Discussion 1</h1>
                <span class="text-gray/20 text-lg font-medium">Vu il y a 2 heures</span>
            </div>
            <div class="py-3 px-10 flex flex-col items-stretch gap-9 w-3/4 m-auto whitespace-pre-line">
                <MessageCard v-for="(message, index) in messages" :key="index" from="me" :content="message" />
            </div>
        </div>
        <div class="px-6 pb-6 select-none w-3/4 m-auto">
            <MessageInput @send="sendMessage" />
        </div>
    </div>
</template>

<script setup lang="ts">
const chatArea = ref<HTMLElement>();
const messages = ref<string[]>([]);

const sendMessage = async (message: string) => {
    messages.value.push(message);
    await nextTick();
    chatArea.value?.scrollTo({ behavior: 'smooth', top: chatArea.value.scrollHeight });
};
</script>
