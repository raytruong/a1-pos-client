import { container } from 'tsyringe';
import ItemSerializer from '@/lib/serializers/ItemSerializer';
import Item from '@/lib/models/Item';
import Addon from '@/lib/models/Addon';
import {
    addonAInstance,
    itemAInstance,
    itemAJSON,
    itemBInstance,
    itemBJSON,
} from './__mocks__/item';

describe('ItemSerializer class', () => {
    const mockContainer = container.createChildContainer();
    let underTest: ItemSerializer;

    beforeEach(() => {
        underTest = mockContainer.resolve(ItemSerializer);
    });

    afterEach(() => {
        jest.clearAllMocks();
        mockContainer.clearInstances();
    });

    it('should create an ItemSerializer', () => {
        expect(underTest).toBeDefined();
        expect(underTest).toBeInstanceOf(ItemSerializer);
    });

    it('should serialize an Item with addons', () => {
        const expected = itemAJSON;
        const actual = underTest.serialize(itemAInstance);
        expect(actual).toBeInstanceOf(Object);
        expect(actual).toStrictEqual(expected);
    });

    it('should serialize multiple Items with addons', () => {
        const expected = [itemAJSON, itemBJSON];
        const actual = underTest.serializeAll([itemAInstance, itemBInstance]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize an Item with addons', () => {
        const expected = itemAInstance;
        const actual = underTest.deserialize(itemAJSON);
        expect(actual).toBeInstanceOf(Item);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize multiple Items with addons', () => {
        const expected = [itemAInstance, itemBInstance];
        const actual = underTest.deserializeAll([itemAJSON, itemBJSON]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize an Addon', () => {
        const expected = addonAInstance;
        const actual = underTest.deserialize(itemAJSON.addons[0]);
        expect(actual).toBeInstanceOf(Addon);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize multiple Items or Addons', () => {
        const expected = [itemAInstance, itemBInstance, addonAInstance];
        const actual = underTest.deserializeAll([
            itemAJSON,
            itemBJSON,
            itemAJSON.addons[0],
        ]);
        expect(actual).toBeInstanceOf(Array);
        actual.forEach((AbstractItem, index) => {
            expect(AbstractItem.constructor.name).toEqual(
                expected[index].constructor.name,
            );
        });
        expect(actual).toStrictEqual(expected);
    });

    it('should retain transitivity', () => {
        expect(
            underTest.deserialize(
                underTest.serialize(
                    underTest.deserialize(underTest.serialize(itemAInstance)),
                ),
            ),
        ).toStrictEqual(itemAInstance);
    });
});
