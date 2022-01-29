import { defineStore } from 'pinia';
import { container } from 'tsyringe';
import ItemService from '@/lib/services/ItemService';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';

const itemService = container.resolve(ItemService);

export const usePrototypeStore = defineStore('prototypes', {
    state: () => ({
        itemPrototypes: [] as Array<Item>,
        addonPrototypes: [] as Array<Addon>,
    }),
    getters: {
        getItemPrototypes(state) {
            return state.itemPrototypes;
        },
        getAddonPrototypes(state) {
            return state.addonPrototypes;
        },
    },
    actions: {
        async fetchPrototypes() {
            this.itemPrototypes = await itemService.getAllItems();
            this.addonPrototypes = await itemService.getAllAddons();
        },
    },
});
