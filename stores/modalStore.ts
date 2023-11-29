import { ComponentEnum } from '@/enums/ComponentEnum';
import type { ModalInterface } from '@/interfaces/modal/ModalInterface';

export const useModalStore = defineStore('modal', {
    state: () => ({
        isOpened: false,
        title: '',
        width: '',
        height: '',
        view: ComponentEnum.SETTINGS_MODAL,
        modals: [] as ModalInterface[]
    }),
    actions: {
        open(props: ModalInterface) {
            this.title = props.title;
            this.width = props.width ?? '400px';
            this.height = props.height ?? '300px';
            this.view = props.view;
            this.modals.push({ ...props, width: this.width, height: this.height });
            this.isOpened = true;
        },
        close() {
            this.modals.pop();
            if (this.modals.length) {
                const { title, width, height, view } = this.modals[this.modals.length - 1]!;
                this.title = title;
                this.width = width!;
                this.height = height!;
                this.view = view;
            } else {
                this.isOpened = false;
                useTimeout(() => {
                    this.title = '';
                    this.width = '';
                    this.height = '';
                    this.view = ComponentEnum.SETTINGS_MODAL;
                }, 300);
            }
        }
    },
    getters: {}
});
