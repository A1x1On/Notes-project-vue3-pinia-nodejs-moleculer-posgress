import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
// import { useAuthStore } from '@/stores/AuthStore'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
})

// Пример добавления логики в beforeEach
router.beforeEach(async (to, _, next) => {
  // const isAuthenticated = useAuthStore().isAuthenticated()

  // Если страница требует авторизации, а пользователь не авторизован, редиректим на / (главную)

  if (to.name === undefined) {
    return next({ path: '/notFound' })
  }

  return next()
})

// Обработчик ошибок маршрутизатора (можно оставить для отладки)
router.onError((err, to) => {
  console.error('router.onError err', err)
  console.log('router.onError to', to)
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
