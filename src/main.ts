import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

import 'reflect-metadata';
import { container } from 'tsyringe';

// TODO: IMPORTANT MOVE TO AUTH SERVICE
container.register('username', { useValue: import.meta.env.VITE_DB_USER });
container.register('password', { useValue: import.meta.env.VITE_DB_PASS });
container.register('baseUrl', { useValue: import.meta.env.VITE_DB_BASEURL });

const app = createApp(App);
app.use(router);
app.mount('#app');
