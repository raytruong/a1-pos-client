import { defineStore } from 'pinia';
import container from '@/containerConfig';
import ItemService from '@/lib/services/ItemService';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';

const itemService = container.resolve(ItemService);

export const usePrototypeStore = defineStore('prototypes', {
    state: () => ({
        itemPrototypes: new Array<Item>(),
    }),
    getters: {
        items(state): Array<Item> {
            return state.itemPrototypes as Array<Item>;
        },
        addons(state): Array<Addon> {
            const filtered = state.itemPrototypes.filter((item) => {
                return item.category === 'Addon';
            }) as unknown;
            return filtered as Array<Addon>;
        },
        categories(state): Set<string> {
            const categories: Set<string> = new Set(
                state.itemPrototypes.map((item) => item.category),
            );
            return categories;
        },
    },
    actions: {
        async fetchPrototypes() {
            this.itemPrototypes = await itemService.getAllItems();
        },
    },
});
