import Database from '@/lib/models/interfaces/Database';
import Pouch from '@/lib/models/databases/Pouch';
import { inject, singleton } from 'tsyringe';

@singleton()
class DatabaseFactory {
    public types = {
        POUCH: 'pouchdb',
    };

    constructor(
        @inject('username') private _defaultUsername?: string,
        @inject('password') private _defaultPassword?: string,
        @inject('baseUrl') private _defaultBaseUrl?: string,
    ) {
        if (!_defaultUsername || !_defaultPassword || !_defaultBaseUrl) {
            throw new Error('Missing default connection details');
        }
    }

    public build(
        type: string,
        name: string,
        username?: string,
        password?: string,
        baseUrl?: string,
    ): Database {
        const _username = username ? username : this._defaultUsername!;
        const _password = password ? password : this._defaultPassword!;
        const _baseUrl = baseUrl ? baseUrl : this._defaultBaseUrl!;

        switch (type) {
            case this.types.POUCH: {
                return new Pouch(name, _username, _password, _baseUrl);
            }
            default:
                throw new Error(`Cannot create database of type ${type}`);
        }
    }
}

export default DatabaseFactory;
