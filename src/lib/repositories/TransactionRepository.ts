import Repository from '@/lib/interfaces/Repository';
import Transaction from '@/lib/models/Transaction';
import Database from '@/lib/interfaces/Database';

class TransactionRepository implements Repository<Transaction> {
    private _localDB: any;

    constructor(private database: Database) {
        if (!database) {
            throw new Error('Database is null');
        }
        this._localDB = database.getConnection();
    }

    private _name = 'TransactionRepository';

    public get name(): string {
        return this._name;
    }

    public async get(_id: string): Promise<Transaction> {
        try {
            const data = await this._localDB.get(_id);
            //TODO: move to serializer
            return new Transaction(
                data._id,
                data._rev,
                data.employee,
                data.paymentType,
                data._items,
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async getAll(): Promise<Array<Transaction>> {
        try {
            const data = await this._localDB.allDocs({
                include_docs: true,
            });
            //TODO: move to serializer
            //TODO: add pagination support
            return data.rows.map((row: any) => {
                new Transaction(
                    row.data._id,
                    row.data._rev,
                    row.data.employee,
                    row.data.paymentType,
                    row.data._items,
                );
            });
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async save(transaction: Transaction): Promise<void> {
        try {
            //TODO: move to serializer
            const serialized: string = JSON.stringify(
                transaction,
                (key, val) => {
                    if (key === '_rev') return undefined;
                    return val;
                },
            );
            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async update(transaction: Transaction): Promise<void> {
        try {
            //TODO: move to serializer
            const tempRev = transaction._rev;
            const serialized: string = JSON.stringify(
                transaction,
                (key, val) => {
                    if (key === '_rev' && val !== tempRev) return undefined;
                    return val;
                },
            );
            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async delete(transaction: Transaction): Promise<void> {
        try {
            //TODO: move to serializer
            await this._localDB.delete(transaction);
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default TransactionRepository;
