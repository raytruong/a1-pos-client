import HomeView from '@/views/HomeView.vue';
import StoreView from '@/views/StoreView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routeConfig = [
    {
        path: '/store',
        name: 'HomeView',
        component: HomeView,
    },
    {
        path: '/',
        name: 'StoreView',
        component: StoreView,
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
        path: '/logout',
        name: 'LogoutView',
        component: NotFoundView,
    },
    {
        path: '/NotFound',
        name: 'NotFoundView',
        component: NotFoundView,
    },
];

export default routeConfig;
