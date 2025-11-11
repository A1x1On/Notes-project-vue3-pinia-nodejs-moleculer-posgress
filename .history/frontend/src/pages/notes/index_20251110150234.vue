<template>
  <t-modal header="Title of the modal">
    Content of the modal.
    <template v-slot:footer>
      <div class="flex justify-between">
        <t-button type="button"> Cancel </t-button>
        <t-button type="button"> Ok </t-button>
      </div>
    </template>
  </t-modal>

  Open the dialog

  <div class="bg-blue-500 text-white p-4">Привет, Tailwind!</div>
</template>

<script lang="ts">
import { useNoteStore } from '@/stores/NoteStore'

export default defineComponent({
  components: {},
  setup() {
    const noteStore = useNoteStore()

    onMounted(async () => {
      await noteStore.fetch()
      console.log('----------------FETCHED---------------')
    })
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
