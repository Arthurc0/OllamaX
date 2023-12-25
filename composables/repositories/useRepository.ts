import { ErrorCodeEnum } from '@/enums/ErrorCodeEnum';
import { StatusCodeEnum } from '@/enums/StatusCodeEnum';
import { RequestError } from '@/classes/RequestError';
import { RouteEnum } from '@/enums/RouteEnum';
import type { AvailableRouterMethod } from 'nitropack';
import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData';

export const useRepository = (pendingValue: Ref<boolean>) => {
    const setPendingFalse = async (start: number): Promise<void> => {
        if (performance.now() - start < 500) await useTimeout(() => {}, 500);
        pendingValue.value = false;
    };

    return {
        async executeAll(requests: Promise<unknown>[]): Promise<unknown[]> {
            pendingValue.value = true;
            const start = performance.now();
            const responses = await Promise.all(requests);
            await setPendingFalse(start);
            return responses;
        },
        async request<T>(url: string, options: { method?: AvailableRouterMethod<string>; query?: Record<string, string> } = {}) {
            const env = useRuntimeConfig();
            pendingValue.value = true;
            const start = performance.now();

            try {
                const path = new URL(`${env.API_URL}${url}`);
                path.search = new URLSearchParams(options.query).toString();
                const response = await useFetch(path.href, {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    ...options
                });
                await setPendingFalse(start);
                return response as _AsyncData<T | null, null>;
            } catch (error) {
                await setPendingFalse(start);
                if (error instanceof RequestError) {
                    if (error.statusCode === 401) await navigateTo(RouteEnum.LOGIN);
                    throw new RequestError(error.errorCode, error.statusCode);
                }
                throw new RequestError(ErrorCodeEnum.UNKNOWN, StatusCodeEnum.SERVER_ERROR);
            }
        }
    };
};
