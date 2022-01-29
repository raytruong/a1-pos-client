import ItemRepository from '@/lib/repositories/ItemRepository';
import { inject, singleton } from 'tsyringe';
import AbstractItem from '@/lib/models/AbstractItem';
import Addon from '@/lib/models/Addon';
import Item from '@/lib/models/Item';

@singleton()
class ItemService {
    constructor(@inject(ItemRepository) private repository: ItemRepository) {
        if (!repository) {
            throw new Error(`Could not resolve repository: ${repository}`);
        }
    }

    public async getItemById(_id: string): Promise<AbstractItem> {
        const data = await this.repository.get(_id);
        return data;
    }

    public async getAllItems(): Promise<Array<Item>> {
        const data = await this.repository.getAll();
        const filtered = data.filter((item) => {
            return item.category !== 'Addon';
        });
        return filtered as Array<Item>;
    }

    public async getAllAddons(): Promise<Array<Addon>> {
        const data = await this.repository.getAll();
        const filtered = data.filter((item) => {
            return item.category === 'Addon';
        });
        return filtered as Array<Addon>;
    }
}

export default ItemService;
