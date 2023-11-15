<template>
    <div class="layout overflow-hidden flex items-stretch h-screen">
        <BaseAppSidebar />
        <div class="p-7 overflow-auto flex flex-1 flex-col gap-7">
            <slot />
        </div>
    </div>
</template>
