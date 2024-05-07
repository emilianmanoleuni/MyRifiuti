import { createRouter, createWebHistory } from 'vue-router'
import FirstPage from '@/components/FirstPage.vue' 
import Register from '@/components/Register.vue'

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
      component: Register
    }
  ]
})

export default router
