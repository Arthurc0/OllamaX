<template>
    <form @submit.prevent="submitForm()">
        <div class="flex flex-col gap-4">
            <slot />
        </div>
        <button v-if="buttonValue" type="submit" class="inline-flex gap-3 self-center items-center w-fit font-semibold tracking-wide bg-teal-800 px-10 py-3 rounded-3xl text-sm text-stone-100 hover:bg-teal-900 disabled:opacity-75 transition duration-[200ms] border-[3px] border-transparent focus:border-green-600" :disabled="pending">
            <AppLoader v-if="pending" size="md" />
            <span>{{ buttonValue }}</span>
        </button>
    </form>
</template>

<script setup lang="ts">
import * as yup from 'yup';

const props = defineProps<{
    buttonValue?: string;
    pending?: boolean;
    validationSchema: yup.AnyObject;
}>();
const emit = defineEmits<(e: 'submit', values: object) => Promise<void>>();

const yupSchema = yup.object(props.validationSchema);

const values = reactive<Record<string, string>>({});
const errors = reactive<Record<string, string>>({});
provide('errors', errors);


Object.keys(yupSchema.fields).forEach((key) => {
    values[key] = '';
    errors[key] = '';
});

const validateValues = async (names?: string[]): Promise<boolean> => {
    try {
        if (names) {
            const limitedValues: Record<string, string> = Object.keys(values).reduce((obj, v) => {
                if (names.includes(v)) return { ...obj, [v]: values[v] };
                return obj;
            }, {});
            const limitedSchema = yup.object(Object.keys(props.validationSchema).reduce((obj, key) => {
                if (Object.keys(limitedValues).includes(key)) {
                    return { ...obj, [key]: props.validationSchema[key] };
                }
                return obj;
            }, {}));
            await limitedSchema.validate(limitedValues, { abortEarly: false });
            Object.keys(limitedSchema.fields).forEach((key) => {
                errors[key] = '';
            });
        } else {
            await yupSchema.validate(values, { abortEarly: false });
            Object.keys(yupSchema.fields).forEach((key) => {
                errors[key] = '';
            });
        }
        return true;
    } catch (e: unknown) {
        if (yup.ValidationError.isError(e)) {
            const hasError: Record<string, string> = {};
            const errorPaths: string[] = [];
            e.inner.forEach((error) => {
                if (!hasError[error.path!]) {
                    errors[error.path!] = error.message;
                    hasError[error.path!] = error.message;
                }
                errorPaths.push(error.path!);
            });
            if (names) {
                names.forEach((name) => {
                    if (!errorPaths.includes(name)) errors[name] = '';
                });
            }
        }
        return false;
    }
};

const submitForm = async (validateField: boolean = true): Promise<void> => {
    if (props.pending) return;
    if (validateField) {
        if (await validateValues()) emit('submit', values);
    } else {
        emit('submit', values);
    }
};
const setFormValue = async (names: string[], value: string, validateField: boolean = true): Promise<void> => {
    values[names[0]!] = value;
    if (validateField) await validateValues(names);
    else await submitForm(validateField);
};
provide('setFormValue', setFormValue);
</script>
