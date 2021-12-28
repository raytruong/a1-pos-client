import currency from 'currency.js';
import ItemTemplate from './ItemTemplate';
import Addon from './Addon';
import Cloneable from '@/lib/interfaces/Cloneable';
import Serializable from '@/lib/interfaces/Serializable';

class Item extends ItemTemplate implements Cloneable<Item>, Serializable {
    constructor(
        _id: string,
        _rev: string,
        name: string,
        price: currency,
        quantity: number,
        category: string,
        addons: Array<Addon>,
    ) {
        super(_id, _rev, name, price, quantity, category);
        this._addons = addons;
    }

    _addons: Array<Addon>;

    public get addons(): Array<Addon> {
        return this._addons;
    }

    public set addons(addons: Array<Addon>) {
        this._addons = addons;
    }

    public get sumAddonPrice(): currency {
        const initVal = new currency(0);
        const reducer = (acc: currency, addon: Addon): currency =>
            acc.add(addon.batchPrice);
        return this._addons.reduce(reducer, initVal);
    }

    public get totalPrice(): currency {
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
