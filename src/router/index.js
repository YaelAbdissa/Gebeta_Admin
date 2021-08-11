import {createRouter, createWebHistory} from 'vue-router'
import Menu from '../views/Menu'
import About from '../views/About'
import Orders from '../views/Orders'
import Login from '../views/Login'
import Register from '../views/Register'

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/menu',
        name: 'menu',
        component: Menu
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/orders',
        name: 'Orders',
        component: Orders
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(
        process.env.BASE_URL
    ), 
    routes
})

export default router