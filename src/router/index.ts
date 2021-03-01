import {createRouter, createMemoryHistory} from 'vue-router';
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    }
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});
