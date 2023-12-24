import type { ModelDto } from '@/server/dtos/ModelDto';

const request = async <T>(url: string, options: RequestInit & { query?: Record<string, string> } = {}): Promise<T> => {
    const env = useRuntimeConfig();

    const { query, ...baseOptions } = options;
    const path = new URL(`${env.OLLAMA_URL}${url}`);
    path.search = new URLSearchParams(options.query).toString();

    const response = await fetch(path.href, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        ...baseOptions
    });
    return await response.json();
};

export const getModels = async () => {
    const models = await request<ModelDto[]>('/tags');
    return models;
};
