import { RouterOptions, createRouter, createMemoryHistory } from 'vue-router';
import routes from './routes';

const config: RouterOptions = {
    routes: routes,
    history: createMemoryHistory(),
};

const router = createRouter(config);

export default router;
