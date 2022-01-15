import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routeConfig = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
    },
    {
        path: '/checkout',
        name: 'CheckoutView',
        component: NotFoundView,
    },
    {
        path: '/dashboard',
        name: 'DashboardView',
        component: NotFoundView,
    },
    {
        path: '/NotFound',
        name: 'NotFoundView',
        component: NotFoundView,
    },
];

export default routeConfig;
