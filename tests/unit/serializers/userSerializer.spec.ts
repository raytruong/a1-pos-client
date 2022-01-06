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
    let serializer: UserSerializer;

    beforeEach(() => {
        serializer = mockContainer.resolve(UserSerializer);
    });

    afterEach(() => {
        mockContainer.clearInstances();
    });

    it('should create a UserSerializer', () => {
        expect(serializer).toBeDefined();
        expect(serializer).toBeInstanceOf(UserSerializer);
    });

    it('should serialize a User', () => {
        const expected = userAJSON;
        const actual = serializer.serialize(userAInstance);
        expect(actual).toBeInstanceOf(Object);
        expect(actual).toStrictEqual(expected);
    });

    it('should serialize multiple Users', () => {
        const expected = [userAJSON, userBJSON];
        const actual = serializer.serializeAll([userAInstance, userBInstance]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize a User', () => {
        const expected = userAInstance;
        const actual = serializer.deserialize(userAJSON);
        expect(actual).toBeInstanceOf(User);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize multiple Users', () => {
        const expected = [userAInstance, userBInstance];
        const actual = serializer.deserializeAll([userAJSON, userBJSON]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should retain transitivity', () => {
        expect(
            serializer.deserialize(
                serializer.serialize(
                    serializer.deserialize(serializer.serialize(userAInstance)),
                ),
            ),
        ).toStrictEqual(userAInstance);
    });
});
