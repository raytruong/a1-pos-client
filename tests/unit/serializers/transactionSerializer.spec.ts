import { container } from 'tsyringe';
import TransactionSerializer from '@/lib/serializers/TransactionSerializer';
import Transaction from '@/lib/models/Transaction';
import {
    transactionA,
    transactionB,
    SerializedTransactionA,
    SerializedTransactionB,
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
        const expected = SerializedTransactionA;
        const actual = serializer.serialize(transactionA);
        expect(actual).toBeInstanceOf(Object);
        expect(actual).toStrictEqual(expected);
    });

    it('should serialize multiple Transactions', () => {
        const expected = [SerializedTransactionA, SerializedTransactionB];
        const actual = serializer.serializeAll([transactionA, transactionB]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize a Transaction', () => {
        const expected = transactionA;
        const actual = serializer.deserialize(SerializedTransactionA);
        expect(actual).toBeInstanceOf(Transaction);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize multiple Transactions', () => {
        const expected = [transactionA, transactionB];
        const actual = serializer.deserializeAll([
            SerializedTransactionA,
            SerializedTransactionB,
        ]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should retain transitivity', () => {
        expect(
            serializer.deserialize(
                serializer.serialize(
                    serializer.deserialize(serializer.serialize(transactionA)),
                ),
            ),
        ).toStrictEqual(transactionA);
    });
});
