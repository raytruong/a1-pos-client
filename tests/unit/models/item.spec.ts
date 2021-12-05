import 'jest';
import currency from 'currency.js';
import Item from '@/lib/models/items/Item';
import Addon from '../../../src/lib/models/items/Addon';

describe('Item class', () => {
    let item: Item;
    let addons: Array<Addon>;

    beforeEach(() => {
        const addonA = new Addon(
            'addon:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            'Gel Powder',
            new currency(1),
            1,
            'Addon',
        );

        const addonB = new Addon(
            'addon:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            'Dipping Powder',
            new currency(2),
            2,
            'Addon',
        );

        addons = new Array<Addon>(addonA, addonB);

        item = new Item(
            'item:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            'Classic Pedicure',
            new currency(1),
            1,
            'Pedicure',
            addons,
        );
    });

    it('should construct a new item', () => {
        expect(item).toBeDefined();
        expect(item).toBeInstanceOf(Item);
    });

    it('should build a new item', () => {
        const quantity = 1;
        const spyBuild = jest.spyOn(item, 'build');

        const newItem = item.build(quantity, addons);

        expect(spyBuild).toHaveBeenCalled();
        expect(newItem).toBeInstanceOf(Item);
    });

    it('should return all addons', () => {
        const spyAddons = jest.spyOn(item, 'addons', 'get');

        const expected = addons;
        const actual = item.addons;

        expect(spyAddons).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the addons', () => {
        const spyAddons = jest.spyOn(item, 'addons', 'set');

        const expected = new Array<Addon>();
        item.addons = expected;
        const actual = item.addons;

        expect(spyAddons).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get sum of all addon prices', () => {
        const spySumAddonPrice = jest.spyOn(item, 'sumAddonPrice', 'get');

        const expected = new currency(5);
        const actual = item.sumAddonPrice;

        expect(spySumAddonPrice).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get total price', () => {
        const spyTotalPrice = jest.spyOn(item, 'totalPrice', 'get');

        const expected = new currency(6);
        const actual = item.totalPrice;

        expect(spyTotalPrice).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should return JSON representation', () => {
        const spytoJSON = jest.spyOn(item, 'toJSON');
        const expected = {
            _id: 'item:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            cname: 'Classic Pedicure',
            price: new currency(1).toString(),
            quantity: 1,
            category: 'Pedicure',
            addons: addons,
        };

        const actual = item.toJSON();

        expect(spytoJSON).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });
});
