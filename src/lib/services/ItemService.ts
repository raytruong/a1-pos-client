import ItemRepository from '@/lib/repositories/ItemRepository';
import { inject, singleton } from 'tsyringe';
import AbstractItem from '@/lib/models/AbstractItem';

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

    public async getAllItems(): Promise<Array<AbstractItem>> {
        const data = await this.repository.getAll();
        return data;
    }
}

export default ItemService;
