import ItemRepository from '@/lib/repositories/ItemRepository';
import Item from '@/lib/models/Item';
import { inject, singleton } from 'tsyringe';

@singleton()
class ItemService {
    constructor(@inject(ItemRepository) private repository: ItemRepository) {
        if (!repository) {
            throw new Error(`Could not resolve repository: ${repository}`);
        }
    }
}

export default ItemService;
