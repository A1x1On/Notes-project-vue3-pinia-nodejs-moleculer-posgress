// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import { initGlobalData } from './globals'

import './styles/styles.scss'
import './styles/tailwind.css'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Sentry from '@sentry/browser'
import router from '@/router'

const pinia = createPinia()
const app = createApp(App)

initGlobalData(app)

app.config.errorHandler = (err, _, info) => {
  Sentry.captureException(err)
  console.error(err, info) // Optionally log the error to the console
}

registerPlugins(app)

app.use(router)
app.use(pinia)
app.mount('#app')
