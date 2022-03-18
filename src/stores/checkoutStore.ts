import { defineStore } from 'pinia';
import { useCartStore } from '@/stores/cartStore';

export const useCheckoutStore = defineStore('checkout', {
    state: () => ({
        paymentType: '',
    }),
    getters: {
        isReadyForCheckout(state) {
            const cart = useCartStore();
            return Boolean(state.paymentType && !cart.isEmpty);
        },
    },
    actions: {
        setCashPaymentType() {
            this.paymentType = 'cash';
        },
        setCreditPaymentType() {
            this.paymentType = 'credit';
        },
    },
});
