import 'jest';
import Currency from '@/lib/models/Currency';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';

describe('Item class', () => {
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
        itemJSON = {
            _id: 'item:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            name: 'Classic Pedicure',
            price: new Currency(100),
            quantity: 1,
            category: 'Pedicure',
            addons: new Array<Addon>(addonA, addonB),
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

    it('should construct a new item', () => {
        expect(item).toBeDefined();
        expect(item).toBeInstanceOf(Item);
    });

    it('should clone a new item', () => {
        const clonedItem = {
            quantity: 1,
        };

        const clone = item.clone(clonedItem.quantity);

        expect(clone).toBeDefined();
        expect(clone).toBeInstanceOf(Item);
        expect(clone).toEqual(expect.objectContaining(clonedItem));
        expect(clone._id).not.toEqual(item._id);
        expect(clone._rev).toStrictEqual('');
    });

    it('should clone a new item with given addons', () => {
        const clonedItem = {
            quantity: 1,
            addons: new Array<Addon>(addonA),
        };

        const clone = item.clone(clonedItem.quantity, clonedItem.addons);

        expect(clone).toBeDefined();
        expect(clone).toBeInstanceOf(Item);
        expect(clone).toEqual(expect.objectContaining(clonedItem));
        expect(clone._id).not.toEqual(item._id);
        expect(clone._rev).toStrictEqual('');
    });

    it('should return all addons', () => {
        const spy = jest.spyOn(item, 'addons', 'get');
        const expected = new Array<Addon>(addonA, addonB);

        const actual = item.addons;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the addons', () => {
        const spy = jest.spyOn(item, 'addons', 'set');
        const expected = new Array<Addon>();

        item.addons = expected;
        const actual = item.addons;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get sum of all addon prices', () => {
        const spy = jest.spyOn(item, 'sumAddonPrice', 'get');
        const expected = new Currency(500);

        const actual = item.sumAddonPrice;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get total price', () => {
        const spy = jest.spyOn(item, 'totalPrice', 'get');
        const expected = new Currency(600);

        const actual = item.totalPrice;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });
});
