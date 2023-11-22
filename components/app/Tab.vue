<template>
    <Transition :name="TransitionEnum.FADE" mode="out-in">
        <div class="absolute w-full" v-if="isSelected">
            <slot />
        </div>
    </Transition>
</template>

<script setup lang="ts">
import type { TabPropsInterface } from '@/interfaces/tabs/TabPropsInterface';
import { TransitionEnum } from '@/enums/TransitionEnum';

const props = defineProps<TabPropsInterface>();

const selectedTab = ref(inject<Ref<string>>('selectedTab'));
const isSelected = computed(() => props.title === selectedTab.value);
</script>
