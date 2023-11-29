<template>
    <LayoutContainer>
        <template #title>Discussion 1</template>
        <template #subtitle>Vu il y a 2 heures</template>
        <template #content>
            <div class="relative h-full py-8 px-10 flex flex-col justify-between overflow-auto">
                <AppIcon class="absolute top-[50%] left-[50%] center" color="text-gray/5" size="3xl" :name="IconEnum.OLLAMA" />
                <div class="flex flex-col items-stretch">messages</div>
                <div class="relative">
                    <input class="bg-white border-2 shadow-md shadow-gray/5 text-gray/80 rounded-lg w-full py-3 pl-4 pr-12 placeholder:text-gray/40 transition duration-200 focus:border-gray/10 font-medium border-gray/5 focus:shadow-sm" placeholder="Message..." v-model="message" @keyup.enter="sendMessage" />
                    <div class="absolute flex items-center justify-center right-2 top-[50%] border-2 border-gray/5 translate-y-[-50%] rounded-lg p-1 transition duration-200" :class="[canSend ? 'bg-gray/10 cursor-pointer hover:bg-gray/10 hover:border-gray/10 text-gray/80' : 'bg-gray/5 text-gray/40']" :disabled="!canSend" @click="sendMessage">
                        <AppIcon :name="IconEnum.SEND" custom-size="25" />
                    </div>
                </div>
            </div>
        </template>
    </LayoutContainer>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';

const message = ref('');

const canSend = computed(() => message.value.length > 0);

const sendMessage = () => {
    if (!canSend.value) return;
    console.log(message.value);
    message.value = '';
};
</script>
