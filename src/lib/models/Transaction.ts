import Item from '@/lib/models/Item';
import Currency from '@/lib/models/Currency';
import Serializable from '@/lib/interfaces/Serializable';
import Cloneable from '@/lib/interfaces/Cloneable';

class Transaction implements Cloneable<Transaction>, Serializable {
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

    public get totalPrice(): Currency {
        const initVal = new Currency(0);
        const reducer = (acc: Currency, item: Item): Currency =>
            acc.add(item.totalPrice);
        return this._items.reduce(reducer, initVal);
    }

    public clone(
        employee?: string,
        paymentType?: string,
        items?: Array<Item>,
        _id?: string,
        _rev?: string,
    ): Transaction {
        if (!employee || !paymentType) {
            throw new Error(
                `Transaction.build(): Expected employee, paymentType, items, actual: employee: ${employee}, paymentType: ${paymentType}, items: ${items}`,
            );
        }
        return new Transaction(
            _id ? _id : `txn:${Date.now()}`,
            _rev ? _rev : '',
            employee,
            paymentType,
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
