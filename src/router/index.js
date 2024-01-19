import {createRouter, createWebHistory} from 'vue-router'
import Home from '../Home.vue'
import About from '../About.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
        path: '/',
        name: 'Home',
        component: Home
        },
        {
        path: '/about',
        name: 'About',
        component: About
        }
    ]
    })
    export default router