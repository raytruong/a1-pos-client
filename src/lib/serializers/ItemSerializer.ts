import { singleton } from 'tsyringe';
import { plainToClass } from 'class-transformer';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';

@singleton()
class ItemSerializer {
    public deserialize(serialized: Record<string, unknown>): Item {
        const item = plainToClass(Item, serialized);
        const addons = Array<Addon>();
        item.addons.forEach((addon) => {
            addons.push(plainToClass(Addon, addon));
        });
        item.addons = addons;
        return item;
    }
}

export default ItemSerializer;
