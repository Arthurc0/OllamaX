const timeout = ref<NodeJS.Timeout>();

export const useTimeout = async (callback: () => void, duration: number): Promise<void> => {
    clearTimeout(timeout.value);
    await new Promise<void>((resolve) => {
        timeout.value = setTimeout(() => {
            callback();
            resolve();
        }, duration);
    });
};
