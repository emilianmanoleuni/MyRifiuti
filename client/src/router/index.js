import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue' 
import Register from '@/components/Register.vue'
import HomePage from '@/components/HomePage.vue'
import Map from '@/components/Map.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/api/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePage,
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
    }
  ]
})

export default router
