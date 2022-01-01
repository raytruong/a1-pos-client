import { container } from 'tsyringe';
import TransactionSerializer from '@/lib/serializers/TransactionSerializer';
import Transaction from '@/lib/models/Transaction';
import {
    transactionAInstance,
    transactionBInstance,
    transactionAJSON,
    transactionBJSON,
} from './__mocks__/transaction';

describe('TransactionSerializer class', () => {
    const mockContainer = container.createChildContainer();
    let serializer: TransactionSerializer;

    beforeEach(() => {
        serializer = mockContainer.resolve(TransactionSerializer);
    });

    afterEach(() => {
        mockContainer.clearInstances();
    });

    it('should create an TransactionSerializer', () => {
        expect(serializer).toBeDefined();
        expect(serializer).toBeInstanceOf(TransactionSerializer);
    });

    it('should serialize a Transaction', () => {
        const expected = transactionAJSON;
        const actual = serializer.serialize(transactionAInstance);
        expect(actual).toBeInstanceOf(Object);
        expect(actual).toStrictEqual(expected);
    });

    it('should serialize multiple Transactions', () => {
        const expected = [transactionAJSON, transactionBJSON];
        const actual = serializer.serializeAll([
            transactionAInstance,
            transactionBInstance,
        ]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize a Transaction', () => {
        const expected = transactionAInstance;
        const actual = serializer.deserialize(transactionAJSON);
        expect(actual).toBeInstanceOf(Transaction);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize multiple Transactions', () => {
        const expected = [transactionAInstance, transactionBInstance];
        const actual = serializer.deserializeAll([
            transactionAJSON,
            transactionBJSON,
        ]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should retain transitivity', () => {
        expect(
            serializer.deserialize(
                serializer.serialize(
                    serializer.deserialize(
                        serializer.serialize(transactionAInstance),
                    ),
                ),
            ),
        ).toStrictEqual(transactionAInstance);
    });
});
