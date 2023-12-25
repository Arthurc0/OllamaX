<template>
    <div class="flex flex-1 flex-col gap-12 p-12">
        <h1 class="text-gray text-3xl font-semibold select-none">Modèles</h1>
        <div class="flex flex-col gap-4">
            <AppButton :type="ButtonTypeEnum.ADD_MODEL" :disabled="pendingModels">
                <AppIcon :name="IconEnum.ADD" custom-size="25" />
                <span>Ajouter</span>
            </AppButton>
            <h2 class="text-xl font-medium text-gray/80">Sélectionné</h2>
            <h2 class="text-xl font-medium text-gray/80">Installés</h2>
            <h2 class="text-xl font-medium text-gray/80">Disponibles</h2>
            <div v-if="!pendingModels">
                <p v-if="!installedModels?.length">Aucun modèle installé</p>
                <ModelCard v-else v-for="model in installedModels" :key="model.digest" :model="model" />
            </div>
            <AppLoader v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconEnum } from '@/enums/IconEnum';
import { ButtonTypeEnum } from '@/enums/button/ButtonTypeEnum';
import type { ModelInterface } from '@/interfaces/model/ModelInterface';

const pendingModels = ref(false);
const installedModels = ref<ModelInterface[] | null>(null);
const modelRepository = useModelRepository(pendingModels);

const getInstalledModels = async () => {
    const { data } = await modelRepository.getInstalledModels();
    installedModels.value = data.value;
};

onMounted(() => {
    getInstalledModels();
});
</script>
