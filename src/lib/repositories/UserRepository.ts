import PouchDB from 'pouchdb-browser';
import Repository from '@/lib/models/interfaces/Repository';
import User from '@/lib/models/users/User';
import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
class UserRepository implements Repository<User> {
    private _name = 'UserRepository';
    private _localDB: any;
    private _remoteDB: any;

    constructor(
        @inject('username') username: string,
        @inject('password') password: string,
        @inject('baseUrl') baseUrl: string,
    ) {
        this.setup(username, password, baseUrl);
    }

    private setup(username: string, password: string, baseUrl: string): void {
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
                    'UserRepository.init(): Unable to establish sync with remote: ' +
                        remoteUrl,
                );
            });
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
                new User(
                    row.data._id,
                    row.data._rev,
                    row.data._pin,
                    row.data._name,
                );
            });
        } catch (err) {
            throw new Error(
                'UserRepository.getAll(): Unable to retrieve users',
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
