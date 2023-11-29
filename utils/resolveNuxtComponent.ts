import type { ComponentEnum } from '@/enums/ComponentEnum';

export const resolveNuxtComponent = (name: ComponentEnum) => {
    let res = defineAsyncComponent(async () => await import(`@/components/settings/Modal.vue`));
    if (name === 'SettingsModal') res = defineAsyncComponent(async () => await import(`@/components/settings/Modal.vue`));
    else if (name === 'SettingsClearDataModal') res = defineAsyncComponent(async () => await import(`@/components/settings/ClearDataModal.vue`));
    return res;
};
