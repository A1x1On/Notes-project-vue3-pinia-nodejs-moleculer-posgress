import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'

import About from '../pages/notes/index.vue'
import NotFound from '../pages/notFound/index.vue'

export const routes = [
  // { path: '/', component: Home, meta: { title: 'Home' }},
  { path: '/notes', component: About, meta: { title: 'About' }},
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'Page not found' }},
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

// import { useAuthStore } from '@/stores/AuthStore'

const axiosIns = axios.create()

axiosIns.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axiosIns.defaults.headers.common.Accept = 'application/json'

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use((config: any) => {
  // const { refresh } = useAuthStore()
  // Pass requests without authorization
  if (config.headers.Withoutauth) {
    return config
  }

  // Retrieve token from localStorage
  const token = localStorage.getItem('access_token')

  // refresh()

  // If token is found
  if (!token) {
    router.push('/login')
    return config
  }

  // Get request headers and if headers is undefined assign blank object
  config.headers = config.headers || {}

  // Set authorization header
  // ℹ️ JSON.parse will convert token to string
  config.headers.Authorization = token ? `Bearer ${token}` : ''

  // Return modified config
  return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null

    if (status === 401) {
      if (!localStorage.getItem('expires_at') || error?.response?.data.error === 'Token is expired') {
        const key = localStorage.getItem('last_access_key')

        router.push({ path: '/login/' + (!key || (key && key === 'null') ? 'no-code' : key) })
      }
    } else {
      throw error
    }
  },
)

export default axiosIns
