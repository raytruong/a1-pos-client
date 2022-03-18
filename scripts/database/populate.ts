import 'dotenv/config';
import 'reflect-metadata';
import { container } from 'tsyringe';
import ItemService from '@/lib/services/ItemService';
import Item from '@/lib/models/Item';
import Currency from '@/lib/models/Currency';
import Addon from '@/lib/models/Addon';

container.register('baseUrl', {
    useValue: process.env.VITE_DEV_DB,
});

const service = container.resolve(ItemService);

async function getItems() {
    try {
        const items = await service.getAllItems();
        console.log(items);
    } catch (err: any) {
        throw new Error(err);
    }
}

async function registerNewItem(item: AbstractItem) {
    try {
        await service.registerNewItem(item);
    } catch (err: any) {
        throw new Error(err);
    }
}

// getItems();
// registerNewItem();

import data from './items.json';
import AbstractItem from '@/lib/models/AbstractItem';

async function populate() {
    for (const [key, value] of Object.entries(data)) {
        let proto;

        if (value.category == 'Addons') {
            proto = new Addon(
                `addon:${Date.now()}`,
                '',
                value.name,
                new Currency(value.price),
                1,
                'Addon',
            );
        } else {
            proto = new Item(
                `item:${Date.now()}`,
                '',
                value.name,
                new Currency(value.price),
                1,
                value.category,
                new Array<Addon>(),
            );
        }
        console.log(proto);
        for (let i = 0; i < 99999999; i++) {
            //
            const a = 0;
            const b = i;
            const c = a + b;
        }
        await registerNewItem(proto);
    }
}

populate();

setTimeout(() => {
    process.exit(0);
}, 5000);
