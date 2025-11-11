import { registerPlugins } from '@/plugins'

import App from './App.vue'
import { initGlobalData } from './globals'

import './styles/styles.scss'
import './styles/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'

const pinia = createPinia()
const app = createApp(App)

initGlobalData(app)

registerPlugins(app)

app.use(router)
app.use(pinia)
app.mount('#app')
