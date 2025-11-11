<template>
  <div class="p-2 bg-gray-100 mx-auto h-full">
    <div v-if="modal.show" class="t-modal">
      <div class="bg-white p-6 rounded-lg shadow-lg w-3xl">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ modal.title }}</h2>
        <p class="text-gray-600 mb-4">
          <input
            class="t-input mb-2 w-full"
            v-model="modal.data.title"
            :disabled="!isEdit && !isInsert"
            placeholder="Название"
          />

          <br />

          <textarea
            class="t-input mb-2 w-full min-h-30"
            v-model="modal.data.content"
            :disabled="!isEdit && !isInsert"
            placeholder="Контент"
          />
        </p>
        <div class="flex justify-end space-x-2">
          <div v-if="noteStore.isLoading" class="flex items-center justify-center mr-5">
            <div class="w-8 h-8 border-4 border-t-blue-500 border-transparent rounded-full animate-spin"></div>
          </div>

          <button @click="onCloseModal" class="t-btn--secondary">Отмена</button>

          <button v-if="isInsert" @click="onInsert" class="t-btn--success">Добавить</button>
          <button v-else-if="isEdit" @click="onSave" class="t-btn--success">Сохранить</button>
          <button v-else-if="!isEdit && !isInsert" @click="onRemove" class="t-btn--success">Удалить</button>
        </div>
      </div>
    </div>

    <div class="flex flex-col p-5 bg-white mx-auto h-full rounded-lg max-w-5xl overflow-auto">
      <button class="t-btn--primary float-right mr-2" @click.stop="onShowInsert()">Добавить</button>
      <div
        class="w-full bg-gray-200 p-2 px-3 my-2 flex items-center justify-between rounded-md cursor-pointer hover:bg-gray-300"
        v-for="item in noteStore.data"
        @click="onShowUpdate(item)"
      >
        <div class="ml-2">
          <span class="text-xl">{{ item.title }}</span> -

          <span>{{ item.content }}</span>
        </div>

        <div>
          <button class="t-btn--danger float-right mr-2 my-1 w-25" @click.stop="onShowRemove(item)">Удалить</button>

          <button class="t-btn--primary float-right mr-2 my-1 w-25" @click.stop="onVisitDetail(item.id)">
            Открыть
          </button>
        </div>
      </div>

      <div v-if="noteStore.isLoading" class="flex items-center justify-center mt-5">
        <div class="w-10 h-10 border-4 border-t-blue-500 border-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useNoteStore } from '@/stores/NoteStore'

import { type INote, NOTE } from '@/entities/note'

export default defineComponent({
  components: {},
  setup() {
    const noteStore = useNoteStore()
    const router = useRouter()

    const modal = ref<IModal<INote>>({
      show: false,
      title: '',
      mode: 'update',
      data: NOTE,
    })

    const isEdit = computed(() => modal.value.mode === 'update')
    const isInsert = computed(() => modal.value.mode === 'insert')

    const onCloseModal = () => {
      modal.value.show = false
    }

    const onVisitDetail = (id: number) => {
      router.push('/notes/' + id)
    }

    const onShowInsert = () => {
      modal.value = {
        show: true,
        title: 'Добавление заметки',
        mode: 'insert',
        data: NOTE,
      }
    }

    const onInsert = async () => {
      const { title, content } = modal.value.data

      await noteStore.insert([
        {
          title,
          content,
        },
      ])
      onCloseModal()
      onFetch()
    }

    const onShowUpdate = (data: INote) => {
      modal.value = {
        show: true,
        title: 'Редактирование заметки',
        mode: 'update',
        data,
      }
    }

    const onSave = async () => {
      await noteStore.update(modal.value.data)
      onCloseModal()
      onFetch()
    }

    const onShowRemove = (data: INote) => {
      modal.value = {
        show: true,
        title: 'Подтвердите удаление заметки',
        mode: 'delete',
        data,
      }
    }

    const onRemove = async () => {
      await noteStore.remove(modal.value.data.id)
      onCloseModal()
      onFetch()
    }

    const onFetch = async () => {
      await noteStore.fetch()
    }

    onMounted(async () => {
      await onFetch()
    })
    return {
      noteStore,

      modal,
      isEdit,
      isInsert,

      onCloseModal,
      onVisitDetail,

      onShowInsert,
      onInsert,

      onShowUpdate,
      onSave,

      onShowRemove,
      onRemove,
    }
  },
})
</script>

<style lang="scss" scoped></style>
