import { singleton } from 'tsyringe';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import Item from '@/lib/models/Item';
import Serializer from '@/lib/interfaces/Serializer';

@singleton()
class ItemSerializer implements Serializer<Item> {
    public deserialize(serialized: Record<string, unknown>): Item {
        const deserialized = plainToInstance(Item, serialized);
        return deserialized;
    }

    public deserializeAll(
        serialized: Array<Record<string, unknown>>,
    ): Array<Item> {
        const deserializedItemArray = Array<Item>();
        serialized.forEach((serializedItem) => {
            const deserializedItem = this.deserialize(serializedItem);
            deserializedItemArray.push(deserializedItem);
        });
        return deserializedItemArray;
    }

    public serialize(deserialized: Item): Record<string, unknown> {
        const serialized = instanceToPlain(deserialized);
        return serialized;
    }

    public serializeAll(
        deserialized: Array<Item>,
    ): Array<Record<string, unknown>> {
        const serializedItemArray = Array<Record<string, unknown>>();
        deserialized.forEach((deserializedItem) => {
            const serializedItem = this.serialize(deserializedItem);
            serializedItemArray.push(serializedItem);
        });
        return serializedItemArray;
    }
}

export default ItemSerializer;
