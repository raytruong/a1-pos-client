import currency from 'currency.js';
import ItemTemplate from './ItemTemplate';
import Addon from './Addon';
import Buildable from '@/lib/models/interfaces/Buildable';
import Serializable from '@/lib/models/interfaces/Serializable';

class Item extends ItemTemplate implements Buildable<Item>, Serializable {
    constructor(
        _id: string,
        _rev: string,
        cname: string,
        price: currency,
        quantity: number,
        category: string,
        addons: Array<Addon>,
    ) {
        super(_id, _rev, cname, price, quantity, category);
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
        const acc = new currency(0);
        this._addons.reduce((acc: currency, addon: Addon) => {
            return acc.add(addon.batchPrice);
        }, acc);
        return acc;
    }

    public get totalPrice(): currency {
        return this.singlePrice.add(this.sumAddonPrice);
    }

    public build(quantity?: number, addons?: Array<Addon>): Item {
        return new Item(
            this._id,
            this._rev,
            this.cname,
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
            cname: this.cname,
            price: this.displaySinglePrice,
            quantity: this.quantity,
            category: this.category,
            addons: this.addons,
        };
    }
}

export default Item;
