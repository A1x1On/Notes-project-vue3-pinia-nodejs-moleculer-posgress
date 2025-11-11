import { defineStore } from 'pinia'
import { DateTime } from 'luxon'
import { sendToSentry } from '@/plugins/sentry'

import { setUser } from '@/plugins/helpers/general'

import UserService from '@/services/UserService'
import AuthService from '@/services/AuthService'
import { type IAuthCriteria, AUTH_CRITERIA } from '@/entities/auth'

const EXPIRE_SECONDS = 86400 // 24 hours // 1500
const THROTTLE_SECONDS = 36000 // 10 hours // 600

export const useAuthStore = defineStore('authStore', () => {
  const router = useRouter()
  const route = useRoute()

  const isLoading = ref<boolean>(false)
  const isLoggedIn = ref<boolean>(false)
  const returnUrl = ref<string>()

  const criteria = ref<IAuthCriteria>(AUTH_CRITERIA)

  const throttleTimer = ref<number>()

  const logout = async () => {
    const params = route.params as { id?: string }

    isLoggedIn.value = false

    localStorage.setItem('isLoggedIn', 'false')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('expires_at')

    const lastKey = localStorage.getItem('last_access_key')
    const key = !lastKey || lastKey === 'null' ? params?.id || 'no-code' : lastKey

    router.push({ path: '/login/' + key })
  }

  const login = async () => {
    // const params = route.params as { id?: string }

    // if (!params.id || params?.id === 'no-code') {
    //   console.error(new Error('No access code'))
    //   throw sendToSentry(new Error('No access code'))
    // }

    isLoading.value = true
    // criteria.value.access_key = params.id

    // localStorage.setItem('last_access_key', params.id)

    try {
      //await AuthService.login(criteria.value)
      await new Promise((resolve) => resolve(true)).then(async (resp) => {
        if (!resp) throw new Error('Access denied')

        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('access_token', 'resp.data.access_token')
        localStorage.setItem('refresh_token', 'resp.data.refresh_token')
        // localStorage.setItem('access_token', resp.data.access_token)
        // localStorage.setItem('refresh_token', resp.data.refresh_token)
        setExpireAt(EXPIRE_SECONDS)

        // await UserService.getUser().then((resUser) => {
        //   const { id, login } = resUser.data
        //   setUser({ id, login })
        // })

        setTimeout(() => {
          console.log('------------223-------------------')
          router.push({ path: '/panel' })
        }, 500)
      })
    } catch (error) {
      console.log('errorerrorerror', error)
      throw sendToSentry(error)
    } finally {
      isLoading.value = false
    }
  }

  const refresh = async () => {
    const refreshToken = localStorage.getItem('refresh_token') || ''

    try {
      const rep = await AuthService.refresh(refreshToken)

      localStorage.setItem('access_token', rep.data.access_token)
      localStorage.setItem('refresh_token', rep.data.refresh_token)
      setExpireAt(EXPIRE_SECONDS)
    } catch (error) {
      console.error(error)
      throw sendToSentry(error)
    } finally {
      isLoading.value = false
    }
  }

  const setExpireAt = (seconds: number) => {
    const expiresAt = DateTime.now().plus({ seconds })
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()))
  }

  /**
   * User inactivity detection and logout session
   */

  document.addEventListener('mousedown', viewEvent)
  document.addEventListener('mousemove', viewEvent)
  document.addEventListener('touchstart', viewEvent)
  document.addEventListener('scroll', viewEvent)
  document.addEventListener('keydown', viewEvent)

  function viewEvent() {
    if (!isLoggedIn) {
      return
    }

    useThrottleFn(checkLoginExpiration, THROTTLE_SECONDS * 1000)
  }

  const useThrottleFn = (fn: Function, wait: number) => {
    if (!throttleTimer.value) {
      fn()

      throttleTimer.value = window.setTimeout(() => {
        clearTimeout(throttleTimer.value)
        throttleTimer.value = 0
      }, wait)
    }
  }

  const checkLoginExpiration = () => {
    const expiresAt = Number(localStorage.getItem('expires_at'))

    if (!expiresAt) {
      return logout()
    }

    const dateNow = DateTime.now()
    const dateExp = DateTime.fromMillis(expiresAt)

    const diff = dateNow.diff(dateExp, ['hours'])
    const result = diff.toObject()

    if (result.hours !== undefined && result.hours > 0) {
      // logout()

      refresh().catch(() => logout())
    } else {
      // setExpireAt(EXPIRE_SECONDS) // local refresh
    }
  }

  return {
    isLoading,
    isLoggedIn,
    returnUrl,

    login,
    refresh,
    criteria,
    logout,
  }
})
