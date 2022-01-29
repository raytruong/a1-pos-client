import { container } from 'tsyringe';
import ItemService from '@/lib/services/ItemService';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';
import Pouch from '@/lib/databases/Pouch';
import { addonAInstance, itemAInstance, itemBInstance } from './__mocks__/item';
import mockItemDatabase from './__mocks__/itemDatabase';

describe('ItemService class', () => {
    const mockContainer = container
        .createChildContainer()
        .register<Pouch>(Pouch, mockItemDatabase);
    let service: ItemService;

    beforeEach(() => {
        service = mockContainer.resolve(ItemService);
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
        const expected = itemAInstance;
        const actual = await service.getItemById(itemAInstance._id);
        expect(actual).toBeInstanceOf(Item);
        expect(actual).toStrictEqual(expected);
    });

    it('should return Addons', async () => {
        const expected = addonAInstance;
        const actual = await service.getItemById(addonAInstance._id);
        expect(actual).toBeInstanceOf(Addon);
        expect(actual).toStrictEqual(expected);
    });

    it('should return all Items and filter addons', async () => {
        const expected = [itemAInstance, itemBInstance];
        const actual = await service.getAllItems();
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should return all Addons and filter items', async () => {
        const expected = [addonAInstance];
        const actual = await service.getAllAddons();
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });
});
