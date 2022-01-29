import { defineStore } from 'pinia';
import Item from '@/lib/models/Item';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartItems: [] as Array<Item>,
    }),
    getters: {
        getContents(state) {
            return state.cartItems;
        },
        isEmpty(state) {
            return state.cartItems.length === 0;
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
    },
});
