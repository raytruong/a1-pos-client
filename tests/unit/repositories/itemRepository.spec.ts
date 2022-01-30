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

    let repository: ItemRepository;
    let itemA: Item;
    let itemB: Item;

    beforeEach(() => {
        repository = mockContainer.resolve(ItemRepository);
        itemA = itemAInstance;
        itemB = itemBInstance;
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockContainer.clearInstances();
    });

    it('should create an ItemRepository', () => {
        expect(repository).toBeDefined();
        expect(mockSetup).toHaveBeenCalled();
        expect(mockGetConnection).toHaveBeenCalled();
        expect(mockConnect).toHaveBeenCalled();
    });

    it('should get the name', () => {
        const expected = 'ItemRepository';
        const actual = repository.name;
        expect(actual).toStrictEqual(expected);
    });

    it('should get itemA by id', async () => {
        const expected = itemA._id;
        const actual = await repository.get(itemA._id);
        expect(actual).toBeInstanceOf(Item);
        expect(actual._id).toEqual(expected);
    });

    it('should get itemB by id', async () => {
        const expected = itemB._id;
        const actual = await repository.get(itemB._id);
        expect(actual).toBeInstanceOf(Item);
        expect(actual._id).toEqual(expected);
    });

    it('should get all items', async () => {
        const expected = [itemA, itemB];
        const actual = await repository.getAll();
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toEqual(expected);
    });

    it('should save a item and not pass a _rev tag', async () => {
        const spy = jest.spyOn(mockDB, 'put');
        await repository.save(itemA);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spy.mock.calls[0][0]._rev).not.toBeDefined();
    });

    it('should update an existing item and pass a _rev tag', async () => {
        const spyPut = jest.spyOn(mockDB, 'put');
        const spyGet = jest.spyOn(mockDB, 'get');
        await repository.update(itemA);
        expect(spyGet).toHaveBeenCalled();
        expect(spyGet.mock.calls[0][0]._rev).toStrictEqual(itemA._rev);
        expect(spyPut).toHaveBeenCalled();
        expect(spyPut.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spyPut.mock.calls[0][0]._rev).toStrictEqual(itemA._rev);
    });

    it('should delete an existing item', async () => {
        const spy = jest.spyOn(mockDB, 'delete');
        await repository.delete(itemA);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spy.mock.calls[0][0]._id).toStrictEqual(itemA._id);
        expect(spy.mock.calls[0][0]._rev).toStrictEqual(itemA._rev);
    });
});
