import Item from '@/lib/models/Item';
import Currency from '@/lib/models/Currency';
import Cloneable from '@/lib/interfaces/Cloneable';
import { Expose } from 'class-transformer';

class Transaction implements Cloneable<Transaction> {
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

    @Expose({ name: '_id' })
    private __id: string;

    public get _id(): string {
        return this.__id;
    }

    public set _id(_id: string) {
        this.__id = _id;
    }

    @Expose({ name: '_rev' })
    private __rev: string;

    public get _rev(): string {
        return this.__rev;
    }

    public set _rev(_rev: string) {
        this.__rev = _rev;
    }

    @Expose({ name: 'employee' })
    private _employee: string;

    public get employee(): string {
        return this._employee;
    }

    public set employee(employee: string) {
        this._employee = employee;
    }

    @Expose({ name: 'paymentType' })
    private _paymentType: string;

    public get paymentType(): string {
        return this._paymentType;
    }

    public set paymentType(paymentType: string) {
        this._paymentType = paymentType;
    }

    @Expose({ name: 'items' })
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
        employee: string,
        paymentType: string,
        items: Array<Item>,
    ): Transaction {
        return new Transaction(
            `txn:${Date.now()}`,
            '',
            employee,
            paymentType,
            items,
        );
    }
}

export default Transaction;
