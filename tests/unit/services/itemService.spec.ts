import { container } from 'tsyringe';
import ItemService from '@/lib/services/ItemService';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';
import Pouch from '@/lib/databases/Pouch';
import {
    addonAInstance,
    itemAInstance,
    itemBInstance,
    mockItemDatabase,
} from './__mocks__/itemDatabase';

describe('ItemService class', () => {
    const mockContainer = container
        .createChildContainer()
        .register<Pouch>(Pouch, mockItemDatabase);

    let underTest: ItemService;
    let itemA: Item;
    let itemB: Item;
    let addonA: Addon;

    beforeEach(() => {
        underTest = mockContainer.resolve(ItemService);
        itemA = itemAInstance;
        itemB = itemBInstance;
        addonA = addonAInstance;
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockContainer.clearInstances();
    });

    it('should create an ItemService', () => {
        expect(underTest).toBeDefined();
        expect(underTest).toBeInstanceOf(ItemService);
    });

    it('should return an Item by id', async () => {
        const expected = itemA;
        const actual = await underTest.getItemById(itemA._id);
        expect(actual).toBeInstanceOf(Item);
        expect(actual).toStrictEqual(expected);
    });

    it('should return Addons by id', async () => {
        const expected = addonA;
        const actual = await underTest.getItemById(addonA._id);
        expect(actual).toBeInstanceOf(Addon);
        expect(actual).toStrictEqual(expected);
    });

    it('should return all Items and filter addons', async () => {
        const expected = [itemA, itemB];
        const actual = await underTest.getAllItems();
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should return all Addons and filter items', async () => {
        const expected = [addonA];
        const actual = await underTest.getAllAddons();
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should return all item categories', async () => {
        const expected = [itemA.category, itemB.category];
        const actual = await underTest.getItemCategories();
        expect(actual).toBeInstanceOf(Set);
        expect(Array.from(actual)).toStrictEqual(expected);
    });
});
