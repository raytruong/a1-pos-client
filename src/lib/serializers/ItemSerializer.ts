import { singleton } from 'tsyringe';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import Serializer from '@/lib/interfaces/Serializer';
import AbstractItem from '@/lib/models/AbstractItem';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';

@singleton()
class ItemSerializer implements Serializer<AbstractItem> {
    public deserialize(serialized: Record<string, unknown>): AbstractItem {
        if (!serialized._id || typeof serialized._id !== 'string')
            throw Error(`Missing id: ${serialized}`);

        let deserialized;

        if (serialized._id.startsWith('item')) {
            deserialized = plainToInstance(Item, serialized);
        } else {
            deserialized = plainToInstance(Addon, serialized);
        }

        return deserialized;
    }

    public deserializeAll(
        serialized: Array<Record<string, unknown>>,
    ): Array<AbstractItem> {
        const deserializedItemArray = Array<AbstractItem>();
        serialized.forEach((serializedItem) => {
            const deserializedItem = this.deserialize(serializedItem);
            deserializedItemArray.push(deserializedItem);
        });
        return deserializedItemArray;
    }

    public serialize(deserialized: AbstractItem): Record<string, unknown> {
        const serialized = instanceToPlain(deserialized);
        return serialized;
    }

    public serializeAll(
        deserialized: Array<AbstractItem>,
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
