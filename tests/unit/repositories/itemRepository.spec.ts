import 'jest';
import { container } from 'tsyringe';
import ItemRepository from '@/lib/repositories/ItemRepository';
import Item from '@/lib/models/Item';
import Pouch from '@/lib/databases/Pouch';
import mockItemDatabase, {
    mockConnect,
    mockGetConnection,
    mockSetup,
} from './__mocks__/itemDatabase';
import Addon from '@/lib/models/Addon';

describe('ItemRepository class', () => {
    const mockContainer = container
        .createChildContainer()
        .register<Pouch>(Pouch, mockItemDatabase);

    let repository: ItemRepository;

    beforeEach(() => {
        repository = mockContainer.resolve(ItemRepository);
    });

    afterEach(() => {
        mockContainer.clearInstances();
    });

    it('should create a ItemRepository', () => {
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

    it('should get item1 by id', async () => {
        const expected = {
            _id: 'id1',
            name: 'name1',
        };
        const actual = await repository.get('id1');
        expect(actual).toBeInstanceOf(Item);
        actual.addons.forEach((object) => {
            expect(object).toBeInstanceOf(Addon);
        });
        expect(actual).toEqual(expect.objectContaining(expected));
    });
});
