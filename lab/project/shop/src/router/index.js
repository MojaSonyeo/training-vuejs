import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Catalog from '../views/Catalog.vue';
import NotFound from '../views/NotFound.vue';
import Commande from '../views/Commande.vue';
import Success from '../views/Success.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound,
    },
    {
        path: '/catalog/:categoryId',
        name: 'Catalog',
        component: Catalog,
    },
    {
        path: '/commande',
        name: 'Commande',
        component: Commande,
    },
    {
        path: '/success',
        name: 'Success',
        component: Success,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
