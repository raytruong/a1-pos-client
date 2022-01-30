import 'jest';
import { container } from 'tsyringe';
import UserRepository from '@/lib/repositories/UserRepository';
import User from '@/lib/models/User';
import Pouch from '@/lib/databases/Pouch';
import mockUserDatabase, {
    mockConnect,
    mockGetConnection,
    mockSetup,
    userAInstance,
    userBInstance,
    mockDB,
} from './__mocks__/userDatabase';

describe('UserRepository class', () => {
    const mockContainer = container
        .createChildContainer()
        .register<Pouch>(Pouch, mockUserDatabase);

    let underTest: UserRepository;
    let userA: User;
    let userB: User;

    beforeEach(() => {
        underTest = mockContainer.resolve(UserRepository);
        userA = userAInstance;
        userB = userBInstance;
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockContainer.clearInstances();
    });

    it('should create a UserRepository', () => {
        expect(underTest).toBeDefined();
        expect(mockSetup).toHaveBeenCalled();
        expect(mockGetConnection).toHaveBeenCalled();
        expect(mockConnect).toHaveBeenCalled();
    });

    it('should get the name', () => {
        const expected = 'user_repository';
        const actual = underTest.name;
        expect(actual).toStrictEqual(expected);
    });

    it('should get user1 by id', async () => {
        const expected = userA._id;
        const actual = await underTest.get(userA._id);
        expect(actual).toBeInstanceOf(User);
        expect(actual._id).toEqual(expected);
    });

    it('should get userB by id', async () => {
        const expected = userB._id;
        const actual = await underTest.get(userB._id);
        expect(actual).toBeInstanceOf(User);
        expect(actual._id).toEqual(expected);
    });

    it('should get all users', async () => {
        const expected = [userA, userB];
        const actual = await underTest.getAll();
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toEqual(expected);
    });

    it('should save a user and not pass a _rev tag', async () => {
        const spy = jest.spyOn(mockDB, 'put');
        await underTest.save(userA);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spy.mock.calls[0][0]._rev).not.toBeDefined();
    });

    it('should update an existing user and pass a _rev tag', async () => {
        const spyPut = jest.spyOn(mockDB, 'put');
        const spyGet = jest.spyOn(mockDB, 'get');
        await underTest.update(userA);
        expect(spyGet).toHaveBeenCalled();
        expect(spyGet.mock.calls[0][0]._rev).toStrictEqual(userA._rev);
        expect(spyPut).toHaveBeenCalled();
        expect(spyPut.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spyPut.mock.calls[0][0]._rev).toStrictEqual(userA._rev);
    });

    it('should delete an existing user and pass a _rev tag', async () => {
        const spy = jest.spyOn(mockDB, 'delete');
        await underTest.delete(userA);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][0]).toBeInstanceOf(Object);
        expect(spy.mock.calls[0][0]._id).toStrictEqual(userA._id);
        expect(spy.mock.calls[0][0]._rev).toStrictEqual(userA._rev);
    });
});
