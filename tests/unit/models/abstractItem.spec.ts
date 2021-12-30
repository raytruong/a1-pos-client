import 'jest';
import Currency from '@/lib/models/Currency';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';

describe('AbstractItem class', () => {
    let item: Item;
    let itemJSON: Record<string, any>;

    let addonA: Addon;
    let addonB: Addon;
    let addonAJSON: Record<string, any>;
    let addonBJSON: Record<string, any>;

    beforeEach(() => {
        addonAJSON = {
            _id: 'addon:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            name: 'Gel Powder',
            price: new Currency(100),
            quantity: 1,
            category: 'Addon',
        };
        addonBJSON = {
            _id: 'addon:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            name: 'Dipping Powder',
            price: new Currency(200),
            quantity: 2,
            category: 'Addon',
        };
        addonA = new Addon(
            addonAJSON._id,
            addonAJSON._rev,
            addonAJSON.name,
            addonAJSON.price,
            addonAJSON.quantity,
            addonAJSON.category,
        );
        addonB = new Addon(
            addonBJSON._id,
            addonBJSON._rev,
            addonBJSON.name,
            addonBJSON.price,
            addonBJSON.quantity,
            addonBJSON.category,
        );
        itemJSON = {
            _id: 'item:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            name: 'Classic Pedicure',
            price: new Currency(100),
            quantity: 2,
            category: 'Pedicure',
            addons: new Array<Addon>(addonA, addonB),
        };
        item = new Item(
            itemJSON._id,
            itemJSON._rev,
            itemJSON.name,
            itemJSON.price,
            itemJSON.quantity,
            itemJSON.category,
            itemJSON.addons,
        );
    });

    it('should get _id', () => {
        const spy = jest.spyOn(item, '_id', 'get');

        const expected = itemJSON._id;
        const actual = item._id;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the _id', () => {
        const spy = jest.spyOn(item, '_id', 'set');
        const expected = 'item:0987654321';

        item._id = expected;
        const actual = item._id;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the _rev', () => {
        const spy = jest.spyOn(item, '_rev', 'get');
        const expected = itemJSON._rev;

        const actual = item._rev;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the _rev', () => {
        const spy = jest.spyOn(item, '_rev', 'set');
        const expected = '3-4496f70jc9ed85z3e232af283838f744';

        item._rev = expected;
        const actual = item._rev;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the batchPrice', () => {
        const spy = jest.spyOn(item, 'batchPrice', 'get');
        const expected = itemJSON.price.multiply(itemJSON.quantity);

        const actual = item.batchPrice;

        expect(spy).toHaveBeenCalled();
        expect(actual).toBeInstanceOf(Currency);
        expect(actual).toStrictEqual(expected);
    });

    it('should get the category', () => {
        const spy = jest.spyOn(item, 'category', 'get');
        const expected = itemJSON.category;

        const actual = item.category;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the category', () => {
        const spy = jest.spyOn(item, 'category', 'set');
        const expected = 'Manicure';

        item.category = expected;
        const actual = item.category;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the name', () => {
        const spy = jest.spyOn(item, 'name', 'get');
        const expected = itemJSON.name;

        const actual = item.name;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the name', () => {
        const spy = jest.spyOn(item, 'name', 'set');
        const expected = 'Kids Pedicure';

        item.name = expected;
        const actual = item.name;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the displayBatchPrice', () => {
        const spy = jest.spyOn(item, 'displayBatchPrice', 'get');
        const expected = itemJSON.price.multiply(itemJSON.quantity).toString();

        const actual = item.displayBatchPrice;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the displaySinglePrice', () => {
        const spy = jest.spyOn(item, 'displaySinglePrice', 'get');
        const expected = itemJSON.price.toString();

        const actual = item.displaySinglePrice;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set singlePrice', () => {
        const spy = jest.spyOn(item, 'singlePrice', 'set');
        const expected = new Currency(1);

        item.singlePrice = expected;
        const actual = item.singlePrice;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the displayTotalPrice', () => {
        const spy = jest.spyOn(item, 'displayTotalPrice', 'get');
        const expected = item.totalPrice.toString();

        const actual = item.displayTotalPrice;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });
});
