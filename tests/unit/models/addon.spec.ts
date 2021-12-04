import currency from 'currency.js';
import 'jest';
import Addon from '../../../src/lib/models/items/Addon';

describe('Addon Unit Test', () => {
    let addon: Addon;
    beforeEach(() => {
        addon = new Addon(
            'item:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            'addonName',
            new currency(1),
            1,
            'categoryName',
        );
    });

    it('should construct a new addon', () => {
        // given
        // when
        // then
        expect(addon).toBeDefined();
        expect(addon).toBeInstanceOf(Addon);
    });

    it('should build a new addon', () => {
        // given
        const quantity = 1;
        const spyBuild = jest.spyOn(addon, 'build');

        //when
        const builtAddon = addon.build(quantity);

        //then
        expect(spyBuild).toHaveBeenCalled();
        expect(builtAddon).toBeDefined();
        expect(builtAddon).toBeInstanceOf(Addon);
    });
});
