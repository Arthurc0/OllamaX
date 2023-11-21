<template>
    <div class="flex flex-col gap-6 bg-white border-r-2 border-gray/5 text-gray/80 w-[250px]">
        <BaseAppIcon class="self-center" size="xl" :name="IconEnum.OLLAMAX" />
        <div class="flex flex-col justify-between h-full overflow-hidden items-stretch gap-4">
            <nav class="mx-4 flex flex-col gap-3 overflow-y-auto">
                <NuxtLink v-for="link in navLinks" :key="link.label" :to="link.url" class="group select-none flex items-center gap-3 font-semibold w-full transition duration-200 px-4 py-2 rounded-md hocus:bg-light-blue hocus:text-purple text-md" :class="link.url === currentRoute ? 'bg-light-blue text-purple' : ''" :title="link.label">
                    <BaseAppIcon size="xs" :name="link.icon" class="transition duration-200 group-hover:text-purple/70 group-focus:text-purple/70" :class="link.url === currentRoute ? 'text-purple/70' : 'text-gray/40'" />
                    <span class="truncate">{{ link.label }}</span>
                </NuxtLink>
            </nav>
            <div>
                <div class="border-t-2 border-gray/5" />
                <div class="relative m-4">
                    <Transition :name="TransitionEnum.MENU_POPUP">
                        <div class="select-none absolute w-full bg-white flex flex-col gap-4 py-3 rounded-md text-[15px] text-gray/70" style="transform: translateY(-120%); box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 20px 5px" v-if="isUserNavShowed">
                            <div class="flex items-center justify-between px-4 gap-3 font-semibold">
                                <span class="text-lg break-all leading-none">Arthurc0</span>
                                <BaseAppImage class="rounded-full border border-2 border-gray/30" size="md" :type="ImageTypeEnum.PROFILE" src="profile.jpg" />
                            </div>
                            <hr class="border-t-2 border-gray/5">
                            <div class="flex flex-col gap-1 px-3 font-medium">
                                <NuxtLink @click="toggleUserNav" v-for="link in userNavLinks" :key="link.label" :to="link.url" class="group select-none flex items-center gap-2 p-[6px] rounded-md transition duration-200 hocus:bg-light-blue hocus:text-purple text-md">
                                    <BaseAppIcon size="xs" :name="link.icon" class="transition duration-200 text-gray/40 group-hover:text-purple/70 group-focus:text-purple/70" />
                                    <span>{{ link.label }}</span>
                                </NuxtLink>
                            </div>
                        </div>
                    </Transition>
                    <NuxtLink :to="RouteEnum.CHAT" @click="toggleUserNav" class="z-user-profile relative select-none flex items-center gap-3 font-semibold transition duration-200 px-4 py-2 rounded-md hocus:bg-light-blue hocus:text-purple text-md">
                        <BaseAppImage class="rounded-full border border-2 border-gray/30" size="sm" :type="ImageTypeEnum.PROFILE" src="profile.jpg" />
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

const navLinks: NavLinkInterface[] = [
    {
        icon: IconEnum.CHAT,
        label: 'Discussion 1',
        url: RouteEnum.CHAT
    }
];
const userNavLinks: NavLinkInterface[] = [
    {
        icon: IconEnum.SETTINGS,
        label: 'Paramètres',
        url: RouteEnum.CHAT
    },
    {
        icon: IconEnum.LOGOUT,
        label: 'Déconnexion',
        url: RouteEnum.CHAT
    }
];
const route: RouteLocationNormalizedLoaded = useRoute();
const currentRoute = computed(() => route.path);

const isUserNavShowed = ref(false);
const toggleUserNav = () => {
    isUserNavShowed.value = !isUserNavShowed.value;
};
</script>
