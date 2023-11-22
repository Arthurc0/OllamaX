<template>
    <div :style="{ width: selectBoxWidth }" class="relative cursor-pointer max-w-full select-none inline-flex items-center border-2 justify-between gap-6 bg-light-gray rounded-lg py-[3px] pl-3 pr-1 text-gray/50 text-sm transition duration-200 hocus:border-gray/20 font-medium" :class="[isSelectListShowed ? 'border-gray/20' : 'border-gray/5']" @click="toggleSelectList">
        <span class="text-gray/70" v-if="pending">Chargement...</span>
        <span class="text-gray/90 truncate" :ref="getTitleWidth" v-else>{{ selectedItem.label }}</span>
        <AppLoader size="sm" v-if="pending" />
        <AppIcon v-else-if="isSelectListShowed" :name="IconEnum.ARROW_UP" size="sm" />
        <AppIcon v-else :name="IconEnum.ARROW_DOWN" size="sm" />

        <Transition :name="TransitionEnum.SELECT_LIST_POPUP">
            <div v-show="isSelectListShowed" class="absolute w-full flex flex-col items-stretch bg-white left-0 bottom-0 gap-1 p-2 rounded-lg p-1 shadow-md border-2 border-light-gray" style="transform: translateY(105%);">
                <div class="cursor-pointer transition duration-200 py-1 px-2 rounded-md text-sm text-gray/80 hover:bg-light-blue" :class="[isSelectedItem(item) ? 'bg-light-blue' : '']" v-for="item in items" :key="item.value" @click="changeItem(item)">
                    <span>{{ item.label }}</span>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';
import type { SelectItemInterface } from '@/interfaces/select/SelectItemInterface';

const props = defineProps<{
    items: SelectItemInterface[];
    pending: boolean;
}>();
const emit = defineEmits<(e: 'change', value: string) => Promise<void>>();
const selectedItem: SelectItemInterface = reactive({ ...props.items.find((i) => i.default) ?? props.items[0]! });
const isSelectListShowed = ref(false);
const maxItemLength = Math.max(...props.items.map((i) => i.label.length));
const defaultItemLength = selectedItem.label.length;
const selectBoxWidth = ref('fit-content');
const titleWidth = ref(0);

const toggleSelectList = () => {
    if (!props.pending) isSelectListShowed.value = !isSelectListShowed.value;
};
const changeItem = (item: SelectItemInterface) => {
    selectedItem.label = item.label;
    selectedItem.value = item.value;
    emit('change', item.value);
};
const isSelectedItem = (item: SelectItemInterface): boolean => {
    return item.label === selectedItem.label && item.value === selectedItem.value;
};
const getTitleWidth = async (el: Element | ComponentPublicInstance | null) => {
    if (selectBoxWidth.value === 'fit-content') {
        await nextTick();
        titleWidth.value = (el as HTMLElement).clientWidth;
        selectBoxWidth.value = `${titleWidth.value * maxItemLength / defaultItemLength + 75}px`;
    }
};
</script>
