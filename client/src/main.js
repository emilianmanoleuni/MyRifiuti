import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'

const app = createApp(App);

app.use(router);
app.use(store);

sync(store, router);

app.mount('#app');
