<template>
    <div class="flex flex-col gap-6 bg-white border-r-2 border-gray/5 text-gray/80 w-[250px]">
        <AppIcon class="self-center" size="xl" :name="IconEnum.OLLAMAX" />
        <div class="flex flex-col justify-between h-full overflow-hidden items-stretch gap-4">
            <nav class="mx-4 flex flex-col gap-3 overflow-y-auto">
                <NuxtLink v-for="link in navLinks" :key="link.label" :to="link.url" class="group select-none flex items-center gap-2 font-semibold w-full transition duration-200 px-4 py-2 rounded-md hocus:bg-light-blue hocus:text-purple text-md" :class="isActiveLink(link.url) ? 'bg-light-blue text-purple' : ''" :title="link.label">
                    <AppIcon custom-size="25" :name="link.icon" class="transition duration-200 group-hover:text-purple/70 group-focus:text-purple/70" :class="isActiveLink(link.url) ? 'text-purple/70' : 'text-gray/40'" />
                    <span class="truncate">{{ link.label }}</span>
                </NuxtLink>
            </nav>
            <div>
                <div class="border-t-2 border-gray/5" />
                <div class="m-4 mb-2">
                    <NuxtLink :to="RouteEnum.MODELS" class="group select-none flex flex-col gap-1 transition duration-200 px-4 py-2 rounded-md hover:bg-light-blue" :class="[isActiveLink(RouteEnum.MODELS) ? 'bg-light-blue' : '']">
                        <span class="group-hover:text-purple/50 transition duration-200 text-gray/30 text-sm ml-1 font-medium" :class="activeModelLinkClasses.subtitle">Modèle utilisé</span>
                        <div class="flex items-center gap-2">
                            <AppIcon custom-size="25" :name="IconEnum.MODEL" color="group-hover:text-purple/70 transition duration-200 text-gray/50" :class="activeModelLinkClasses.icon" />
                            <span class="group-hover:text-purple transition duration-200 text-gray/80 text-md font-semibold" :class="activeModelLinkClasses.modelName">Llama2</span>
                        </div>
                    </NuxtLink>
                </div>
                <div class="relative m-4 mt-2">
                    <Transition :name="TransitionEnum.MENU_POPUP">
                        <div class="select-none absolute w-full bg-white flex flex-col gap-4 py-3 rounded-md text-[15px] text-gray/70 shadow-around" style="transform: translateY(-108%);" v-if="isUserNavShowed">
                            <div class="flex items-center justify-between px-4 gap-3 font-semibold">
                                <span class="text-lg break-all leading-none">Arthurc0</span>
                                <AppImage class="rounded-full border border-2 border-gray/30" size="md" :type="ImageTypeEnum.PROFILE" src="profile.jpg" />
                            </div>
                            <hr class="border-t-2 border-gray/5">
                            <div class="flex flex-col gap-1 px-3 font-medium">
                                <NuxtLink @click="userNavLinkClick(link)" v-for="link in userNavLinks" :key="link.label" :to="link.url" class="group cursor-pointer  select-none flex items-center gap-2 p-[6px] rounded-md transition duration-200 hocus:bg-light-blue hocus:text-purple text-md">
                                    <AppIcon size="xs" :name="link.icon" class="transition duration-200 text-gray/40 group-hover:text-purple/70 group-focus:text-purple/70" />
                                    <span>{{ link.label }}</span>
                                </NuxtLink>
                            </div>
                        </div>
                    </Transition>
                    <NuxtLink @click="toggleUserNav" class="z-user-profile cursor-pointer relative select-none flex items-center gap-3 font-semibold transition duration-200 px-4 py-2 rounded-md hover:bg-light-blue hover:text-purple text-md" :class="[isUserNavShowed ? 'bg-light-blue text-purple' : '']">
                        <AppImage class="rounded-full border border-2 border-gray/30" size="sm" :type="ImageTypeEnum.PROFILE" src="profile.jpg" />
                        <span>Arthurc0</span>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
import type { NavLinkInterface } from '@/interfaces/sidebar/NavLinkInterface';
import { RouteEnum } from '@/enums/RouteEnum';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { ImageTypeEnum } from '@/enums/ImageTypeEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';
import { ComponentEnum } from '@/enums/ComponentEnum';

const modalStore = useModalStore();
const route: RouteLocationNormalizedLoaded = useRoute();
const isUserNavShowed = ref(false);

const isActiveLink = (link?: string) => {
    if (link) return link === route.path;
    return false;
};
const activeModelLinkClasses = computed(() => ({
    subtitle: isActiveLink(RouteEnum.MODELS) ? 'text-purple/50' : '',
    icon: isActiveLink(RouteEnum.MODELS) ? 'text-purple/70' : '',
    modelName: isActiveLink(RouteEnum.MODELS) ? 'text-purple' : ''
}));

const navLinks: NavLinkInterface[] = [
    {
        icon: IconEnum.CHAT,
        label: 'Discussion 1',
        url: RouteEnum.CHAT
    }
];

const openSettingsModal = () => {
    modalStore.open({
        title: 'Paramètres',
        view: ComponentEnum.SETTINGS_MODAL,
        width: '600px',
        height: '370px'
    });
};
const userNavLinks: NavLinkInterface[] = [
    {
        icon: IconEnum.SETTINGS,
        label: 'Paramètres',
        action: () => {
            openSettingsModal();
        }
    },
    {
        icon: IconEnum.LOGOUT,
        label: 'Déconnexion',
        url: RouteEnum.CHAT
    }
];
const toggleUserNav = () => {
    isUserNavShowed.value = !isUserNavShowed.value;
};
const userNavLinkClick = (link: NavLinkInterface) => {
    if (link.action) {
        link.action();
    }
    toggleUserNav();
};
</script>
