import currency from 'currency.js';
import Item from '@/lib/models/items/Item';
import Serializable from '@/lib/models/interfaces/Serializable';
import Buildable from '@/lib/models/interfaces/Buildable';

class Transaction implements Buildable<Transaction>, Serializable {
    private __id: string;
    private __rev: string;
    private _employee: string;
    private _paymentType: string;
    private _items: Array<Item>;

    constructor(
        _id: string,
        _rev: string,
        employee: string,
        paymentType: string,
        items: Array<Item>,
    ) {
        this.__id = _id;
        this.__rev = _rev;
        this._employee = employee;
        this._paymentType = paymentType;
        this._items = items;
    }

    public get _id(): string {
        return this.__id;
    }

    public set _id(_id: string) {
        this.__id = _id;
    }

    public get _rev(): string {
        return this.__rev;
    }

    public get employee(): string {
        return this._employee;
    }

    public set employee(employee: string) {
        this._employee = employee;
    }

    public get items(): Array<Item> {
        return this._items;
    }

    public set items(items: Array<Item>) {
        this._items = items;
    }
    public get paymentType(): string {
        return this._paymentType;
    }

    public set paymentType(paymentType: string) {
        this._paymentType = paymentType;
    }

    public get totalPrice(): currency {
        const acc = new currency(0);
        this._items.reduce((acc: currency, item: Item) => {
            return acc.add(item.totalPrice);
        }, acc);
        return acc;
    }

    public build(
        _id?: string,
        _rev?: string,
        employee?: string,
        paymentType?: string,
        items?: Array<Item>,
    ): Transaction {
        return this.constructor(
            _id ? _id : `sale:${Date.now()}`,
            _rev ? _rev : '',
            employee ? employee : '',
            paymentType ? paymentType : '',
            items ? items : new Array<Item>(),
        );
    }

    public toJSON(): object {
        return {
            _id: this._id,
            _rev: this._rev,
            employee: this.employee,
            paymentType: this.paymentType,
            items: this.items,
        };
    }
}

export default Transaction;
