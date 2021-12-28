import 'jest';
import User from '../../../src/lib/models/User';

describe('User class', () => {
    let user: User;

    beforeEach(() => {
        user = new User(
            'user:1234567890',
            '7-8596f70bd9ed85a3e133af283838f191',
            '1234',
            'Saul Goodman',
        );
    });

    it('should construct a new user', () => {
        expect(user).toBeDefined();
        expect(user).toBeInstanceOf(User);
    });

    it('should build a new user', () => {
        const name = 'Kim Wexler';
        const pin = '4321';
        const spyBuild = jest.spyOn(user, 'clone');

        const builtUser = user.clone(name, pin);

        expect(spyBuild).toHaveBeenCalled();
        expect(builtUser).toBeDefined();
        expect(builtUser).toBeInstanceOf(User);
    });

    it('should throw exception on build without proper parameters', () => {
        const name = '';
        const pin = '';

        const build = (): void => {
            user.clone(name, pin);
        };

        expect(build).toThrow();
    });

    it('should get the name of the user', () => {
        const spyName = jest.spyOn(user, 'name', 'get');
        const expected = 'Saul Goodman';

        const actual = user.name;

        expect(spyName).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the _id of the user', () => {
        const spyId = jest.spyOn(user, '_id', 'get');
        const expected = 'user:1234567890';

        const actual = user._id;

        expect(spyId).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should get the pin of the user', () => {
        const spyPin = jest.spyOn(user, 'pin', 'get');
        const expected = '1234';

        const actual = user.pin;

        expect(spyPin).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the _id of the user', () => {
        const spyId = jest.spyOn(user, '_id', 'set');
        const expected = 'user:0987654321';

        user._id = expected;
        const actual = user._id;

        expect(spyId).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the pin of the user', () => {
        const spyPin = jest.spyOn(user, 'pin', 'set');
        const expected = '4321';

        user.pin = expected;
        const actual = user.pin;

        expect(spyPin).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should set the name of the user', () => {
        const spyName = jest.spyOn(user, 'name', 'set');
        const expected = 'Walter White';

        user.name = expected;
        const actual = user.name;

        expect(spyName).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });

    it('should return JSON representation', () => {
        const spytoJSON = jest.spyOn(user, 'toJSON');
        const expected = {
            _id: 'user:1234567890',
            _rev: '7-8596f70bd9ed85a3e133af283838f191',
            _pin: '1234',
            _name: 'Saul Goodman',
        };

        const actual = user.toJSON();

        expect(spytoJSON).toHaveBeenCalled();
        expect(actual).toStrictEqual(expected);
    });
});
