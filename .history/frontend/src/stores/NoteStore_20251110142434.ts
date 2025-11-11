import { defineStore } from 'pinia'
import { sendToSentry } from '@/plugins/sentry'

import { type IClientRateResultItem } from '@/entities/pages/clientRate'

import NoteService from '@/services/NoteService'
import { type IClientEmail } from '@/entities/email'

export const useMailStore = defineStore('mailStore', () => {
  const isLoading = ref<boolean>(false)
  const data = ref<IClientEmail[]>([])

  const fetch = async (clientIds: string[]) => {
    isLoading.value = true

    try {
      const resp = await NoteService.fetch(clientIds)
      data.value = resp.data
    } catch (error) {
      throw sendToSentry(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    data,

    fetch,
  }
})
