import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue' 
import Register from '@/components/Register.vue'
import HomePage from '@/components/HomePage.vue'
import Groups from '@/components/Groups.vue'
import Map from '@/components/Map.vue'
import Reports from '@/components/Reports.vue'
import Profile from '@/components/Profile.vue'
import EnteLogin from '@/components/Ente/EnteLogin.vue'
import EnteHomepage from '@/components/Ente/EnteHomepage.vue'
import EnteReportList from '@/components/Ente/EnteReportList.vue'
import EnteAnalytics from '@/components/Ente/EnteAnalytics.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePage,
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/ente/login',
      name: 'enteLogin',
      component: EnteLogin
    },
    {
      path: '/ente/homepage',
      name: 'enteHomepage',
      component: EnteHomepage
    },
    {
      path: '/ente/reportList',
      name: 'enteReportList',
      component: EnteReportList
    },
    {
      path: '/ente/analytics',
      name: 'enteAnalytics',
      component: EnteAnalytics
    }
  ]
})

export default router
