import currency from 'currency.js';
import ItemTemplate from './ItemTemplate';
import Cloneable from '@/lib/models/interfaces/Cloneable';
import Serializable from '@/lib/models/interfaces/Serializable';

class Addon extends ItemTemplate implements Cloneable<Addon>, Serializable {
    constructor(
        _id: string,
        _rev: string,
        cname: string,
        price: currency,
        quantity: number,
        category: string,
    ) {
        super(_id, _rev, cname, price, quantity, category);
    }

    public get totalPrice(): currency {
        return this.batchPrice;
    }

    public clone(quantity?: number): Addon {
        return new Addon(
            `addon:${Date.now()}`,
            '',
            this.cname,
            this.singlePrice,
            quantity ? quantity : 1,
            this.category,
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
        };
    }
}

export default Addon;
