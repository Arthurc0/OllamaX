<template>
    <div class="flex flex-col gap-2">
        <label class="text-sm tracking-wide" :for="field.name">{{ field.label }}</label>
        <AppSelect v-if="type === InputTypeEnum.SELECT" :pending="pending!" :items="selectItems ?? []" @change="updateSelectValue" :id="field.name" />
        <textarea v-else-if="type === InputTypeEnum.TEXTAREA" @input="updateInputValue" :id="field.name"></textarea>
        <div v-else-if="[InputTypeEnum.TEXT, InputTypeEnum.PASSWORD].includes(type)">
            <input v-if="style === InputStyleEnum.EDITABLE" autocomplete="off" class="w-full p-1 text-sm transition duration-200 hocus:bg-light-gray" :class="[!!errors[field.name] ? 'border-2 border-red' : '']" @input="updateInputValue" :type="type" :id="field.name" />

            <input v-else autocomplete="off" class="w-full p-3 text-sm bg-slate-200/80 rounded-md border-2 transition duration-200 focus:bg-slate-200/50" :class="[!!errors[field.name] ? 'border-2 border-red' : 'border-slate-300/80']" @input="updateInputValue" :type="type" :id="field.name" />
        </div>
        <Transition :name="TransitionEnum.FADE_SLIDE">
            <p v-if="!!errors[field.name]" class="text-red-500 text-sm font-semibold">{{ errors[field.name] }}</p>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { InputTypeEnum } from '@/enums/input/InputTypeEnum';
import { InputStyleEnum } from '@/enums/input/InputStyleEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';
import type { FieldInterface } from '@/interfaces/input/FieldInterface';
import type { SelectItemInterface } from '@/interfaces/select/SelectItemInterface';

const props = defineProps<{
    field: FieldInterface;
    linkedFields?: FieldInterface[];
    pending?: boolean;
    type: InputTypeEnum;
    style?: InputStyleEnum;
    selectItems?: SelectItemInterface[];
}>();

const errors = inject('errors') as Record<string, string>;
const setFormValue = inject('setFormValue') as (names: string[], value: string, validateField: boolean) => void;

const updateValue = (value: string): void => {
    if (props.linkedFields?.length) setFormValue([props.field.name, ...props.linkedFields.map((f) => f.name)], value, props.field?.validate ?? true);
    else setFormValue([props.field.name], value, props.field?.validate ?? true);
};
const updateInputValue = (e: Event): void => {
    const value = (e.target as HTMLInputElement).value;
    updateValue(value);
};
const updateSelectValue = (value: string): void => {
    updateValue(value);
};
</script>
