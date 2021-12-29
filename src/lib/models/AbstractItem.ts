import { Expose, Transform, Type } from 'class-transformer';
import Currency from '@/lib/models/Currency';

abstract class AbstractItem {
    @Type(() => Currency)
    @Expose({ name: 'price' })
    @Transform(
        ({ value }) => {
            return value.toCents();
        },
        { toPlainOnly: true },
    )
    @Transform(
        ({ value }) => {
            return new Currency(value);
        },
        { toClassOnly: true },
    )
    private _price: Currency;

    protected constructor(
        _id: string,
        _rev: string,
        name: string,
        price: Currency,
        quantity: number,
        category: string,
    ) {
        this.__id = _id;
        this.__rev = _rev;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._category = category;
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

    @Expose({ name: 'name' })
    private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    @Expose({ name: 'quantity' })
    private _quantity: number;

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(quantity: number) {
        this._quantity = quantity;
    }

    @Expose({ name: 'category' })
    private _category: string;

    public get category(): string {
        return this._category;
    }

    public set category(category: string) {
        this._category = category;
    }

    public get batchPrice(): Currency {
        const ret = this.singlePrice.multiply(this.quantity);
        return ret;
    }

    public get displayBatchPrice(): string {
        return this.batchPrice.toString();
    }

    public get displaySinglePrice(): string {
        return this._price.toString();
    }

    public get displayTotalPrice(): string {
        return this.totalPrice.toString();
    }

    public get singlePrice(): Currency {
        return this._price;
    }

    public set singlePrice(price: Currency) {
        this._price = price;
    }

    public abstract get totalPrice(): Currency;
}

export default AbstractItem;
