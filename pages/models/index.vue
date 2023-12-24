<template>
    <div class="flex flex-1 flex-col gap-12 p-12">
        <h1 class="text-gray text-3xl font-semibold select-none">Modèles</h1>
        <div class="flex flex-col gap-4">
            <AppButton :type="ButtonTypeEnum.ADD_MODEL">
                <AppIcon :name="IconEnum.ADD" custom-size="25" />
                <span>Ajouter</span>
            </AppButton>
            <h2 class="text-xl font-medium text-gray/80">Sélectionné</h2>
            <h2 class="text-xl font-medium text-gray/80">Installés</h2>
            <h2 class="text-xl font-medium text-gray/80">Disponibles</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
import { ButtonTypeEnum } from '@/enums/button/ButtonTypeEnum';
</script>
