import 'jest';
import UserRepository from '@/lib/repositories/UserRepository';
import User from '@/lib/models/users/User';

describe('UserRepository class', () => {
    let repository: UserRepository;

    const user1 = {
        _id: 'id1',
        _rev: 'rev1',
        _pin: 'pin1',
        _name: 'name1',
    };

    const user2 = {
        _id: 'id2',
        _rev: 'rev2',
        _pin: 'pin2',
        _name: 'name2',
    };

    const mockPouch = {
        get: jest.fn().mockImplementation((_id) => {
            return _id === 'user1' ? user1 : user2;
        }),
        allDocs: jest.fn().mockImplementation((include_docs) => {
            return { rows: [user1, user2] };
        }),
    };

    const mockDB = {
        connect: jest.fn().mockImplementation(),
        getConnection: jest
            .fn()
            .mockReturnValue({ local: mockPouch, remote: mockPouch }),
    };

    beforeAll(() => {
        repository = new UserRepository(mockDB);
    });

    it('should create a UserRepository', () => {
        expect(mockDB.getConnection).toHaveBeenCalled();
        expect(repository).toBeDefined();
    });

    it('should get the name', () => {
        const expected = 'UserRepository';
        const actual = repository.name;
        expect(actual).toStrictEqual(expected);
    });

    it('should get user1', async () => {
        const actual = await repository.get('user1');
        expect(actual).toBeInstanceOf(User);
        expect(actual).toHaveProperty('_id', 'id1');
    });

    it('should get user2', async () => {
        const actual = await repository.get('user2');
        expect(actual).toBeInstanceOf(User);
        expect(actual).toHaveProperty('_id', 'id2');
    });

    it('should get all users', async () => {
        const actual = await repository.getAll();
        expect(actual).toBeInstanceOf(Array);
        expect(actual.length).toEqual(2);
    });
});
