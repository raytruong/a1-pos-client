import 'jest';
import User from '@/lib/models/User';

describe('User class', () => {
    let user: User;
    let userJSON: Record<string, string>;

    beforeEach(() => {
        userJSON = {
            _id: 'user:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            pin: '1234',
            name: 'Saul Goodman',
        };
        user = new User(
            userJSON._id,
            userJSON._rev,
            userJSON.pin,
            userJSON.name,
        );
    });

    it('should construct a new user', () => {
        expect(user).toBeDefined();
        expect(user).toBeInstanceOf(User);
    });

    it('should clone a new user', () => {
        const clonedUser = {
            name: 'Kim Wexler',
            pin: '4321',
        };

        const clone = user.clone(clonedUser.name, clonedUser.pin);

        expect(clone).toBeDefined();
        expect(clone).toBeInstanceOf(User);
        expect(clone).toEqual(expect.objectContaining(clonedUser));
        expect(clone._id).not.toEqual(user._id);
        expect(clone._rev).toStrictEqual('');
    });

    it('should throw exception on clone without proper parameters', () => {
        const clonedUser = {
            name: '',
            pin: '',
        };

        const clone = (): void => {
            user.clone(clonedUser.name, clonedUser.pin);
        };

        expect(clone).toThrow();
    });

    it('should get the name of the user', () => {
        const spy = jest.spyOn(user, 'name', 'get');
        const expected = userJSON.name;

        const actual = user.name;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the name of the user', () => {
        const spy = jest.spyOn(user, 'name', 'set');
        const expected = 'Walter White';

        user.name = expected;
        const actual = user.name;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the _id of the user', () => {
        const spy = jest.spyOn(user, '_id', 'get');
        const expected = userJSON._id;

        const actual = user._id;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the _id of the user', () => {
        const spy = jest.spyOn(user, '_id', 'set');
        const expected = 'user:0987654321';

        user._id = expected;
        const actual = user._id;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the _rev of the user', () => {
        const spy = jest.spyOn(user, '_rev', 'get');
        const expected = userJSON._rev;

        const actual = user._rev;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the _rev of the user', () => {
        const spy = jest.spyOn(user, '_rev', 'set');
        const expected = 'rev:0987654321';

        user._rev = expected;
        const actual = user._rev;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the pin of the user', () => {
        const spy = jest.spyOn(user, 'pin', 'get');
        const expected = userJSON.pin;

        const actual = user.pin;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the pin of the user', () => {
        const spy = jest.spyOn(user, 'pin', 'set');
        const expected = '4321';

        user.pin = expected;
        const actual = user.pin;

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should return JSON representation', () => {
        const spy = jest.spyOn(user, 'toJSON');
        const expected = userJSON;

        const actual = user.toJSON();

        expect(spy).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });
});
