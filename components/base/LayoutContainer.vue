<template>
    <div class="overflow-auto flex flex-1 flex-col">
        <div class="py-8 px-10 flex flex-col gap-2 items-center text-center">
            <h1 class="text-grey text-3xl font-semibold"><slot name="title" /></h1>
            <span class="text-gray/20 text-lg font-medium"><slot name="subtitle" /></span>
        </div>
        <div class="h-full">
            <slot name="content" />
        </div>
    </div>
</template>
