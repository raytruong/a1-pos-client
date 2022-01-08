import HomeView from '@/views/HomeView.vue';

const NotFoundComponent = { template: '<p>Page not found</p>' };

const routeConfig = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
    },
    {
        path: '/lost',
        name: '404',
        component: NotFoundComponent,
    },
];

export default routeConfig;
