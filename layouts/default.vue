<template>
    <div class="layout overflow-hidden flex items-stretch h-screen">
        <BaseAppSidebar />
        <div class="p-7 overflow-auto flex flex-1 flex-col gap-7">
            <h1 class="text-grey text-2xl font-medium"><slot name="title" /></h1>
            <div class="flex flex-col overflow-auto h-full">
                <slot name="content" />
            </div>
        </div>
    </div>
</template>
