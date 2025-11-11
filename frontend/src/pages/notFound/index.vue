<template>
  <div class="p-2 bg-gray-100 mx-auto h-full">
    <div class="bg-white p-6 rounded-lg shadow-lg mx-auto w-4xl">
      <div class="flex space-x-2 items-center">
        <span class="mr-2"> Страницы не существует 404 </span>

        <router-link to="/">
          <button class="t-btn--primary">На главную</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: '404',
  components: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
