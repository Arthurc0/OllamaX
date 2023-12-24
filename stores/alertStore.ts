import { AlertTypeEnum } from '@/enums/alert/AlertTypeEnum';

export const useAlertStore = defineStore('alert', {
    state: () => ({
        show: false,
        alertId: 0,
        message: '',
        title: '',
        type: AlertTypeEnum.SUCCESS
    }),
    actions: {
        setAlert(title: string, message: string, type: AlertTypeEnum, duration: number = 4000): void {
            this.title = title;
            this.message = message;
            this.type = type;
            this.alertId++;
            this.show = true;
            useTimeout(() => {
                this.closeAlert();
            }, duration);
        },
        closeAlert(): void {
            this.show = false;
        }
    },
    getters: {
        getId(): number {
            return this.alertId;
        },
        getMessage(): string {
            return this.message;
        },
        getTitle(): string {
            return this.title;
        },
        getType(): AlertTypeEnum {
            return this.type;
        },
        isShowed(): boolean {
            return this.show;
        }
    }
});
