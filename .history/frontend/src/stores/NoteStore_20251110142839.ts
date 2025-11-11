import { defineStore } from 'pinia'
import { sendToSentry } from '@/plugins/sentry'

import NoteService from '@/services/NoteService'
import { type INote } from '@/entities/note'

export const useNoteStore = defineStore('noteStore', () => {
  const isLoading = ref<boolean>(false)
  const data = ref<INote[]>([])

  const fetch = async () => {
    isLoading.value = true

    try {
      const resp = await NoteService.fetch()
      console.log('resp', resp)
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
