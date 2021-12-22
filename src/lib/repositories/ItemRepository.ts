import Repository from '@/lib/models/interfaces/Repository';
import PouchDB from 'pouchdb-browser';
import Item from '@/lib/models/items/Item';
import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
class ItemRepository implements Repository<Item> {
    private _name = 'ItemRepository';
    private _localDB: any;
    private _remoteDB: any;

    constructor() {
        this.setup();
    }

    public async get(_id: string): Promise<Item> {
        try {
            const data = await this._localDB.get(_id);
            return new Item(
                data._id,
                data._rev,
                data.cname,
                data.price,
                data.quantity,
                data.category,
                data.addons,
            );
        } catch (err) {
            throw new Error(
                'ItemRepository.get(): Unable to retrieve item with id: ' + _id,
            );
        }
    }

    public async getAll(): Promise<Array<Item>> {
        try {
            const data = await this._localDB.allDocs({
                include_docs: true,
            });
            return data.rows.map((row: any) => {
                new Item(
                    row.data._id,
                    row.data._rev,
                    row.data.cname,
                    row.data.price,
                    row.data.quantity,
                    row.data.category,
                    row.data.addons,
                );
            });
        } catch (err) {
            throw new Error(
                'ItemRepository.getAll(): Unable to retrieve items',
            );
        }
    }

    public async save(item: Item): Promise<void> {
        try {
            const serialized: string = JSON.stringify(item, (key, val) => {
                if (key === '_rev') return undefined;
                return val;
            });
            await this._localDB.put(serialized);
        } catch (err) {
            throw new Error(
                'ItemRepository.put(): Unable to put item: ' + item,
            );
        }
    }

    public async update(item: Item): Promise<void> {
        try {
            // Disabled until necessary
            const tempRev = item._rev;
            const serialized: string = JSON.stringify(item, (key, val) => {
                if (key === '_rev' && val !== tempRev) return undefined;
                return val;
            });
            await this._localDB.put(serialized);
        } catch (err) {
            throw new Error(
                'ItemRepository.update(): Unable to update item: ' + item,
            );
        }
    }

    public async delete(item: Item): Promise<void> {
        try {
            await this._localDB.delete(item);
        } catch (err) {
            throw new Error(
                'ItemRepository.delete(): Unable to delete item: ' + item,
            );
        }
    }

    private setup(
        @inject('username') username?: string,
        @inject('password') password?: string,
        @inject('baseUrl') baseUrl?: string,
    ): void {
        const remoteUrl = baseUrl!
            .replaceAll('${USERNAME}', username!)
            .replaceAll('${PASSWORD}', password!)
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
                    'ItemRepository.init(): Unable to establish sync with remote: ' +
                        remoteUrl,
                );
            });
    }
}

export default ItemRepository;
