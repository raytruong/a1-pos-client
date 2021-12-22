import Database from '@/lib/models/interfaces/Database';
import Pouch from '@/lib/models/databases/Pouch';
import { injectable } from 'tsyringe';

@injectable()
class DatabaseFactory {
    public create(
        type: string,
        name: string,
        username?: string,
        password?: string,
        baseUrl?: string,
    ): Database {
        switch (type) {
            case 'pouchdb': {
                return new Pouch(name, username, password, baseUrl);
            }
            default:
                throw new Error(
                    `DatabaseFactory.create(): Cannot create database of type ${type}`,
                );
        }
    }
}

export default DatabaseFactory;
