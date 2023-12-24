import { AlertTypeEnum } from '@/enums/alert/AlertTypeEnum';

const useAlert = (title: string, message: string, type: AlertTypeEnum, duration?: number): void => {
    const alertStore = useAlertStore();
    alertStore.setAlert(title, message, type, duration);
};
export const useSuccessAlert = (title: string, message: string, duration?: number): void => {
    useAlert(title, message, AlertTypeEnum.SUCCESS, duration);
};
export const useErrorAlert = (title: string, message: string, duration?: number): void => {
    useAlert(title, message, AlertTypeEnum.ERROR, duration);
};
