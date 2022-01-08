import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routeConfig = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
    },
    {
        path: '/NotFound',
        name: 'NotFoundView',
        component: NotFoundView,
    },
];

export default routeConfig;
