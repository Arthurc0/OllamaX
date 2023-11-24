<template>
    <AppModal v-if="isClearDataModalOpened" @change="isClearDataModalOpened = false">
        <template #title>Effacer les données ?</template>
        <template #content="{ closeModal }">
            <div class="flex items-stretch self-end gap-4">
                <AppButton :type="ButtonTypeEnum.CANCEL" @click="closeModal">Non</AppButton>
                <AppButton :type="ButtonTypeEnum.OK">Oui</AppButton>
            </div>
        </template>
    </AppModal>

    <AppModal v-if="isSettingsModalOpened" @change="settingsModalChange" width="80%">
        <template #title>Paramètres</template>
        <template #content>
            <div class="flex flex-col h-[30vh]">
                <AppTabs>
                    <AppTab :title="settingsTabs.general">
                        <div class="flex flex-col items-start gap-6">
                            <AppForm :validation-schema="validationSchemaLanguage" class="flex flex-col gap-6" @submit="changeLanguage">
                                <AppInput :type="InputTypeEnum.SELECT" :select-items="languages" :field="fieldsGeneral.language" :pending="pendingLanguage" />
                            </AppForm>
                            <AppButton :type="ButtonTypeEnum.NO" @click="clearUserData">
                                <AppIcon color="text-white/90" :name="IconEnum.DELETE" size="xs" />
                                <span>Effacer les données</span>
                            </AppButton>
                        </div>
                    </AppTab>
                    <AppTab :title="settingsTabs.themes">
                        <div class="flex flex-col gap-7 pb-4">
                            <div class="grid grid-cols-4 gap-4">
                                <SettingsAddThemeCard @click="addTheme" />
                            </div>
                            <div class="flex flex-col gap-3">
                                <h4 class="text-md font-semibold text-gray/80">Personnalisés</h4>
                                <div class="grid grid-cols-4 gap-4">
                                    <SettingsThemeCard v-for="theme in customThemes" :key="theme.name" :theme="theme" />
                                </div>
                            </div>
                            <div class="flex flex-col gap-3">
                                <h4 class="text-md font-semibold text-gray/80">Par défaut</h4>
                                <div class="grid grid-cols-4 gap-4">
                                    <SettingsThemeCard :theme="selectedTheme" />
                                    <SettingsThemeCard v-for="theme in defaultThemes" :key="theme.name" :theme="theme" />
                                </div>
                            </div>
                        </div>
                    </AppTab>
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
import { IconEnum } from '@/enums/IconEnum';
import { InputTypeEnum } from '@/enums/input/InputTypeEnum';
import { InputStyleEnum } from '@/enums/input/InputStyleEnum';
import * as yup from 'yup';
import { RequestError } from '@/classes/RequestError';
import { ErrorCodeEnum } from '@/enums/ErrorCodeEnum';
import type { SelectItemInterface } from '@/interfaces/select/SelectItemInterface';
import { ButtonTypeEnum } from '@/enums/button/ButtonTypeEnum';
import type { ThemeInterface } from '@/interfaces/theme/ThemeInterface';

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
const selectedTheme: ThemeInterface = {
    name: 'Light Purple',
    gradient: ['#f0f5ff', '#4b3dc9'],
    selected: true
};
const defaultThemes: ThemeInterface[] = [
    { name: 'Dark Purple', gradient: ['#363636', '#4b3dc9'] }
];
const customThemes: ThemeInterface[] = [
    { name: 'Custom 1', gradient: ['red', 'yellow'] }
];
const addTheme = () => {
    console.log('add theme');
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

const settingsModalChange = (value: boolean) => {
    emit('update:modelValue', value);
};
</script>
