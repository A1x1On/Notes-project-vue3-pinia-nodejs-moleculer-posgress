<template>
  GHBDHBDHBDHB

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
