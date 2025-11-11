<template>
  <!-- <VAlerts ref="refAlerts" /> -->

  <slot />
</template>

<script lang="ts">
// import { useDefaultStore } from '@/stores/DefaultStore'

// import VAlerts from '@/components/dialogs/VAlerts.vue'
// import type { IAlert } from '@/entities/components/alert'

export default defineComponent({
  components: {
    // VAlerts,
  },
  setup() {
    // const defaultStore = useDefaultStore()
    // const refAlerts = ref<IAlert>({
    //   success: () => undefined,
    //   error: () => undefined,
    //   info: () => undefined,
    //   warning: () => undefined,
    //   caught: () => undefined,
    // })
    // onMounted(() => {
    //   defaultStore.alert = refAlerts.value
    // })
    // return {
    //   refAlerts,
    // }
  },
})
</script>
