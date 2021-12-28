import 'jest';
import currency from 'currency.js';
import Item from '../../../src/lib/models/Item';
import Addon from '../../../src/lib/models/Addon';

describe('itemTemplate abstract class', () => {
    let item: Item;
    let addons: Array<Addon>;

    beforeEach(() => {
        const addonA = new Addon(
            'addon:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            'addonA',
            new currency(1),
            1,
            'Addon',
        );

        const addonB = new Addon(
            'addon:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            'addonB',
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

    it('should get _id', () => {
        const spyId = jest.spyOn(item, '_id', 'get');

        const expected = 'item:1234567890';
        const actual = item._id;

        expect(spyId).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set _id', () => {
        const spyId = jest.spyOn(item, '_id', 'set');

        const expected = 'item:0987654321';
        item._id = expected;
        const actual = item._id;

        expect(spyId).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get _rev', () => {
        const spyRev = jest.spyOn(item, '_rev', 'get');

        const expected = '7-8596f70bd9ed85a3e133af283838f191';
        const actual = item._rev;

        expect(spyRev).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get batchPrice', () => {
        const spyBatchPrice = jest.spyOn(item, 'batchPrice', 'get');

        const expected = new currency(10);
        item.quantity = 10;
        const actual = item.batchPrice;

        expect(spyBatchPrice).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get category', () => {
        const spyCategory = jest.spyOn(item, 'category', 'get');

        const expected = 'Pedicure';
        const actual = item.category;

        expect(spyCategory).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set category', () => {
        const spyCategory = jest.spyOn(item, 'category', 'set');

        const expected = 'Manicure';
        item.category = expected;
        const actual = item.category;

        expect(spyCategory).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get cname', () => {
        const spyCname = jest.spyOn(item, 'name', 'get');

        const expected = 'Classic Pedicure';
        const actual = item.name;

        expect(spyCname).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set cname', () => {
        const spyCname = jest.spyOn(item, 'name', 'set');

        const expected = 'Kids Pedicure';
        item.name = expected;
        const actual = item.name;

        expect(spyCname).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get displayBatchPrice', () => {
        const spyDispBatchPrice = jest.spyOn(item, 'displayBatchPrice', 'get');

        const expected = new currency(2).toString();
        item.quantity = 2;
        const actual = item.displayBatchPrice;

        expect(spyDispBatchPrice).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get displaySinglePrice', () => {
        const spyDisplaySinglePrice = jest.spyOn(
            item,
            'displaySinglePrice',
            'get',
        );

        const expected = new currency(1).toString();
        const actual = item.displaySinglePrice;

        expect(spyDisplaySinglePrice).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set singlePrice', () => {
        const spyCname = jest.spyOn(item, 'singlePrice', 'set');

        const expected = new currency(1);
        item.singlePrice = expected;
        const actual = item.singlePrice;

        expect(spyCname).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get displayTotalPrice', () => {
        const spyDisplayTotalPrice = jest.spyOn(
            item,
            'displayTotalPrice',
            'get',
        );

        const expected = new currency(6).toString();
        const actual = item.displayTotalPrice;

        expect(spyDisplayTotalPrice).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });
});
