import { defineStore } from 'pinia'
// import { sendToSentry } from '@/plugins/sentry'

import NoteService from '@/services/NoteService'
import type { INote, INoteItem } from '@/entities/note'

export const useNoteStore = defineStore('noteStore', () => {
  const isLoading = ref<boolean>(false)
  const data = ref<INote[]>([])

  const fetch = async () => {
    isLoading.value = true

    try {
      const resp = await NoteService.fetch()

      if (!resp.data.success) throw new Error(resp.data.error)

      data.value = resp.data.data
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const fetchById = async (id: number) => {
    isLoading.value = true

    try {
      const resp = await NoteService.fetchById(id)

      if (!resp.data.success) throw new Error(resp.data.error)

      data.value = [resp.data.data]
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const insert = async (payload: INoteItem[]) => {
    isLoading.value = true

    try {
      await NoteService.insert(payload)
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const update = async (payload: INote) => {
    isLoading.value = true

    try {
      await NoteService.update(payload)
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const remove = async (id: number) => {
    isLoading.value = true

    try {
      await NoteService.remove(id)
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    data,

    fetch,
    fetchById,

    insert,
    update,
    remove,
  }
})
