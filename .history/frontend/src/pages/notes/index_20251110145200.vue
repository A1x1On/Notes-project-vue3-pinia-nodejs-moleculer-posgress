<template>
  <t-dialog name="named-dialog" icon="question" type="confirm" variant="demo">
    <template slot="title"> Delete user? </template>

    <p>This action cannot be undone.</p>

    <template slot="icon">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
        />
      </svg>
    </template>
  </t-dialog>

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
