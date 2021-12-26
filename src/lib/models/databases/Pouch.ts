import Database from '@/lib/models/interfaces/Database';
import PouchDB from 'pouchdb-browser';

class Pouch implements Database {
    private _localDB: any;
    private _remoteDB: any;

    constructor(
        private _name: string,
        private username: string,
        private password: string,
        private baseUrl: string,
    ) {}

    public get name(): string {
        return this._name;
    }

    public get getRemote(): any {
        return this._remoteDB;
    }

    public getConnection(): any {
        return this._localDB;
    }

    public connect(): void {
        const remoteUrl = this.baseUrl
            .replaceAll('${USERNAME}', this.username)
            .replaceAll('${PASSWORD}', this.password)
            .replaceAll('${DB_NAME}', this._name);
        const localUrl = `local-${this._name}`;

        this._localDB = new PouchDB(localUrl);
        this._remoteDB = new PouchDB(remoteUrl);

        this._localDB
            .sync(this._remoteDB, {
                live: true,
                retry: false,
            })
            .on('error', function (err: any) {
                throw new Error(
                    'Unable to establish sync with remote url: ' + remoteUrl,
                );
            });
    }
}

export default Pouch;
