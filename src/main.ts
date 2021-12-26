import { createApp } from 'vue';
import App from './App.vue';

import 'reflect-metadata';
import { container } from 'tsyringe';
import UserService from '@/lib/services/UserService';

// TODO: IMPORTANT MOVE TO AUTH SERVICE
container.register('username', { useValue: import.meta.env.VITE_DB_USER });
container.register('password', { useValue: import.meta.env.VITE_DB_PASS });
container.register('baseUrl', { useValue: import.meta.env.VITE_DB_BASEURL });

container.resolve(UserService);

createApp(App).mount('#app');
