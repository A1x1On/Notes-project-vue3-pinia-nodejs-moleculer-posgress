<template>

      <router-link to="/menu" class="error-page__menu text-decoration-none">
        <div class="menu-page__routes-item">GO TO MENU</div>
      </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 

export default defineComponent({
  name: 'menu',
  components: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.error-page {
  &__404 {
    margin: 50px auto;
    color: var(--text-color);
    font-size: var(--fs-title);
  }

  &__menu {
    margin: 0px auto;
    color: var(--text-color-2);
    font-size: var(--fs-text);
  }
}
</style>
