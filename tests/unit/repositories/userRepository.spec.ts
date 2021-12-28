import 'jest';
import { container } from 'tsyringe';
import UserRepository from '@/lib/repositories/UserRepository';
import User from '@/lib/models/User';
import Pouch from '@/lib/databases/Pouch';
import mockUserDatabase, {
    mockConnect,
    mockGetConnection,
    mockSetup,
} from './__mocks__/userDatabase';

describe('UserRepository class', () => {
    const mockContainer = container
        .createChildContainer()
        .register<Pouch>(Pouch, mockUserDatabase);

    let repository: UserRepository;

    beforeEach(() => {
        repository = mockContainer.resolve(UserRepository);
    });

    afterEach(() => {
        mockContainer.clearInstances();
    });

    it('should create a UserRepository', () => {
        expect(repository).toBeDefined();
        expect(mockSetup).toHaveBeenCalled();
        expect(mockGetConnection).toHaveBeenCalled();
        expect(mockConnect).toHaveBeenCalled();
    });

    it('should get the name', () => {
        const expected = 'UserRepository';
        const actual = repository.name;
        expect(actual).toStrictEqual(expected);
    });

    it('should get user1 by id', async () => {
        const expected = {
            _id: 'id1',
            _name: 'name1',
        };
        const actual = await repository.get('id1');
        expect(actual).toBeInstanceOf(User);
        expect(actual).toEqual(expect.objectContaining(expected));
    });

    it('should get user2 by id', async () => {
        const expected = {
            _id: 'id2',
            _name: 'name2',
        };
        const actual = await repository.get('id2');
        expect(actual).toBeInstanceOf(User);
        expect(actual).toEqual(expect.objectContaining(expected));
    });

    it('should get all users', async () => {
        const actual = await repository.getAll();
        expect(actual).toBeInstanceOf(Array);
        expect(actual.length).toEqual(2);
    });
});
