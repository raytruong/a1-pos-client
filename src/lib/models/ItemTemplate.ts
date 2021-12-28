import currency from 'currency.js';

abstract class ItemTemplate {
    private _price: currency;

    constructor(
        _id: string,
        _rev: string,
        name: string,
        price: currency,
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

    public set _rev(_rev: string) {
        this.__rev = _rev;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(cname: string) {
        this._name = cname;
    }

    private _quantity: number;

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(quantity: number) {
        this._quantity = quantity;
    }

    private _category: string;

    public get category(): string {
        return this._category;
    }

    public set category(category: string) {
        this._category = category;
    }

    public get batchPrice(): currency {
        return this.singlePrice.multiply(this.quantity);
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

    public get singlePrice(): currency {
        return this._price;
    }

    public set singlePrice(price: currency) {
        this._price = price;
    }

    public abstract get totalPrice(): currency;
}

export default ItemTemplate;
