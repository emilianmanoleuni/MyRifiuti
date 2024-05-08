import { createRouter, createWebHistory } from 'vue-router'
import FirstPage from '@/components/FirstPage.vue' 
import Register from '@/components/Register.vue'
import HomePage from '@/components/HomePage.vue'
import Map from '@/components/Map.vue'

import HomePageRegisteredUser from '@/components/HomePageRegisteredUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'firstpage',
      component: FirstPage,
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
      path: '/homepageregistereduser',
      name: 'homepageregistereduser',
      component: HomePageRegisteredUser,
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
    }
  ]
})

export default router
