export const useModalStore = defineStore('modal', {
    state: () => ({
        openedModalCount: 0,
        currentZIndexModal: 199,
        currentZIndexModalOverlay: 199
    }),
    actions: {
        addModal() {
            this.currentZIndexModalOverlay = this.currentZIndexModal + 1;
            this.currentZIndexModal = this.currentZIndexModalOverlay + 1;
            return {
                zIndexModal: this.currentZIndexModal,
                zIndexModalOverlay: this.currentZIndexModalOverlay
            };
        },
        openModal() {
            return ++this.openedModalCount;
        },
        removeModal() {
            this.openedModalCount--;
            this.currentZIndexModal -= 2;
            this.currentZIndexModalOverlay -= 2;
        }
    },
    getters: {
        getOpenedModalCount(): number {
            return this.openedModalCount;
        }
    }
});
