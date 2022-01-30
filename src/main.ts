import { createApp } from 'vue';
import App from './App.vue';

// vue-router
import router from '@/router';

// tailwind
import './styles/index.css';

// pinia
import { createPinia } from 'pinia';

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
