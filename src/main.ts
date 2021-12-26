import { createApp } from 'vue';
import App from './App.vue';

import 'reflect-metadata';
import { container } from 'tsyringe';

// TODO: IMPORTANT MOVE TO AUTH SERVICE
container.register('username', { useValue: import.meta.env.VITE_DB_USER });
container.register('password', { useValue: import.meta.env.VITE_DB_PASS });
container.register('baseUrl', { useValue: import.meta.env.VITE_DB_BASEURL });

import DatabaseFactory from '@/lib/models/databases/DatabaseFactory';

const dbf = container.resolve(DatabaseFactory);

container.register('UserDatabase', {
    useValue: dbf.build('pouchdb', 'User'),
});

createApp(App).mount('#app');
