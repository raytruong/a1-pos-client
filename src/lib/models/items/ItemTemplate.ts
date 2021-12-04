import currency from 'currency.js';

abstract class ItemTemplate {
    private __id: string;
    private __rev: string;
    private _price: currency;
    private _cname: string;
    private _quantity: number;
    private _category: string;

    constructor(
        _id: string,
        _rev: string,
        cname: string,
        price: currency,
        quantity: number,
        category: string,
    ) {
        this.__id = _id;
        this.__rev = _rev;
        this._cname = cname;
        this._price = price;
        this._quantity = quantity;
        this._category = category;
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

    public get batchPrice(): currency {
        return this.singlePrice.multiply(this.quantity);
    }

    public get category(): string {
        return this._category;
    }

    public set category(category: string) {
        this._category = category;
    }

    public get cname(): string {
        return this._cname;
    }

    public set cname(cname: string) {
        this._cname = cname;
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

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(quantity: number) {
        this._quantity = quantity;
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
