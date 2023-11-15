<template>
    <div class="flex flex-col gap-9 border-r-2 border-gray/5 py-7 px-4 text-gray/80 w-[250px]">
        <span class="font-bold uppercase tracking-wide px-4 text-xl">OllamaX</span>
        <div class="flex flex-col justify-between h-full overflow-hidden items-stretch gap-4">
            <nav class="flex flex-col gap-3 overflow-y-auto">
                <NuxtLink v-for="link in navLinks" :key="link.label" :to="link.url" class="flex items-center gap-3 font-semibold w-full transition duration-200 px-4 py-2 rounded-md hocus:bg-light-blue hocus:text-purple text-md" :title="link.label">
                    <BaseAppIcon size="md" :name="link.icon" />
                    <span class="truncate">{{ link.label }}</span>
                </NuxtLink>
            </nav>
            <NuxtLink :to="RouteEnum.SETTINGS" class="flex items-center gap-3 font-semibold w-full transition duration-200 px-4 py-2 rounded-md hocus:bg-light-blue hocus:text-purple text-md">
                <BaseAppIcon size="md" :name="IconEnum.SETTINGS" />
                <span>Paramètres</span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/base/IconEnum';
import type { NavLinkInterface } from '@/interfaces/base/NavLinkInterface';
import { RouteEnum } from '@/enums/base/RouteEnum';

const navLinks: NavLinkInterface[] = [
    {
        icon: IconEnum.CHAT,
        label: 'Discussion 1',
        url: RouteEnum.CHAT
    }
];
</script>
