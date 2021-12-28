import ItemRepository from '@/lib/repositories/ItemRepository';
import Item from '@/lib/models/Item';
import { inject, singleton } from 'tsyringe';

@singleton()
class UserService {
    constructor(@inject(ItemRepository) private repository: ItemRepository) {
        if (!repository) {
            throw new Error(`Could not resolve repository: ${repository}`);
        }
    }

    public async get(_id: string): Promise<Item> {
        const data = await this.repository.get(_id);
        return data;
    }

    public async getAllUsers(): Promise<Array<Item>> {
        const data = await this.repository.getAll();
        return data;
    }
}

export default UserService;
