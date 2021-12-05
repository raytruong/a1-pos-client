import currency from 'currency.js';
import 'jest';
import Addon from '@/lib/models/items/Addon';

describe('Addon class', () => {
    let addon: Addon;

    beforeEach(() => {
        addon = new Addon(
            'item:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            'Gel Powder',
            new currency(1),
            1,
            'Addon',
        );
    });

    it('should construct a new addon', () => {
        expect(addon).toBeDefined();
        expect(addon).toBeInstanceOf(Addon);
    });

    it('should build a new addon', () => {
        const quantity = 1;
        const spyBuild = jest.spyOn(addon, 'build');

        const builtAddon = addon.build(quantity);

        expect(spyBuild).toHaveBeenCalled();
        expect(builtAddon).toBeDefined();
        expect(builtAddon).toBeInstanceOf(Addon);
    });

    it('should get the total price', () => {
        const spyTotalPrice = jest.spyOn(addon, 'totalPrice', 'get');
        const expectedPrice = new currency(1);

        const totalPrice = addon.totalPrice;

        expect(spyTotalPrice).toHaveBeenCalled();
        expect(totalPrice).toBeDefined();
        expect(totalPrice).toBeInstanceOf(currency);
        expect(totalPrice).toEqual(expectedPrice);
    });

    it('should return JSON representation', () => {
        const spytoJSON = jest.spyOn(addon, 'toJSON');
        const expected = {
            _id: 'item:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            cname: 'Gel Powder',
            price: new currency(1).toString(),
            quantity: 1,
            category: 'Addon',
        };

        const actual = addon.toJSON();

        expect(spytoJSON).toHaveBeenCalled();
        expect(actual).toBeDefined();
        expect(actual).toBeInstanceOf(Object);
        expect(actual).toEqual(expected);
    });
});
