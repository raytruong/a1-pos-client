import Database from '@/lib/interfaces/Database';
import Repository from '@/lib/interfaces/Repository';
import Serializer from '@/lib/interfaces/Serializer';
import TransactionSerializer from '@/lib/serializers/TransactionSerializer';
import Transaction from '@/lib/models/Transaction';
import Pouch from '@/lib/databases/Pouch';
import { inject, singleton } from 'tsyringe';

@singleton()
class TransactionRepository implements Repository<Transaction> {
    private _localDB: any;

    constructor(
        @inject(Pouch) private database: Database,
        @inject(TransactionSerializer)
        private serializer: Serializer<Transaction>,
    ) {
        if (!database || !serializer) {
            throw new Error('Missing database or serializer');
        }
        database.setup(this.name);
        this._localDB = database.getConnection();
    }

    private _name = 'transaction_repository';

    public get name(): string {
        return this._name;
    }

    public async get(_id: string): Promise<Transaction> {
        try {
            const data = await this._localDB.get(_id);
            return this.serializer.deserialize(data);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async getAll(): Promise<Array<Transaction>> {
        try {
            const data = await this._localDB.allDocs({
                include_docs: true,
            });
            return this.serializer.deserializeAll(
                data.rows.map((row: Record<string, unknown>) => row.doc),
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async save(transaction: Transaction): Promise<void> {
        try {
            const serialized = this.serializer.serialize(transaction);

            // Strip _rev tag to force new insertion in PouchDB
            delete serialized._rev;

            await this._localDB.put(serialized);
            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async update(transaction: Transaction): Promise<void> {
        try {
            const serialized = this.serializer.serialize(transaction);
            // Check exists
            await this._localDB.get(serialized);
            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async delete(transaction: Transaction): Promise<void> {
        try {
            const serialized = this.serializer.serialize(transaction);
            await this._localDB.delete(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default TransactionRepository;
