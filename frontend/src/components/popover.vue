<template>
  <div
    v-if="isVisible"
    class="popover absolute bottom-0 right-0 p-4 rounded-md shadow-lg mt-2 opacity-80 min-w-60"
    :class="{
      'bg-gray-100': !type,
      'bg-red-300': type === 1,
      'bg-blue-300': type === 2,
    }"
  >
    <h3 class="text-lg text-gray font-semibold">{{ title }}</h3>

    <p>{{ content }}</p>

    <button @click="closePopover" class="mt-2 text-sm text-gray">Close</button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue'

const props = defineProps({
  type: {
    type: Number,
    required: false,
    default: 0,
  },
})

const isVisible = ref(false)

const type = ref(0)
const title = ref('')
const content = ref('')

const showPopover = () => {
  isVisible.value = true
}

const closePopover = () => {
  isVisible.value = false
}

defineExpose({
  type,
  title,
  content,

  showPopover,
  closePopover,
})
</script>

<style lang="scss" scoped>
.popover {
  bottom: 20px;
  right: 40px;
}
</style>
