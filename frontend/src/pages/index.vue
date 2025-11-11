<template>
  <div class="p-2 bg-gray-100 mx-auto h-full">
    <div class="bg-white p-6 rounded-lg shadow-lg mx-auto w-4xl">
      <div class="flex space-x-2">
        <router-link to="/notes">
          <button class="t-btn--secondary">Список заметок</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  components: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
