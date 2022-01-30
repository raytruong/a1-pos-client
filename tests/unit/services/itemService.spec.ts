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

    let service: ItemService;
    let itemA: Item;
    let itemB: Item;
    let addonA: Addon;

    beforeEach(() => {
        service = mockContainer.resolve(ItemService);
        itemA = itemAInstance;
        itemB = itemBInstance;
        addonA = addonAInstance;
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockContainer.clearInstances();
    });

    it('should create an ItemService', () => {
        expect(service).toBeDefined();
        expect(service).toBeInstanceOf(ItemService);
    });

    it('should return an Item by id', async () => {
        const expected = itemA;
        const actual = await service.getItemById(itemA._id);
        expect(actual).toBeInstanceOf(Item);
        expect(actual).toStrictEqual(expected);
    });

    it('should return Addons by id', async () => {
        const expected = addonA;
        const actual = await service.getItemById(addonA._id);
        expect(actual).toBeInstanceOf(Addon);
        expect(actual).toStrictEqual(expected);
    });

    it('should return all Items and filter addons', async () => {
        const expected = [itemA, itemB];
        const actual = await service.getAllItems();
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should return all Addons and filter items', async () => {
        const expected = [addonA];
        const actual = await service.getAllAddons();
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should return all item categories', async () => {
        const expected = [itemA.category, itemB.category];
        const actual = await service.getItemCategories();
        expect(actual).toBeInstanceOf(Set);
        expect(Array.from(actual)).toEqual(expected);
    });
});
