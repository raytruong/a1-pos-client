import Database from '@/lib/models/interfaces/Database';
import Repository from '@/lib/models/interfaces/Repository';
import Item from '@/lib/models/items/Item';

class ItemRepository implements Repository<Item> {
    private _localDB: any;

    constructor(private database: Database) {
        if (!database) {
            throw new Error('Database is null');
        }
        this._localDB = database.getConnection();
    }

    private _name = 'ItemRepository';

    public get name(): string {
        return this._name;
    }

    public async get(_id: string): Promise<Item> {
        try {
            const data = await this._localDB.get(_id);
            //TODO: move to serializer
            return new Item(
                data._id,
                data._rev,
                data.cname,
                data.price,
                data.quantity,
                data.category,
                data.addons,
            );
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async getAll(): Promise<Array<Item>> {
        try {
            const data = await this._localDB.allDocs({
                include_docs: true,
            });
            //TODO: move to serializer
            //TODO: add pagination support
            return data.rows.map((row: any) => {
                new Item(
                    row._id,
                    row._rev,
                    row.cname,
                    row.price,
                    row.quantity,
                    row.category,
                    row.addons,
                );
            });
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async save(item: Item): Promise<void> {
        try {
            // TODO: move to serializer
            const serialized: string = JSON.stringify(item, (key, val) => {
                if (key === '_rev') return undefined;
                return val;
            });
            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async update(item: Item): Promise<void> {
        try {
            // TODO: move to serializer
            const tempRev = item._rev;
            const serialized: string = JSON.stringify(item, (key, val) => {
                if (key === '_rev' && val !== tempRev) return undefined;
                return val;
            });
            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async delete(item: Item): Promise<void> {
        // TODO: move to serializer
        try {
            await this._localDB.delete(item);
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default ItemRepository;
