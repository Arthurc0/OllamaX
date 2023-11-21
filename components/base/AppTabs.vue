<template>
    <div class="flex flex-col items-start w-full h-full gap-5">
        <div tabindex="1" role="tablist" class="select-none flex items-center gap-1 bg-gray/5 rounded-lg p-2" @keyup="keyUp">
            <span class="cursor-pointer font-semibold text-sm rounded-lg py-2 px-4 transition duration-200 hover:text-gray/80" :class="[tab.title === selectedTab ? 'text-gray bg-white shadow-lg' : 'text-gray/40']" v-for="tab in childrenProps" :key="tab.title" @click="selectTab(tab.title)">{{ tab.title }}</span>
        </div>
        <div tabindex="2" class="relative h-full w-full overflow-y-auto" role="tabpanel">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TabPropsInterface } from '@/interfaces/tabs/TabPropsInterface';

const props = defineProps<{
    modelValue?: string;
}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

defineSlots<{
    default(_: unknown): unknown;
}>();
const slots = useSlots();

const childrenProps = slots.default!().map<TabPropsInterface>((s) => ({ ...s.props as TabPropsInterface }));
const selectedTab = ref(props.modelValue ?? childrenProps[0]?.title);
provide('selectedTab', selectedTab);

const selectTab = (value: string) => {
    selectedTab.value = value;
    emit('update:modelValue', value);
};

const keyUp = (e: KeyboardEvent) => {
    if (['ArrowRight', 'ArrowLeft'].includes(e.code)) {
        const selectedTabIndex = childrenProps.findIndex((c) => c.title === selectedTab.value);
        if (e.code === 'ArrowRight') {
            const nextTab = childrenProps[selectedTabIndex + 1 >= childrenProps.length ? 0 : selectedTabIndex + 1];
            if (nextTab) selectTab(nextTab.title);
        } else {
            const previousTab = childrenProps[selectedTabIndex - 1 < 0 ? childrenProps.length - 1 : selectedTabIndex - 1];
            if (previousTab) selectTab(previousTab.title);
        }
    } else e.preventDefault();
};
</script>
