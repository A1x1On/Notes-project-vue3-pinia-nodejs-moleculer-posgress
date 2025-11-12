<template>
  <div class="p-2 bg-gray-100 mx-auto h-full">
    <div class="bg-white p-6 rounded-lg shadow-lg mx-auto w-4xl">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ item.title }}</h2>
      <div class="text-gray-600 mb-4">
        <input class="t-input mb-2 w-full" v-model="item.title" placeholder="Название" />

        <textarea class="t-input mb-2 w-full min-h-50" v-model="item.content" placeholder="Контент"></textarea>

        <div class="mr-5">
          <span class="min-w-40 inline-block"> Дата создания: </span>

          {{ item.createdAt }}
        </div>

        <div v-if="item.updatedAt">
          <span class="min-w-40 inline-block"> Дата обновления: </span>

          {{ item.updatedAt }}
        </div>
      </div>

      <div class="flex justify-end space-x-2">
        <div v-if="noteStore.isLoading" class="flex items-center justify-center mr-5">
          <div class="w-8 h-8 border-4 border-t-blue-500 border-transparent rounded-full animate-spin"></div>
        </div>

        <router-link to="/notes" class="error-page__menu text-decoration-none">
          <button class="t-btn--secondary">Назад</button>
        </router-link>

        <button @click="onSave" class="t-btn--success">Сохранить</button>
        <button @click="onRemove" class="t-btn--danger">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'

import { formatDate } from '@/plugins/helpers/date'

import { useNoteStore } from '@/stores/NoteStore'

import { type INote, NOTE } from '@/entities/note'

export default defineComponent({
  components: {},
  setup() {
    const noteStore = useNoteStore()

    const item = computed(() => {
      if (!noteStore.data.length) return NOTE

      const { id, title, content, createdAt, updatedAt } = getNote()

      return {
        id,
        title,
        content,
        createdAt: formatDate(createdAt),
        updatedAt: formatDate(updatedAt),
      }
    })

    const getNote = () => {
      if (!noteStore.data.length) return NOTE

      return noteStore.data[0]
    }

    const onSave = async () => {
      const { id } = getNote()
      const { title, content } = item.value

      await noteStore.update({ id, title, content } as INote)
    }

    const onRemove = async () => {
      const note = getNote()

      await noteStore.remove(note.id)
      window.location.replace('/notes')
    }

    const onFetch = async () => {
      const route = useRoute()

      const id = (route.params as { id: number }).id

      await noteStore.fetchById(id)
    }

    onMounted(async () => {
      await onFetch()
    })
    return {
      noteStore,

      item,

      onSave,
      onRemove,
    }
  },
})
</script>

<style lang="scss" scoped></style>
