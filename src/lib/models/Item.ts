import AbstractItem from '@/lib/models/AbstractItem';
import Currency from '@/lib/models/Currency';
import Addon from '@/lib/models/Addon';
import Cloneable from '@/lib/interfaces/Cloneable';
import Serializable from '@/lib/interfaces/Serializable';
import { Expose, Type } from 'class-transformer';

class Item extends AbstractItem implements Cloneable<Item>, Serializable {
    constructor(
        _id: string,
        _rev: string,
        name: string,
        price: Currency,
        quantity: number,
        category: string,
        addons: Array<Addon>,
    ) {
        super(_id, _rev, name, price, quantity, category);
        this._addons = addons;
    }

    @Expose({ name: 'addons' })
    @Type(() => Addon)
    _addons: Array<Addon>;

    public get addons(): Array<Addon> {
        return this._addons;
    }

    public set addons(addons: Array<Addon>) {
        this._addons = addons;
    }

    public get sumAddonPrice(): Currency {
        const initVal = new Currency(0);
        const reducer = (acc: Currency, addon: Addon): Currency =>
            acc.add(addon.batchPrice);
        return this._addons.reduce(reducer, initVal);
    }

    public get totalPrice(): Currency {
        return this.singlePrice.add(this.sumAddonPrice);
    }

    public clone(quantity?: number, addons?: Array<Addon>): Item {
        return new Item(
            `item:${Date.now()}`,
            this._rev,
            this.name,
            this.singlePrice,
            quantity ? quantity : 1,
            this.category,
            addons ? addons : new Array<Addon>(),
        );
    }

    public toJSON(): object {
        return {
            _id: this._id,
            _rev: this._rev,
            name: this.name,
            price: this.displaySinglePrice,
            quantity: this.quantity,
            category: this.category,
            addons: this.addons,
        };
    }
}

export default Item;
