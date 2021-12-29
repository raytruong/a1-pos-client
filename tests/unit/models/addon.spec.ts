import 'jest';
import Addon from '@/lib/models/Addon';
import Currency from '@/lib/models/Currency';

describe('Addon class', () => {
    let addon: Addon;

    beforeEach(() => {
        addon = new Addon(
            'item:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            'Gel Powder',
            new Currency(100),
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
        const spyBuild = jest.spyOn(addon, 'clone');

        const builtAddon = addon.clone(quantity);

        expect(spyBuild).toHaveBeenCalled();
        expect(builtAddon).toBeDefined();
        expect(builtAddon).toBeInstanceOf(Addon);
    });

    it('should get the total price', () => {
        const spyTotalPrice = jest.spyOn(addon, 'totalPrice', 'get');
        const expectedPrice = new Currency(100);

        const totalPrice = addon.totalPrice;

        expect(spyTotalPrice).toHaveBeenCalled();
        expect(totalPrice).toBeDefined();
        expect(totalPrice).toBeInstanceOf(Currency);
        expect(totalPrice).toEqual(expectedPrice);
    });

    it('should return JSON representation', () => {
        const spytoJSON = jest.spyOn(addon, 'toJSON');
        const expected = {
            _id: 'item:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            name: 'Gel Powder',
            price: new Currency(100).toString(),
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
