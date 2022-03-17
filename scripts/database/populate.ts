import 'dotenv/config';
import 'reflect-metadata';
import { container } from 'tsyringe';
import ItemService from '@/lib/services/ItemService';

container.register('baseUrl', {
    useValue: process.env.VITE_DEV_DB,
});

const service = container.resolve(ItemService);

async function getItems() {
    try {
        console.log(service);
        const items = await service.getItemCategories();
        console.log(items);
    } catch (err: any) {
        throw new Error(err);
    }
}

getItems();
