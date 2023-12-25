import { useRepository } from '@/composables/repositories/useRepository';
import type { ModelInterface } from '@/interfaces/model/ModelInterface';
import type { Ref } from 'vue';

export const useModelRepository = (pendingValue: Ref<boolean>) => {
    const repository = useRepository(pendingValue);

    return {
        async getInstalledModels() {
            return await repository.request<ModelInterface[]>(`/models`, {
                method: 'get'
            });
        }
    };
};
