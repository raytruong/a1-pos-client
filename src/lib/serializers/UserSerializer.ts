import { singleton } from 'tsyringe';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import User from '@/lib/models/User';

@singleton()
class UserSerializer {
    public deserialize(serialized: Record<string, unknown>): User {
        const deserialized = plainToInstance(User, serialized);
        return deserialized;
    }

    public deserializeAll(
        serialized: Array<Record<string, unknown>>,
    ): Array<User> {
        const deserializedUserArray = Array<User>();
        serialized.forEach((serializedUser) => {
            const deserializedUser = this.deserialize(serializedUser);
            deserializedUserArray.push(deserializedUser);
        });
        return deserializedUserArray;
    }

    public serialize(deserialized: User): Record<string, unknown> {
        const serialized = instanceToPlain(deserialized);
        return serialized;
    }

    public serializeAll(
        deserialized: Array<User>,
    ): Array<Record<string, unknown>> {
        const serializedUserArray = Array<Record<string, unknown>>();
        deserialized.forEach((deserializedUser) => {
            const serializedUser = this.serialize(deserializedUser);
            serializedUserArray.push(serializedUser);
        });
        return serializedUserArray;
    }
}

export default UserSerializer;
