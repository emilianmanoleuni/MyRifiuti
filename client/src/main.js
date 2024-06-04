import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from '@/store/store'
import VCalendar from 'v-calendar'
import HighchartsVue from 'highcharts-vue'

const app = createApp(App);

app.use(vuetify)
app.use(router)
app.use(store)
app.use(VCalendar)
app.use(HighchartsVue)
app.mount('#app');
