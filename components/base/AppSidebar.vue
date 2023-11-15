<template>
    <div class="relative flex flex-col gap-7 bg-white border-r-2 border-gray/5 py-7 px-4 text-gray/80 w-[250px]">
        <BaseAppIcon class="mt-[-18px] self-center" size="2xl" :name="IconEnum.OLLAMAX" />
        <div class="flex flex-col justify-between h-full overflow-hidden items-stretch gap-4">
            <nav class="flex flex-col gap-3 overflow-y-auto">
                <NuxtLink v-for="link in navLinks" :key="link.label" :to="link.url" class="flex items-center gap-3 font-semibold w-full transition duration-200 px-4 py-2 rounded-md hocus:bg-light-blue hocus:text-purple text-md" :class="link.url === currentRoute ? 'bg-light-blue text-purple' : ''" :title="link.label">
                    <BaseAppIcon size="md" :name="link.icon" />
                    <span class="truncate">{{ link.label }}</span>
                </NuxtLink>
            </nav>
            <div>
                <div class="absolute left-0 right-0 border-t-2 border-gray/5" />
                <NuxtLink :to="RouteEnum.SETTINGS" class="flex mt-4 items-center gap-3 font-semibold w-full transition duration-200 px-4 py-2 rounded-md hocus:bg-light-blue hocus:text-purple text-md" :class="RouteEnum.SETTINGS === currentRoute ? 'bg-light-blue text-purple' : ''">
                    <BaseAppIcon size="md" :name="IconEnum.SETTINGS" />
                    <span>Paramètres</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/base/IconEnum';
import type { NavLinkInterface } from '@/interfaces/base/NavLinkInterface';
import { RouteEnum } from '@/enums/base/RouteEnum';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

const navLinks: NavLinkInterface[] = [
    {
        icon: IconEnum.CHAT,
        label: 'Discussion 1',
        url: RouteEnum.CHAT
    }
];
const route: RouteLocationNormalizedLoaded = useRoute();
const currentRoute = computed(() => route.path);
</script>
