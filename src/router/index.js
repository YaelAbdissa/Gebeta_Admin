import {createRouter, createWebHistory} from 'vue-router'
import Restaurants from '../views/Restaurants'
import About from '../views/About'
import Customers from '../views/Customers'
import Login from '../views/Login'
import Driver from '../views/Driver'

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/restaurant',
        name: 'restaurant',
        component: Restaurants
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/customers',
        name: 'customers',
        component: Customers
    },
    {
        path: '/driver',
        name: 'driver',
        component: Driver
    }
]

const router = createRouter({
    history: createWebHistory(
        process.env.BASE_URL
    ), 
    routes
})

export default router