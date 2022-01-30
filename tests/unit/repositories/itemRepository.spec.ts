import 'jest';
import { container } from 'tsyringe';
import ItemRepository from '@/lib/repositories/ItemRepository';
import Pouch from '@/lib/databases/Pouch';
import Item from '@/lib/models/Item';
import mockItemDatabase, {
    mockConnect,
    mockGetConnection,
    mockSetup,
    itemAInstance,
    itemBInstance,
    mockDB,
} from './__mocks__/itemDatabase';

describe('ItemRepository class', () => {
    const mockContainer = container
        .createChildContainer()
        .register<Pouch>(Pouch, mockItemDatabase);

    let underTest: ItemRepository;
    let itemA: Item;
    let itemB: Item;

    beforeEach(() => {
        underTest = mockContainer.resolve(ItemRepository);
        itemA = itemAInstance;
        itemB = itemBInstance;
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockContainer.clearInstances();
    });

    it('should create an ItemRepository', () => {
        expect(underTest).toBeDefined();
        expect(mockSetup).toHaveBeenCalled();
        expect(mockGetConnection).toHaveBeenCalled();
        expect(mockConnect).toHaveBeenCalled();
    });

    it('should get the name', () => {
        const expected = 'ItemRepository';
        const actual = underTest.name;
        expect(actual).toStrictEqual(expected);
    });

    it('should get itemA by id', async () => {
        const expected = itemA._id;
        const actual = await underTest.get(itemA._id);
        expect(actual).toBeInstanceOf(Item);
        expect(actual._id).toBe(expected);
    });

    it('should get itemB by id', async () => {
        const expected = itemB._id;
        const actual = await underTest.get(itemB._id);
        expect(actual).toBeInstanceOf(Item);
        expect(actual._id).toBe(expected);
    });

    it('should get all items', async () => {
        const expected = [itemA, itemB];
        const actual = await underTest.getAll();
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should save a item and not pass a _rev tag', async () => {
        const spy = jest.spyOn(mockDB, 'put');
        await underTest.save(itemA);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spy.mock.calls[0][0]._rev).not.toBeDefined();
    });

    it('should update an existing item and pass a _rev tag', async () => {
        const spyPut = jest.spyOn(mockDB, 'put');
        const spyGet = jest.spyOn(mockDB, 'get');
        await underTest.update(itemA);
        expect(spyGet).toHaveBeenCalled();
        expect(spyGet.mock.calls[0][0]._rev).toStrictEqual(itemA._rev);
        expect(spyPut).toHaveBeenCalled();
        expect(spyPut.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spyPut.mock.calls[0][0]._rev).toStrictEqual(itemA._rev);
    });

    it('should delete an existing item and pass a _rev tag', async () => {
        const spy = jest.spyOn(mockDB, 'delete');
        await underTest.delete(itemA);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spy.mock.calls[0][0]._id).toStrictEqual(itemA._id);
        expect(spy.mock.calls[0][0]._rev).toStrictEqual(itemA._rev);
    });
});
