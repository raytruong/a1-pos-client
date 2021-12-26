import 'reflect-metadata';
import { container } from 'tsyringe';
import DatabaseFactory from './src/lib/models/databases/DatabaseFactory';

container.register('username', { useValue: 'user' });
container.register('password', { useValue: 'pass' });
container.register('baseUrl', { useValue: 'base' });

const dbf = container.resolve(DatabaseFactory);

container.register('UserDatabase', {
    useValue: dbf.build('pouchdb', 'User'),
});
