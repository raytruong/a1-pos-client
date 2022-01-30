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
    let underTest: TransactionSerializer;

    beforeEach(() => {
        underTest = mockContainer.resolve(TransactionSerializer);
    });

    afterEach(() => {
        mockContainer.clearInstances();
    });

    it('should create an TransactionSerializer', () => {
        expect(underTest).toBeDefined();
        expect(underTest).toBeInstanceOf(TransactionSerializer);
    });

    it('should serialize a Transaction', () => {
        const expected = transactionAJSON;
        const actual = underTest.serialize(transactionAInstance);
        expect(actual).toBeInstanceOf(Object);
        expect(actual).toStrictEqual(expected);
    });

    it('should serialize multiple Transactions', () => {
        const expected = [transactionAJSON, transactionBJSON];
        const actual = underTest.serializeAll([
            transactionAInstance,
            transactionBInstance,
        ]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize a Transaction', () => {
        const expected = transactionAInstance;
        const actual = underTest.deserialize(transactionAJSON);
        expect(actual).toBeInstanceOf(Transaction);
        expect(actual).toStrictEqual(expected);
    });

    it('should deserialize multiple Transactions', () => {
        const expected = [transactionAInstance, transactionBInstance];
        const actual = underTest.deserializeAll([
            transactionAJSON,
            transactionBJSON,
        ]);
        expect(actual).toBeInstanceOf(Array);
        expect(actual).toStrictEqual(expected);
    });

    it('should retain transitivity', () => {
        expect(
            underTest.deserialize(
                underTest.serialize(
                    underTest.deserialize(
                        underTest.serialize(transactionAInstance),
                    ),
                ),
            ),
        ).toStrictEqual(transactionAInstance);
    });
});
