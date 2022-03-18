import { defineStore } from 'pinia';
import Item from '@/lib/models/Item';
import Currency from '@/lib/models/Currency';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartItems: [] as Array<Item>,
        paymentType: '',
    }),
    getters: {
        items(state): Array<Item> {
            return state.cartItems as Array<Item>;
        },
        isEmpty(state): boolean {
            return state.cartItems.length === 0;
        },
        totalPrice(state): Currency {
            const initVal = new Currency(0);
            const reducer = (acc: any, item: any): Currency =>
                acc.add(item.totalPrice as Currency);
            return state.cartItems.reduce(reducer, initVal) as Currency;
        },
        isReadyForCheckout(state): boolean {
            return Boolean(state.paymentType && state.cartItems.length > 0);
        },
    },
    actions: {
        addItem(itemToAdd: Item) {
            this.cartItems.push(itemToAdd);
        },
        addItemArray(itemArrayToAdd: Array<Item>) {
            this.cartItems.concat(itemArrayToAdd);
        },
        removeItem(itemToRemove: Item) {
            this.cartItems = this.cartItems.filter((item) => {
                return item._id !== itemToRemove._id;
            });
        },
        clearAll() {
            this.cartItems.length = 0;
        },
        setCashPaymentType() {
            this.paymentType = 'cash';
        },
        setCreditPaymentType() {
            this.paymentType = 'credit';
        },
    },
});
