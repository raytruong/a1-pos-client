import { container } from 'tsyringe';
import UserSerializer from '@/lib/serializers/UserSerializer';
import User from '@/lib/models/User';
import {
    userAInstance,
    userBInstance,
    userAJSON,
    userBJSON,
} from './__mocks__/user';

describe('UserSerializer class', () => {
    const mockContainer = container.createChildContainer();
    let underTest: UserSerializer;

    beforeEach(() => {
        underTest = mockContainer.resolve(UserSerializer);
    });

    afterEach(() => {
        mockContainer.clearInstances();
    });

    it('should create a UserSerializer', () => {
        expect(underTest).toBeDefined();
        expect(underTest).toBeInstanceOf(UserSerializer);
    });

    it('should serialize a User', () => {
        const expected = userAJSON;
        const actual = underTest.serialize(userAInstance);
        expect(actual).toBeInstanceOf(Object);
        expect(actual).toStrictEqual(expected);
    });

    it('should serialize multiple Users', () => {
        const expected = [userAJSON, userBJSON];
        const actual = underTest.serializeAll([userAInstance, userBInstance]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize a User', () => {
        const expected = userAInstance;
        const actual = underTest.deserialize(userAJSON);
        expect(actual).toBeInstanceOf(User);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize multiple Users', () => {
        const expected = [userAInstance, userBInstance];
        const actual = underTest.deserializeAll([userAJSON, userBJSON]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should retain transitivity', () => {
        expect(
            underTest.deserialize(
                underTest.serialize(
                    underTest.deserialize(underTest.serialize(userAInstance)),
                ),
            ),
        ).toStrictEqual(userAInstance);
    });
});
