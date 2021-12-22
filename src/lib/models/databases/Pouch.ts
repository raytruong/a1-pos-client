import Database from '@/lib/models/interfaces/Database';
import PouchDB from 'pouchdb-browser';
import { inject } from 'tsyringe';

class Pouch implements Database {
    private _localDB: any;
    private _remoteDB: any;

    constructor(
        private _name: string,
        @inject('username') username?: string,
        @inject('password') password?: string,
        @inject('baseUrl') baseUrl?: string,
    ) {
        this.connect(username!, password!, baseUrl!);
    }

    public connect(username: string, password: string, baseUrl: string): void {
        if (!username || !password || !baseUrl) {
            throw new Error(
                `PouchDB.connect() expected username, password, baseUrl, was: ${username} ${password} ${baseUrl}`,
            );
        }

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
                    'UserRepository.init(): Unable to establish sync with remote: ' +
                        remoteUrl,
                );
            });
    }

    public getConnection(): any {
        return { local: this._localDB, remote: this._remoteDB };
    }
}

export default Pouch;
