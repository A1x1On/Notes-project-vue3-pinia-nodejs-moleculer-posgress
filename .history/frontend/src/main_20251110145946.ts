// Plugins
// import * as Sentry from '@sentry/vue'
import { createSentryPiniaPlugin } from '@sentry/vue'
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

pinia.use(createSentryPiniaPlugin())
// Sentry.init({
//   dsn: import.meta.env.VITE_SENTRY_DSN,
//   sendDefaultPii: true,
//   integrations: [
//     Sentry.feedbackIntegration({
//       autoInject: false,
//     }),
//     Sentry.browserTracingIntegration({
//       instrumentNavigation: false,
//       instrumentPageLoad: false,
//     }),
//   ],
//   tracesSampleRate: 1.0,
//   tracePropagationTargets: [
//     import.meta.env.VITE_PROD_IS ? import.meta.env.VITE_PROD_FRONTEND : import.meta.env.VITE_FRONTEND,
//     import.meta.env.VITE_PROD_IS ? import.meta.env.VITE_REGEX_ENDPOINT : import.meta.env.VITE_REGEX_BACKEND,
//   ],
// })

import { VueTailwindPlugin } from 'vue-tailwind'

const components = {
  //...
}

app.use(VueTailwindPlugin, {
  components,
})
app.config.errorHandler = (err, _, info) => {
  Sentry.captureException(err)
  console.error(err, info) // Optionally log the error to the console
}

registerPlugins(app)

app.use(router)
app.use(pinia)
app.mount('#app')
