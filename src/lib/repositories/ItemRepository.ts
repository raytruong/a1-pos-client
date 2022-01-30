import Database from '@/lib/interfaces/Database';
import Repository from '@/lib/interfaces/Repository';
import Serializer from '@/lib/interfaces/Serializer';
import ItemSerializer from '@/lib/serializers/ItemSerializer';
import AbstractItem from '@/lib/models/AbstractItem';
import Pouch from '@/lib/databases/Pouch';
import { inject, singleton } from 'tsyringe';

@singleton()
class ItemRepository implements Repository<AbstractItem> {
    private _localDB: any;

    constructor(
        @inject(Pouch) private database: Database,
        @inject(ItemSerializer) private serializer: Serializer<AbstractItem>,
    ) {
        if (!database || !serializer) {
            throw new Error('Missing database or serializer');
        }
        database.setup(this.name);
        this._localDB = database.getConnection();
    }

    private _name = 'item_repository';

    public get name(): string {
        return this._name;
    }

    public async get(_id: string): Promise<AbstractItem> {
        try {
            const data = await this._localDB.get(_id);
            return this.serializer.deserialize(data);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    //TODO: add pagination support
    public async getAll(): Promise<Array<AbstractItem>> {
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

    public async save(item: AbstractItem): Promise<void> {
        try {
            const serialized = this.serializer.serialize(item);

            // Strip _rev tag to force new insertion in PouchDB
            delete serialized._rev;

            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async update(item: AbstractItem): Promise<void> {
        try {
            const serialized = this.serializer.serialize(item);
            // Check exists
            await this._localDB.get(serialized);
            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async delete(item: AbstractItem): Promise<void> {
        try {
            const serialized = this.serializer.serialize(item);
            await this._localDB.delete(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default ItemRepository;
