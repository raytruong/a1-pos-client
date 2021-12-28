import currency from 'currency.js';
import ItemTemplate from './ItemTemplate';
import Cloneable from '@/lib/interfaces/Cloneable';
import Serializable from '@/lib/interfaces/Serializable';

class Addon extends ItemTemplate implements Cloneable<Addon>, Serializable {
    constructor(
        _id: string,
        _rev: string,
        name: string,
        price: currency,
        quantity: number,
        category: string,
    ) {
        super(_id, _rev, name, price, quantity, category);
    }

    public get totalPrice(): currency {
        return this.batchPrice;
    }

    public clone(quantity?: number): Addon {
        return new Addon(
            `addon:${Date.now()}`,
            '',
            this.name,
            this.singlePrice,
            quantity ? quantity : 1,
            this.category,
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
        };
    }
}

export default Addon;
