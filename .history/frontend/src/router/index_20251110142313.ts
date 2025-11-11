import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/AuthStore'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
})
// routes: setupLayouts(routes),
router.beforeEach(async (to) => {
  const publicPages = ['/login', '/login/[id]']
  const authRequired = !publicPages.includes(to.name)
  const auth = useAuthStore()

  // console.log('tototototototo', to)
  const loggedIn = localStorage.getItem('isLoggedIn')

  if (!loggedIn || loggedIn === 'false') {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('expires_at')

    if (authRequired) {
      auth.returnUrl = to.fullPath
      return '/login/' + (localStorage.getItem('last_access_key') || 'no-code')
    }
  } else {
    if (to.name === '/login/' || to.name === '/') {
      return '/menu'
    }
  }

  if (to.name === undefined) {
    return '/notFound'
  }
})

// router.onError((err, to) => {
//   console.log('router.onError err', err)
//   console.log('router.onError to', to)
// })

if (import.meta.hot) {
  handleHotUpdate(router)
}

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
