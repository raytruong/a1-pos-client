import { singleton } from 'tsyringe';
import Transaction from '@/lib/models/Transaction';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@singleton()
class TransactionSerializer {
    public deserialize(serialized: Record<string, unknown>): Transaction {
        const deserialized = plainToInstance(Transaction, serialized);
        return deserialized;
    }

    public deserializeAll(
        serialized: Array<Record<string, unknown>>,
    ): Array<Transaction> {
        const deserializedTransactionArray = Array<Transaction>();
        serialized.forEach((serializedTransaction) => {
            const deserializedTransaction = this.deserialize(
                serializedTransaction,
            );
            deserializedTransactionArray.push(deserializedTransaction);
        });
        return deserializedTransactionArray;
    }

    public serialize(deserialized: Transaction): Record<string, unknown> {
        const serialized = instanceToPlain(deserialized);
        return serialized;
    }

    public serializeAll(
        deserialized: Array<Transaction>,
    ): Array<Record<string, unknown>> {
        const serializedTransactionArray = Array<Record<string, unknown>>();
        deserialized.forEach((deserializedTransaction) => {
            const serializedTransaction = this.serialize(
                deserializedTransaction,
            );
            serializedTransactionArray.push(serializedTransaction);
        });
        return serializedTransactionArray;
    }
}

export default TransactionSerializer;
