import { ErrorCodeEnum } from '@/enums/ErrorCodeEnum';
import type { ApiResponseInterface } from '@/interfaces/repositories/ApiResponseInterface';
import { StatusCodeEnum } from '@/enums/StatusCodeEnum';
import { RequestError } from '@/classes/RequestError';
import { RouteEnum } from '@/enums/RouteEnum';

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
        async request<T>(url: string, options: RequestInit & { query?: Record<string, string> } = {}): Promise<T> {
            const env = useRuntimeConfig();
            pendingValue.value = true;
            const start = performance.now();

            try {
                const { query, ...baseOptions } = options;
                const path = new URL(`${env.API_URL}${url}`);
                path.search = new URLSearchParams(options.query).toString();

                const response = await fetch(path.href, {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    ...baseOptions
                });
                const data = await response.json() as T;
                if (response.status >= 400) throw new RequestError((data as ApiResponseInterface).errorCode, response.status);
                await setPendingFalse(start);
                return data;
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
