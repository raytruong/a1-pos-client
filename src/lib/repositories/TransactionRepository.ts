import Repository from '@/lib/models/interfaces/Repository';
import PouchDB from 'pouchdb-browser';
import Transaction from '@/lib/models/transactions/Transaction';
import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
class TransactionRepository implements Repository<Transaction> {
    private _name = 'TransactionRepository';
    private _localDB: any;
    private _remoteDB: any;

    constructor(
        @inject('username') username: string,
        @inject('password') password: string,
        @inject('baseUrl') baseUrl: string,
    ) {
        this.init(username, password, baseUrl);
    }

    public async get(_id: string): Promise<Transaction> {
        try {
            const data = await this._localDB.get(_id);
            return new Transaction(
                data._id,
                data._rev,
                data.employee,
                data.paymentType,
                data._items,
            );
        } catch (err) {
            throw new Error(
                'TransactionRepository.get(): Unable to retrieve transaction with id: ' +
                    _id,
            );
        }
    }

    public async getAll(): Promise<Array<Transaction>> {
        try {
            const data = await this._localDB.allDocs({
                include_docs: true,
            });
            return data.rows.map((row: any) => {
                new Transaction(
                    row.data._id,
                    row.data._rev,
                    row.data.employee,
                    row.data.paymentType,
                    row.data._items,
                );
            });
        } catch (err) {
            throw new Error(
                'TransactionRepository.getAll(): Unable to retrieve transactions',
            );
        }
    }

    public async save(transaction: Transaction): Promise<void> {
        try {
            const serialized: string = JSON.stringify(
                transaction,
                (key, val) => {
                    if (key === '_rev') return undefined;
                    return val;
                },
            );
            await this._localDB.put(serialized);
        } catch (err) {
            throw new Error(
                'TransactionRepository.put(): Unable to put transaction: ' +
                    transaction,
            );
        }
    }

    public async update(transaction: Transaction): Promise<void> {
        try {
            // Disabled until necessary
            const tempRev = transaction._rev;
            const serialized: string = JSON.stringify(
                transaction,
                (key, val) => {
                    if (key === '_rev' && val !== tempRev) return undefined;
                    return val;
                },
            );
            await this._localDB.put(serialized);
        } catch (err) {
            throw new Error(
                'TransactionRepository.update(): Unable to update transaction: ' +
                    transaction,
            );
        }
    }

    public async delete(transaction: Transaction): Promise<void> {
        try {
            await this._localDB.delete(transaction);
        } catch (err) {
            throw new Error(
                'TransactionRepository.delete(): Unable to delete transaction: ' +
                    transaction,
            );
        }
    }

    private init(username: string, password: string, baseUrl: string): void {
        const remoteUrl = baseUrl
            .replaceAll('${USERNAME}', username)
            .replaceAll('${PASSWORD}', password)
            .replaceAll('${DB_NAME}', this._name);
        const localUrl = `local-${this._name}`;

        this._localDB = new PouchDB(localUrl);
        this._remoteDB = new PouchDB(remoteUrl);

        this._localDB
            .sync(this._remoteDB, {
                live: true,
                retry: false,
            })
            .on('error', function () {
                throw new Error(
                    'TransactionRepository.init(): Unable to establish sync with remote: ' +
                        remoteUrl,
                );
            });
    }
}

export default TransactionRepository;
