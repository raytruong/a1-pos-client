import Database from '@/lib/interfaces/Database';
import PouchDB from 'pouchdb';
import { injectable } from 'tsyringe';

@injectable()
class Pouch implements Database {
    private _localDB: any;
    private _remoteDB: any;

    private _name = '';

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get getRemote(): any {
        return this._remoteDB;
    }

    public getConnection(): any {
        return this._localDB;
    }

    public setup(name?: string): void {
        if (!name) {
            throw new Error('Name needs to be provided in setup function');
        }
        this._name = name;
        this.connect();
    }

    public connect(): void {
        if (!this.name) {
            throw new Error('Name needs to be assigned before connection');
        }

        // TODO: implement auth service
        const remoteUrl = `remote-${this.name}`;
        const localUrl = `local-${this.name}`;

        this._localDB = new PouchDB(localUrl);
        this._remoteDB = new PouchDB(remoteUrl);

        this._localDB
            .sync(this._remoteDB, {
                live: true,
                retry: false,
            })
            .on('error', function (err: any) {
                throw new Error(err);
            });
    }
}

export default Pouch;
