import currency from 'currency.js';
import Item from '@/lib/models/items/Item';
import Serializable from '@/lib/models/interfaces/Serializable';
import Buildable from '@/lib/models/interfaces/Buildable';

class Transaction implements Buildable<Transaction>, Serializable {
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

    private __id: string;

    public get _id(): string {
        return this.__id;
    }

    public set _id(_id: string) {
        this.__id = _id;
    }

    private __rev: string;

    public get _rev(): string {
        return this.__rev;
    }

    private _employee: string;

    public get employee(): string {
        return this._employee;
    }

    public set employee(employee: string) {
        this._employee = employee;
    }

    private _paymentType: string;

    public get paymentType(): string {
        return this._paymentType;
    }

    public set paymentType(paymentType: string) {
        this._paymentType = paymentType;
    }

    private _items: Array<Item>;

    public get items(): Array<Item> {
        return this._items;
    }

    public set items(items: Array<Item>) {
        this._items = items;
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
        return new Transaction(
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
