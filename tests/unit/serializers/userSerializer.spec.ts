import { container } from 'tsyringe';
import UserSerializer from '@/lib/serializers/UserSerializer';
import User from '@/lib/models/User';
import {
    userA,
    userB,
    SerializedUserA,
    SerializedUserB,
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
        const expected = SerializedUserA;
        const actual = serializer.serialize(userA);
        expect(actual).toBeInstanceOf(Object);
        expect(actual).toStrictEqual(expected);
    });

    it('should serialize multiple Users', () => {
        const expected = [SerializedUserA, SerializedUserB];
        const actual = serializer.serializeAll([userA, userB]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize a User', () => {
        const expected = userA;
        const actual = serializer.deserialize(SerializedUserA);
        expect(actual).toBeInstanceOf(User);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize multiple Users', () => {
        const expected = [userA, userB];
        const actual = serializer.deserializeAll([
            SerializedUserA,
            SerializedUserB,
        ]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should retain transitivity', () => {
        expect(
            serializer.deserialize(
                serializer.serialize(
                    serializer.deserialize(serializer.serialize(userA)),
                ),
            ),
        ).toStrictEqual(userA);
    });
});
