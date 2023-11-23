<template>
    <AppModal v-if="isClearDataModalOpened" v-model="isClearDataModalOpened">
        <template #title>Effacer les données</template>
        <template #content>
            test
        </template>
    </AppModal>

    <AppModal v-if="isSettingsModalOpened" v-model="isSettingsModalOpened" width="80%">
        <template #title>Paramètres</template>
        <template #content>
            <div class="flex flex-col h-[30vh]">
                <AppTabs>
                    <AppTab :title="settingsTabs.general">
                        <div class="flex flex-col items-start gap-8">
                            <AppForm :validation-schema="validationSchemaLanguage" class="flex flex-col gap-6" @submit="changeLanguage">
                                <AppInput :type="InputTypeEnum.SELECT" :select-items="languages" :field="fieldsGeneral.language" :pending="pendingLanguage" />
                            </AppForm>
                            <AppButton :type="ButtonTypeEnum.DELETE" @click="clearUserData">Effacer les données</AppButton>
                        </div>
                    </AppTab>
                    <AppTab :title="settingsTabs.themes">Thèmes</AppTab>
                    <AppTab :title="settingsTabs.profile">
                        <LazyAppForm class="flex flex-col gap-6" button-value="Modifier" :pending="pendingSettings" :validation-schema="validationSchemaSettings" @submit="formSubmitSettings">
                            <AppInput :type="InputTypeEnum.TEXT" :style="InputStyleEnum.EDITABLE" :field="fieldsSettings.email" />
                            <AppInput :type="InputTypeEnum.PASSWORD" :style="InputStyleEnum.EDITABLE" :field="fieldsSettings.password" />
                        </LazyAppForm>
                    </AppTab>
                    <AppTab :title="settingsTabs.about">À propos</AppTab>
                </AppTabs>
            </div>
        </template>
    </AppModal>
</template>

<script setup lang="ts">
import { RouteEnum } from '@/enums/RouteEnum';
import { InputTypeEnum } from '@/enums/input/InputTypeEnum';
import { InputStyleEnum } from '@/enums/input/InputStyleEnum';
import * as yup from 'yup';
import { RequestError } from '@/classes/RequestError';
import { ErrorCodeEnum } from '@/enums/ErrorCodeEnum';
import type { SelectItemInterface } from '@/interfaces/select/SelectItemInterface';
import { ButtonTypeEnum } from '@/enums/button/ButtonTypeEnum';

const props = defineProps<{
    modelValue: boolean;
}>();
const emit = defineEmits<(e: 'update:modelValue', value: boolean) => void>();
const propsModelValue = computed(() => props.modelValue);
const isSettingsModalOpened = ref(false);
const isClearDataModalOpened = ref(false);
watch(propsModelValue, (value) => {
    isSettingsModalOpened.value = value;
});

const settingsTabs = {
    general: 'Général',
    themes: 'Thèmes',
    profile: 'Profil',
    about: 'À propos'
};

const pendingLanguage = ref(false);
const pendingSettings = ref(false);
const validationRules = useValidationRules();
const validationSchemaSettings = {
    email: yup.string().required(`Adresse email requise`).matches(validationRules.EMAIL_FORMAT, 'Adresse email incorrecte'),
    password: yup.string().trim().required('Mot de passe requis')
};
const validationSchemaLanguage = {
    language: yup.string().required()
};
const fieldsGeneral = {
    language: { name: 'language', label: 'Langue', validate: false }
};
const fieldsSettings = {
    email: { name: 'email', label: 'Adresse email' },
    password: { name: 'password', label: 'Mot de passe' }
};
const languages: SelectItemInterface[] = [
    { label: 'Français', value: 'fr', default: true },
    { label: 'Anglais', value: 'en' }
];

const changeLanguage = async (formValues: object): Promise<void> => {
    const yupSchema = yup.object(validationSchemaLanguage);
    const { language } = formValues as yup.InferType<typeof yupSchema>;
    console.log(language);
    // const authRepository = useAuthRepository(pendingLogin);
    // try {
    //     // useSuccessAlert('Connexion réussie', `Bienvenue ${response.user.name}`);
    //     await navigateTo(RouteEnum.CHAT);
    // } catch (e) {
    //     if (e instanceof RequestError) {
    //         if (e.errorCode === ErrorCodeEnum.INVALID_CREDENTIALS) useErrorAlert('Erreur de connexion', 'Informations de connexion incorrectes');
    //         else useErrorAlert('Erreur', 'Connexion impossible');
    //     }
    // }
};

const clearUserData = () => {
    isClearDataModalOpened.value = true;
};

const formSubmitSettings = async (formValues: object): Promise<void> => {
    // const yupSchema = yup.object(validationSchemaLogin);
    // const { email, password } = formValues as yup.InferType<typeof yupSchema>;
    // const authRepository = useAuthRepository(pendingLogin);
    try {
        // useSuccessAlert('Connexion réussie', `Bienvenue ${response.user.name}`);
        await navigateTo(RouteEnum.CHAT);
    } catch (e) {
        if (e instanceof RequestError) {
            if (e.errorCode === ErrorCodeEnum.INVALID_CREDENTIALS) useErrorAlert('Erreur de connexion', 'Informations de connexion incorrectes');
            else useErrorAlert('Erreur', 'Connexion impossible');
        }
    }
};
watch(isSettingsModalOpened, () => {
    emit('update:modelValue', isSettingsModalOpened.value);
});
</script>
