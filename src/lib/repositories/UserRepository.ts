import Database from '@/lib/models/interfaces/Database';
import Repository from '@/lib/models/interfaces/Repository';
import User from '@/lib/models/users/User';

class UserRepository implements Repository<User> {
    private _localDB: any;
    private _remoteDB: any;

    constructor(private database: Database) {
        if (!database) {
            throw new Error('UserRepository: Database is null');
        }
        const connections = database.getConnection();
        this._localDB = connections.local;
        this._remoteDB = connections.remote;
    }

    private _name = 'UserRepository';

    public get name(): string {
        return this._name;
    }

    public async get(_id: string): Promise<User> {
        try {
            const data = await this._localDB.get(_id);
            return new User(data._id, data._rev, data._pin, data._name);
        } catch (err) {
            throw new Error(
                'UserRepository.get(): Unable to retrieve user with id: ' + _id,
            );
        }
    }

    public async getAll(): Promise<Array<User>> {
        try {
            const data = await this._localDB.allDocs({
                include_docs: true,
            });
            return data.rows.map((row: any) => {
                new User(row._id, row._rev, row._pin, row._name);
            });
        } catch (err) {
            throw new Error(
                'UserRepository.getAll(): Unable to retrieve users' + err,
            );
        }
    }

    public async save(user: User): Promise<void> {
        try {
            const serialized: string = JSON.stringify(user, (key, val) => {
                if (key === '_rev') return undefined;
                return val;
            });
            await this._localDB.put(serialized);
        } catch (err) {
            throw new Error(
                'UserRepository.put(): Unable to put user: ' + user,
            );
        }
    }

    public async update(user: User): Promise<void> {
        try {
            // Disabled until necessary
            // disable _rev setter on all models
            // sanitize all _rev tags and add back in manually
            const tempRev = user._rev;
            const serialized: string = JSON.stringify(user, (key, val) => {
                if (key === '_rev' && val !== tempRev) return undefined;
                return val;
            });
            await this._localDB.put(serialized);
        } catch (err) {
            throw new Error(
                'UserRepository.update(): Unable to update user: ' + user,
            );
        }
    }

    public async delete(user: User): Promise<void> {
        try {
            await this._localDB.delete(user);
        } catch (err) {
            throw new Error(
                'UserRepository.delete(): Unable to delete user: ' + user,
            );
        }
    }
}

export default UserRepository;
