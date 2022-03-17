import { defineStore } from 'pinia';
import container from '@/containerConfig';
import ItemService from '@/lib/services/ItemService';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';

const itemService = container.resolve(ItemService);

export const usePrototypeStore = defineStore('prototypes', {
    state: () => ({
        itemPrototypes: new Array<Item>(),
        addonPrototypes: new Array<Addon>(),
        itemCategories: new Set<string>(),
    }),
    getters: {
        getItemPrototypes(state): Array<Item> {
            return state.itemPrototypes as Array<Item>;
        },
        getAddonPrototypes(state): Array<Addon> {
            return state.addonPrototypes as Array<Addon>;
        },
        getItemCategories(state): Set<string> {
            return state.itemCategories;
        },
    },
    actions: {
        async fetchPrototypes() {
            this.itemPrototypes = await itemService.getAllItems();
            this.addonPrototypes = await itemService.getAllAddons();
            this.itemCategories = await itemService.getItemCategories();
        },
    },
});
