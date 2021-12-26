import 'jest';
import ItemRepository from '@/lib/repositories/ItemRepository';
import Item from '@/lib/models/items/Item';

describe('ItemRepository class', () => {
    let repository: ItemRepository;

    const addon1 = {
        _id: 'id1',
        _rev: 'rev1',
        cname: 'cname1',
        price: 1,
        quantity: 1,
        category: 'category1',
    };

    const item1 = {
        _id: 'id1',
        _rev: 'rev1',
        cname: 'cname1',
        price: 1,
        quantity: 1,
        category: 'category1',
        addons: [addon1],
    };

    const item2 = {
        _id: 'id2',
        _rev: 'rev2',
        cname: 'cname2',
        price: 2,
        quantity: 2,
        category: 'category2',
        addons: [],
    };

    const mockPouch = {
        get: jest.fn().mockImplementation((_id) => {
            return _id === 'id1' ? item1 : item2;
        }),
        allDocs: jest.fn().mockImplementation((include_docs) => {
            return { rows: [item1, item2] };
        }),
    };

    const mockDB = {
        connect: jest.fn().mockImplementation(),
        getConnection: jest.fn().mockReturnValue(mockPouch),
    };

    beforeAll(() => {
        repository = new ItemRepository(mockDB);
    });

    it('should create an ItemRepository', () => {
        expect(mockDB.getConnection).toHaveBeenCalled();
        expect(repository).toBeDefined();
    });

    it('should get the name', () => {
        const expected = 'ItemRepository';
        const actual = repository.name;
        expect(actual).toStrictEqual(expected);
    });

    it('should get item1', async () => {
        const actual = await repository.get('id1');
        expect(actual).toBeInstanceOf(Item);
        expect(actual).toHaveProperty('_id', 'id1');
    });

    it('should get item2', async () => {
        const actual = await repository.get('id2');
        expect(actual).toBeInstanceOf(Item);
        expect(actual).toHaveProperty('_id', 'id2');
    });

    it('should get all items', async () => {
        const actual = await repository.getAll();
        expect(actual).toBeInstanceOf(Array);
        expect(actual.length).toEqual(2);
    });
});
