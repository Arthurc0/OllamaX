<template>
    <div class="relative group overflow-hidden cursor-pointer border-2 rounded-lg shadow-lg hover:shadow-md transition duration-200 text-gray/70 hover:text-gray/60 flex flex-col" :class="[model?.selected ? 'border-gray/10' : 'border-light-gray']">
    </div>
</template>

<script setup lang="ts">
import type { ModelInterface } from '@/interfaces/model/ModelInterface';

defineProps<{
    model: ModelInterface;
}>();
</script>
