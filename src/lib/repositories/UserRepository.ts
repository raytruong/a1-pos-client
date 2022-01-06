import Database from '@/lib/interfaces/Database';
import Repository from '@/lib/interfaces/Repository';
import Pouch from '@/lib/databases/Pouch';
import User from '@/lib/models/User';
import UserSerializer from '@/lib/serializers/UserSerializer';
import { inject, singleton } from 'tsyringe';

@singleton()
class UserRepository implements Repository<User> {
    private _localDB: any;

    constructor(
        @inject(Pouch) private database: Database,
        @inject(UserSerializer) private serializer: UserSerializer,
    ) {
        if (!database || !serializer) {
            throw new Error('Missing database or serializer');
        }
        database.setup(this.name);
        this._localDB = database.getConnection();
    }

    private _name = 'UserRepository';

    public get name(): string {
        return this._name;
    }

    public async get(_id: string): Promise<User> {
        try {
            const data = await this._localDB.get(_id);
            return this.serializer.deserialize(data);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async getAll(): Promise<Array<User>> {
        try {
            const data = await this._localDB.allDocs({
                include_docs: true,
            });
            return this.serializer.deserializeAll(data.rows);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async save(user: User): Promise<void> {
        try {
            const serialized = this.serializer.serialize(user);

            // Strip _rev tag to force new insertion in PouchDB
            delete serialized._rev;

            await this._localDB.put(serialized);
            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async update(user: User): Promise<void> {
        try {
            const serialized = this.serializer.serialize(user);
            // Check exists
            await this._localDB.get(serialized);
            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async delete(user: User): Promise<void> {
        try {
            const serialized = this.serializer.serialize(user);
            await this._localDB.delete(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default UserRepository;
