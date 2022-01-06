import 'jest';
import Addon from '@/lib/models/Addon';
import Currency from '@/lib/models/Currency';

describe('Addon class', () => {
    let addon: Addon;
    let addonJSON: Record<string, any>;

    beforeEach(() => {
        addonJSON = {
            _id: 'item:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            name: 'Gel Powder',
            price: new Currency(100),
            quantity: 1,
            category: 'Addon',
        };
        addon = new Addon(
            addonJSON._id,
            addonJSON._rev,
            addonJSON.name,
            addonJSON.price,
            addonJSON.quantity,
            addonJSON.category,
        );
    });

    it('should construct a new addon', () => {
        expect(addon).toBeDefined();
        expect(addon).toBeInstanceOf(Addon);
    });

    it('should clone a new addon', () => {
        const clonedAddon = {
            quantity: 1,
        };

        const clone = addon.clone(clonedAddon.quantity);

        expect(clone).toBeDefined();
        expect(clone).toBeInstanceOf(Addon);
        expect(clone).toEqual(expect.objectContaining(clonedAddon));
        expect(clone._id).not.toEqual(addon._id);
        expect(clone._rev).toStrictEqual('');
    });

    it('should get the total price', () => {
        const spy = jest.spyOn(addon, 'totalPrice', 'get');
        const expectedPrice = addonJSON.price;

        const totalPrice = addon.totalPrice;

        expect(spy).toHaveBeenCalled();
        expect(totalPrice).toBeDefined();
        expect(totalPrice).toBeInstanceOf(Currency);
        expect(totalPrice).toEqual(expectedPrice);
    });

    it('should get the total price with multiple quantities', () => {
        const spy = jest.spyOn(addon, 'totalPrice', 'get');
        const quantity = 2;
        const expectedPrice = addonJSON.price.multiply(quantity);

        addon.quantity = quantity;
        const totalPrice = addon.totalPrice;

        expect(spy).toHaveBeenCalled();
        expect(totalPrice).toBeDefined();
        expect(totalPrice).toBeInstanceOf(Currency);
        expect(totalPrice).toEqual(expectedPrice);
    });
});
