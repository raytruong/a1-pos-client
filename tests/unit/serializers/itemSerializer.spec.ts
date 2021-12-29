import { container } from 'tsyringe';
import ItemSerializer from '../../../src/lib/serializers/ItemSerializer';
import { mockItemA, mockItemB } from './__mocks__/item';
import Item from '../../../src/lib/models/Item';

describe('ItemSerializer class', () => {
    const mockContainer = container.createChildContainer();
    let serializer: ItemSerializer;
    let mockItem = mockItemA;

    beforeEach(() => {
        serializer = mockContainer.resolve(ItemSerializer);
        mockItem = mockItemA;
    });

    afterEach(() => {
        mockContainer.clearInstances();
    });

    it('should create an ItemSerializer', () => {
        expect(serializer).toBeDefined();
    });

    it('should serialize an Item with addons', async () => {
        const expected = serializer.deserialize(serializer.serialize(mockItem));
        const actual = serializer.serialize(mockItem);
        expect(actual).toBeInstanceOf(Object);
    });

    it('should serialize multiple Items with addons', () => {});

    it('should deserialize an Item with addons', async () => {
        const expected = mockItem;
        const serialized = serializer.serialize(mockItem);
        const actual = serializer.deserialize(serialized);
        expect(actual).toBeInstanceOf(Item);
        expect(actual).toStrictEqual(expected);
    });

    it('should retain transitivity', async () => {
        expect(
            serializer.deserialize(
                serializer.serialize(
                    serializer.deserialize(serializer.serialize(mockItem)),
                ),
            ),
        ).toStrictEqual(mockItem);
    });

    it('should deserialize multiple Items with addons', async () => {});
});
