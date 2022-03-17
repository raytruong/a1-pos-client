import 'reflect-metadata';
import { container } from 'tsyringe';
import ItemService from '@/lib/services/ItemService';

const baseUrl = 'base';

const mockContainer = container
    .register('baseUrl', { useValue: 'cloudant.com' })
    .createChildContainer();

const service = mockContainer.resolve(ItemService);

async function getItems() {
    console.log(service);
    const items = await service.getItemCategories();
    console.log(items);
}

getItems();
