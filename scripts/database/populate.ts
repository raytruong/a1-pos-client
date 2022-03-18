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

async function registerNewItem() {
    try {
        const proto = new Item(
            `item:${Date.now()}`,
            '',
            'Gel Polish',
            new Currency(3300),
            1,
            'Full Set',
            new Array<Addon>(),
        );
        await service.registerNewItem(proto);
    } catch (err: any) {
        throw new Error(err);
    }
}

// saveItem();
// getItems();

setTimeout(() => {
    process.exit(0);
}, 5000);
