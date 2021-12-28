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
        //TODO: move to serializer
        try {
            const data = await this._localDB.get(_id);
            return new User(data._id, data._rev, data._pin, data._name);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async getAll(): Promise<Array<User>> {
        try {
            //TODO: move to serializer
            //TODO: add pagination support
            const data = await this._localDB.allDocs({
                include_docs: true,
            });
            return data.rows.map((row: any) => {
                new User(row._id, row._rev, row._pin, row._name);
            });
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async save(user: User): Promise<void> {
        try {
            //TODO: move to serializer
            const serialized: string = JSON.parse(
                JSON.stringify(user, (key, val) => {
                    if (key === '_rev') return undefined;
                    return val;
                }),
            );
            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async update(user: User): Promise<void> {
        try {
            // Disabled until necessary
            // disable _rev setter on all models
            // sanitize all _rev tags and add back in manually
            //TODO: move to serializer
            const tempRev = user._rev;
            const serialized: string = JSON.stringify(user, (key, val) => {
                if (key === '_rev' && val !== tempRev) return undefined;
                return val;
            });
            await this._localDB.put(serialized);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    public async delete(user: User): Promise<void> {
        try {
            //TODO: move to serializer
            await this._localDB.delete(user);
        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default UserRepository;
