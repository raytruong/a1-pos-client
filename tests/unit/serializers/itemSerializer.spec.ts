import { container } from 'tsyringe';
import ItemSerializer from '@/lib/serializers/ItemSerializer';
import Item from '@/lib/models/Item';
import {
    itemA,
    itemB,
    SerializedItemA,
    SerializedItemB,
} from './__mocks__/item';

describe('ItemSerializer class', () => {
    const mockContainer = container.createChildContainer();
    let serializer: ItemSerializer;

    beforeEach(() => {
        serializer = mockContainer.resolve(ItemSerializer);
    });

    afterEach(() => {
        mockContainer.clearInstances();
    });

    it('should create an ItemSerializer', () => {
        expect(serializer).toBeDefined();
        expect(serializer).toBeInstanceOf(ItemSerializer);
    });

    it('should serialize an Item with addons', () => {
        const expected = SerializedItemA;
        const actual = serializer.serialize(itemA);
        expect(actual).toBeInstanceOf(Object);
        expect(actual).toStrictEqual(expected);
    });

    it('should serialize multiple Items with addons', () => {
        const expected = [SerializedItemA, SerializedItemB];
        const actual = serializer.serializeAll([itemA, itemB]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize an Item with addons', () => {
        const expected = itemA;
        const actual = serializer.deserialize(SerializedItemA);
        expect(actual).toBeInstanceOf(Item);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize multiple Items with addons', () => {
        const expected = [itemA, itemB];
        const actual = serializer.deserializeAll([
            SerializedItemA,
            SerializedItemB,
        ]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should retain transitivity', () => {
        expect(
            serializer.deserialize(
                serializer.serialize(
                    serializer.deserialize(serializer.serialize(itemA)),
                ),
            ),
        ).toStrictEqual(itemA);
    });
});
