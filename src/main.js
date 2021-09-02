import './plugins/axios'
import { createApp } from 'vue'
import moment from 'moment'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import store from './store'
import Notifications from '@kyvg/vue3-notification'
const app = createApp(App).use(store)
app.config.globalProperties.$moment = moment
app.use(Notifications)
app.use(router).mount('#app')
