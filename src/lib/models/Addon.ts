import AbstractItem from '@/lib/models/AbstractItem';
import Cloneable from '@/lib/interfaces/Cloneable';
import Currency from '@/lib/models/Currency';

class Addon extends AbstractItem implements Cloneable<Addon> {
    constructor(
        _id: string,
        _rev: string,
        name: string,
        price: Currency,
        quantity: number,
        category: string,
    ) {
        super(_id, _rev, name, price, quantity, category);
    }

    public get totalPrice(): Currency {
        return this.batchPrice;
    }

    public clone(quantity: number): Addon {
        return new Addon(
            `addon:${Date.now()}`,
            '',
            this.name,
            this.singlePrice,
            quantity,
            this.category,
        );
    }
}

export default Addon;
