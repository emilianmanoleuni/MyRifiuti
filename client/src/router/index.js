import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/components/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/api/register',
      name: 'register',
      component: Register
    }
  ]
})

export default router
